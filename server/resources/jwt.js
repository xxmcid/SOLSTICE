const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.TokenTypes = {
    ResetPass: "ResetPass",
    VerifyEmail: "VerifyEmail",
    ClientSession: "ClientSession"
}

// expiry should be something like '15m' or '7d', if a time is not specified, it does not expire
exports.createVerificationToken = function(email, expiry, type) 
{
    let ret = {};
    try
    {
        let temp = {
            email: email,
            token_type: type
        };
        ret.token = jwt.sign(temp, process.env.JWT_SECRET, {expiresIn: expiry});
    }
    catch(e)
    {
        ret = {error: e.message};
    }
    return ret;
}

exports.checkValidity = function(token)
{
    let isValid = jwt.verify(token, process.env.JWT_SECRET, (error, verifiedJwt) => {
        if(error)
        {
            return false;
        }
        else
        {
            return true;
        }
    });

    return isValid;
}

exports.getTokenType = function(token)
{
    let raw = jwt.decode(token, {complete: true});
    return raw.payload.token_type;
}

exports.getEmailFromToken = function(token)
{
    let raw =  jwt.decode(token, {complete: true});
    return raw.payload.email;
}