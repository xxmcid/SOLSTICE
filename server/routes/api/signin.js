const express = require('express');
const md5 = require('md5');
const fs = require('fs');
const path = require('path');
const sgMail = require('@sendgrid/mail')
const jwt = require('../../resources/jwt.js');
const User = require("../../models/User");
const attributes = require('../../resources/attribute-validation');

// Initialize express
const app = express();

// Read E-Mail Verification HTML
let email_verification_html = fs.readFileSync(path.resolve(__dirname, '../../resources/email-verification.html'), 'utf-8');

// User Sign-In:
// Finds a User from credentials and "signs in" if the credentials match.
app.post('/', async (req, res) => {
    // Create a new User document from the request body arguments.
    let user = new User({
        email: req.body.email,
        password: req.body.password
    });

    // Validate the new User's attributes.
    let err = attributes.validate(user, ['email', 'password']);
    if (err)
        return res.status(401).json({
            "status": "failed",
            "error": err
        });

    // Encrypt the password.
    user.password = md5(user.password);

    // Search for a User with matching credentials.
    const foundUser = await User.findOne({
        email: user.email,
        password: user.password
    });

    if (!foundUser) {
        return res.status(401).json({
            "status": "failed",
            "error": "Email or password incorrect"
        });
    }

    if (foundUser.verified) {
        // Create a client session JWT with 6 hour expiry.
        let tokenObj = jwt.createVerificationToken(user.email, '6h', jwt.TokenTypes.ClientSession);

        return res.status(200).json({
            "status": "success",
            "error": "",
            "token": tokenObj.token
        });
    }

    // Send an email verification email with 15 minute expiry.
    let tokenObj = jwt.createVerificationToken(user.email, '15m', jwt.TokenTypes.VerifyEmail);

    // Construct E-Mail message.
    const msg = {
        to: user.email,
        from: 'noreply.solstice@gmail.com',
        subject: 'Verify Your Account',
        html: email_verification_html.replaceAll('{{TOKEN}}', tokenObj.token)
    }

    // Send E-Mail.
    await sgMail
        .send(msg)
        .then(() => {
            // Log to console.
            console.log(`Email verification sent to ${user.email}.`);

            // Let the user know they must verify a new email.
            return res.status(401).json({
                "status": "failed",
                "error": "You must verify your email before logging in! We just sent another email."
            });
        })
        .catch(err => {
            return res.status(400).json({
                "status": "failed",
                "error": err
            });
        });
});

module.exports = app;