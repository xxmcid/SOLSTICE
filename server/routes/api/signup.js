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

// Setup SendGrid API
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Read E-Mail Verification HTML
let email_verification_html = fs.readFileSync(path.resolve(__dirname, '../../resources/email-verification.html'), 'utf-8');

// User Sign-Up:
// Creates a new user as long as the email & password requirements are met.
app.post('/', async function (req, res) {
    // Create a new User document from the request body arguments.
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        verified: false
    });

    // Validate the new User's attributes.
    let err = attributes.validate(user, ['firstName', 'lastName', 'email', 'password']);
    if (err)
        return res.status(422).json({
            "status": "failed",
            "error": err
        });

    // Check whether the email is unique.
    if (await User.exists({email: user.email}))
        return res.status(409).json({
            "status": "failed",
            "error": "Your email is already in use."
        });

    // Encrypt the password.
    user.password = md5(user.password);
    
    // Save the new User to the database.
    await user
        .save()
        .then(async () => {
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
                    console.log(`Email verification sent to ${user.email}.`)
                })
                .catch(err => {
                    return res.status(400).json({
                        "status": "failed",
                        "error": err
                    });
                });

            // Return status code 201 (succesful and new resource was created).
            return res.status(201).json({
                "status": "success",
                "error": ""
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