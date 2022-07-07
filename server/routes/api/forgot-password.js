const express = require('express');
const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail')
const jwt = require('../../resources/jwt.js');
const User = require("../../models/User");

// Initialize express
const app = express();

// Setup SendGrid API
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Read E-Mail Verification HTML
let forgot_password_html = fs.readFileSync(path.resolve(__dirname, '../../resources/forgot-password.html'), 'utf-8');

// Forgot Password:
// Sends an E-Mail to a specified e-mail if there is a user with that e-mail.
app.post('/', async function (req, res) {
    // Create a new User document from the request body arguments.
    let user = new User({
        email: req.body.email
    });

    // Validate the e-mail.
    let err = validateAttributes(user);
    if (err)
        return res.status(422).json({
            "status": "failed",
            "error": err
        });

    // Check whether a user is created using the email.
    if (!await User.exists({email: user.email}))
        return res.status(200).json({ // 409 would be the typical error code. 200 FOR SECURITY REASONS.
            // "status": "failed", // REMOVED FOR SECURITY REASONS.
            // "error": "There is no user created with this email." // REMOVED FOR SECURITY REASONS.
            "status": "success", // actually 'failed' because we won't send the e-mail to a non-user, but we don't let the client know that.
            "error": ""
        });
    
    // Send a forgot password email with 15 minute expiry.
    let tokenObj = jwt.createVerificationToken(user.email, '15m', jwt.TokenTypes.ResetPass);

    // Construct E-Mail message.
    const msg = {
        to: user.email,
        from: 'noreply.solstice@gmail.com',
        subject: 'Forgot Password?',
        html: forgot_password_html.replaceAll('{{TOKEN}}', tokenObj.token)
    }

    // Send E-Mail.
    await sgMail
        .send(msg)
        .then(() => {
            console.log(`Forgot password email sent to ${user.email}.`)
        })
        .catch(err => {
            return res.status(200).json({ // 400 would be the typical error code. 200 FOR SECURITY REASONS.
                // "status": "failed", // REMOVED FOR SECURITY REASONS.
                // "error": err // REMOVED FOR SECURITY REASONS.
                "status": "success", // actually 'failed' because the e-mail couldn't be sent.
                "error": ""
            });
        });

    // Return status code 200.
    return res.status(200).json({
        "status": "success",
        "error": ""
    });
});

function validateAttributes(user) {
    // ### email
    // NULL check.
    if (!user.email)
        return "Please enter your email.";

    // At least 1 character in length.
    if (user.email.length < 1)
        return "Your email must be at least 1 character in length.";

    // Less than 320 characters in length.
    if (user.email.length > 320)
        return "Your email must be less than 320 characters in length.";

    // Test the pattern.
    let pattern_email = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!pattern_email.test(user.email))
        return "Your email is invalid.";
};

module.exports = app;