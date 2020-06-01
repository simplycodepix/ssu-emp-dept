const sql = require('../db');

const Emp = function (emp) {
    this.empno = emp.empno;
    this.ename = emp.ename;
    this.job = emp.job;
    this.mgr = emp.mgr;
    this.hiredate = emp.hiredate;
    this.sal = emp.sal;
    this.comm = emp.comm;
    this.deptno = emp.deptno;
};

Emp.getSingle = ({ emp_id }, callback) => {
    sql.query("SELECT * FROM emp WHERE empno = ?", [emp_id], function (error, result) {
        if (error) {
            console.log("error: ", error);
            return callback({ error });
        }
        callback({ result: result[0] });
    });
};

Emp.addEmp = (newEmp, callback) => {
    sql.query("INSERT INTO emp set ?", newEmp, function (error, result) {
        if (error) {
            console.log("error: ", error);
            return callback({ error });
        }
        callback({ result: result });
    });
};

Emp.getCountTotal = (callback) => {
    sql.query("SELECT COUNT(*) AS count FROM emp", function (error, result) {
        if (error) {
            console.log("error: ", error);
            return callback({ error });
        }
        callback({ count: result && result[0].count ? result[0].count : 0 });
    });
};

Emp.getEmpTableData = ({ limit = false, offset = false }, callback) => {
    let pagination = `${limit ? 'LIMIT ' + limit : ''} ${offset ? 'OFFSET ' + offset : ''}`;

    let query = `SELECT * FROM emp ${pagination};`;

    sql.query(query, function (error, result) {
        if (error) {
            console.log("error: ", error);
            return callback({ error });
        }
        callback({ result });
    });
};

module.exports = Emp;