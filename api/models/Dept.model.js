const sql = require('../db');

const Dept = function (dept) {
    this.deptno = dept.deptno;
    this.dname = dept.dname;
    this.loc = dept.loc;
};

Dept.getSingle = ({ dept_id }, callback) => {
    sql.query("SELECT * FROM dept WHERE deptno = ?", [dept_id], function (error, result) {
        if (error) {
            console.log("error: ", error);
            return callback({ error });
        }
        callback({ result: result[0] });
    });
};

Dept.addDept = (newDept, callback) => {
    sql.query("INSERT INTO dept set ?", newDept, function (error, result) {
        if (error) {
            console.log("error: ", error);
            return callback({ error });
        }
        console.log(result);
        callback({ result: result });
    });
};

Dept.getCountTotal = (callback) => {
    sql.query("SELECT COUNT(*) AS count FROM dept", function (error, result) {
        if (error) {
            console.log("error: ", error);
            return callback({ error });
        }
        callback({ count: result && result[0].count ? result[0].count : 0 });
    });
};

Dept.getDeptTableData = ({ limit = false, offset = false }, callback) => {
    let pagination = `${limit ? 'LIMIT ' + limit : ''} ${offset ? 'OFFSET ' + offset : ''}`;

    let query = `SELECT * FROM dept ${pagination};`;

    sql.query(query, function (error, result) {
        if (error) {
            console.log("error: ", error);
            return callback({ error });
        }
        callback({ result });
    });
};

module.exports = Dept;