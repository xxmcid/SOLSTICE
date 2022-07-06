const jwt = require("jsonwebtoken");
require("dotenv").config();

// expiry should be something like '15m' or '7d', if a time is not specified, it does not expire
exports.createVerificationToken = function(email, expiry) 
{
    let ret = {};
    try
    {
        let temp = {email: email};
        ret.token = jwt.sign(temp, "secret", {expiresIn: expiry});
    }
    catch(e)
    {
        ret = {error: e.message};
    }
    return ret;
}

exports.checkExpiry = function(token)
{
    let isValid = jwt.verify(token, "secret", (error, verifiedJwt) => {
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

exports.getEmailFromToken = function(token)
{
    let raw =  jwt.decode(token, {complete: true});
    return raw.payload.email;
}