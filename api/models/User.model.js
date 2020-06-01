const sql = require('../db');

const User = function (user) {
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.age = user.age;
    this.sex = user.sex;
    this.created_at = new Date();
};

User.getSingle = ({ user_id }, callback) => {
    sql.query("SELECT * FROM users WHERE id = ?", [user_id], function (error, result) {
        if (error) {
            console.log("error: ", error);
            return callback({ error });
        }
        callback({ result: result[0] });
    });
};

User.addUser = (user, callback) => {
    sql.query("INSERT INTO users set ?", user, function (error, result) {
        if (error) {
            console.log("error: ", error);
            return callback({ error });
        }
        callback({ user: result.insertId });
    });
};

User.findById = function ({ id }, callback) {
    sql.query("SELECT * FROM users WHERE id = ?", [id], function (error, result) {
        if (error) {
            console.log("error: ", error);
            return callback({ error });
        }
        callback({ result });
    });
};

User.findByEmailOrUsername = function ({ email = "", username = "" }, callback) {
    sql.query("SELECT * FROM users WHERE `email` = ? OR `username` = ? LIMIT 1", [email, username], function (error, result) {
        if (error) {
            console.log("error: ", error);
            return callback({ error });
        }
        callback({ result });
    });
};

User.findByLogin = function ({ login = "" }, callback) {
    sql.query("SELECT * FROM users WHERE `email` = ? OR `username` = ? LIMIT 1", [login, login], function (error, result) {
        if (error) {
            console.log("error: ", error);
            return callback({ error });
        }
        callback({ result });
    });
};


User.getLimitedUserData = function (user) {
    return {
        id: user.id,
        username: user.username,
        fullName: user.firstName + " " + user.lastName,
        email: user.email,
        age: user.age,
        sex: user.sex
    };
};

module.exports = User;