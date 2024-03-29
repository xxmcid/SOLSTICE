exports.validate = function(user, attributes) {
    for (let i = 0; i < attributes.length; i++) {
        switch(attributes[i]) {
            case 'firstName':
                // NULL check.
                if (!user.firstName)
                    return "Please enter your first name.";

                // At least 1 character in length.
                if (user.firstName.length < 1)
                    return "Your first name must be at least 1 character in length.";

                // Less than 32 characters in length.
                if (user.firstName.length > 32)
                    return "Your first name must be less than 32 characters in length.";

                // Test the pattern.
                let pattern_firstName = /^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)$/;
                if (!pattern_firstName.test(user.firstName))
                    return "Your first name must only contain letters and begin with an uppercase letter.";

                break;
            case 'lastName':
                // NULL check.
                if (!user.lastName)
                    return "Please enter your last name.";

                // At least 1 character in length.
                if (user.lastName.length < 1)
                    return "Your last name must be at least 1 character in length.";

                // Less than 32 characters in length.
                if (user.lastName.length > 32)
                    return "Your last name must be less than 32 characters in length.";

                // Test the pattern.
                let pattern_lastName = /^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)$/;
                if (!pattern_lastName.test(user.lastName))
                    return "Your last name must only contain letters and begin with an uppercase letter.";

                break;
            case 'email':
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

                break;
            case 'password':
                // NULL check.
                if (!user.password)
                    return "Please enter a password.";

                // At least 8 characters in length.
                if (user.password.length < 8)
                    return "Your password must be at least 8 characters in length.";

                // Less than 32 characters in length.
                if (user.password.length > 32)
                    return "Your password must be less than 32 characters in length.";

                // Test the pattern.
                let pattern_password = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,32}$/;
                if (!pattern_password.test(user.password))
                    return "Your password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and 8-32 characters long.";

                break;
        }
    }
};
