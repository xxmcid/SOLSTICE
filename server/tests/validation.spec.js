const validators = require("../resources/attribute-validation")
const User = require("../models/User")

const test = (name, expected, actual) => {
  if (expected != actual) {
    console.log("\n  **Test \"" + name + "\" failed!**")
    console.log("     expected: " + expected)
    console.log("          got: " + actual + "\n")
  } else {
    console.log("  *Test \"" + name + "\" passed!")
  }
}

let validUser = new User({firstName: "firstName", lastName: "lastName", email: "test@test", password: "Test1234!"});

// firstName tests
let invalidUserFirstName1 = new User({lastName: "lastName", email: "test@test.com", password: "Test1234!"});
let invalidUserFirstName2 = new User({firstName: "", lastName: "lastName", email: "test@test.com", password: "Test1234!"});
let invalidUserFirstName3 = new User({firstName: "firstNamefirstNamefirstNamefirstNamefirstNamefirstNamefirstName", lastName: "lastName", email: "test@test.com", password: "Test1234!"});
let invalidUserFirstName4 = new User({firstName: "firstName1234!", lastName: "lastName", email: "test@test.com", password: "Test1234!"});

// lastName tests
let invalidUserLastname1 = new User({firstName: "Firstname", email: "test@test.com", password: "Test1234!"});
let invalidUserLastname2 = new User({firstName: "Firstname", lastName: "", email: "test@test.com", password: "Test1234!"});
let invalidUserLastname3 = new User({firstName: "Firstname", lastName: "lastNamelastNamelastNamelastNamelastNamelastNamelastNamelastName", email: "test@test.com", password: "Test1234!"});
let invalidUserLastname4 = new User({firstName: "Firstname", lastName: "lastName1", email: "test@test.com", password: "Test1234!"});

// Email
let invalidUserEmail1 = new User({firstName: "Firstname", lastName: "Lastname", password: "Test1234!"});
let invalidUserEmail2 = new User({firstName: "Firstname", lastName: "Lastname", email: "", password: "Test1234!"});
let invalidUserEmail3 = new User({firstName: "Firstname", lastName: "Lastname", email: "test@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.comtest@test.com", password: "Test1234!"});
let invalidUserEmail4 = new User({firstName: "Firstname", lastName: "Lastname", email: "test@test", password: "Test1234!"});

// Password
let invalidUserPassword1 = new User({firstName: "Firstname", lastName: "Lastname", email: "test@test.com"});
let invalidUserPassword2 = new User({firstName: "Firstname", lastName: "Lastname", email: "test@test.com", password: ""});
let invalidUserPassword3 = new User({firstName: "Firstname", lastName: "Lastname", email: "test@test.com", password: "Test1234!Test1234!Test1234!Test1234!Test1234!Test1234!Test1234!Test1234!Test1234!Test1234!Test1234!Test1234!"});
let invalidUserPassword4 = new User({firstName: "Firstname", lastName: "Lastname", email: "test@test.com", password: "Test1234"});

// firstname errors
test("invalid firstName 1", "Please enter your first name.", validators.validate(invalidUserFirstName1, ["firstName", "lastName", "email", "password"]));
test("invalid firstName 2", "Please enter your first name.", validators.validate(invalidUserFirstName2, ["firstName", "lastName", "email", "password"]));
test("invalid firstName 3", "Your first name must be less than 32 characters in length.", validators.validate(invalidUserFirstName3, ["firstName", "lastName", "email", "password"]));
test("invalid firstName 4", "Your first name must only contain letters.", validators.validate(invalidUserFirstName4, ["firstName", "lastName", "email", "password"]));


// lasname errors
test("invalid lastName 1", "Please enter your last name.", validators.validate(invalidUserLastname1, ["firstName", "lastName", "email", "password"]));
test("invalid lastName 2", "Please enter your last name.", validators.validate(invalidUserLastname2, ["firstName", "lastName", "email", "password"]));
test("invalid lastName 3", "Your last name must be less than 32 characters in length.", validators.validate(invalidUserLastname3, ["firstName", "lastName", "email", "password"]));
test("invalid lastName 4", "Your last name must only contain letters.", validators.validate(invalidUserLastname4, ["firstName", "lastName", "email", "password"]));

// email errors
test("invalid email 1", "Please enter your email.", validators.validate(invalidUserEmail1, ["firstName", "lastName", "email", "password"]));
test("invalid email 2", "Please enter your email.", validators.validate(invalidUserEmail2, ["firstName", "lastName", "email", "password"]));
test("invalid email 3", "Your email must be less than 320 characters in length.", validators.validate(invalidUserEmail3, ["firstName", "lastName", "email", "password"]));
test("invalid email 4", "Your email is invalid.", validators.validate(invalidUserEmail4, ["firstName", "lastName", "email", "password"]));

// password errors
test("invalid password 1", "Please enter a password.", validators.validate(invalidUserPassword1, ["firstName", "lastName", "email", "password"]));
test("invalid password 2", "Please enter a password.", validators.validate(invalidUserPassword2, ["firstName", "lastName", "email", "password"]));
test("invalid password 3", "Your password must be less than 32 characters in length.", validators.validate(invalidUserPassword3, ["firstName", "lastName", "email", "password"]));
test("invalid password 4", "Your password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and 8-32 characters long.", validators.validate(invalidUserPassword4, ["firstName", "lastName", "email", "password"]));

console.log()
console.log()