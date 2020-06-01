const Emp = require('../models/Emp.model');
const Dept = require('../models/Dept.model');

// READ
exports.getDeptTableData = async (req, res) => {
    const paginationData = {
        limit: parseInt(req.query.limit) ? parseInt(req.query.limit) : 6,
        offset: parseInt(req.query.offset) ? parseInt(req.query.offset) : false,
    };

    Dept.getCountTotal(({ count }) => {
        Dept.getDeptTableData(paginationData, ({ result }) => {
            res.json({ dept: result, count });
        });
    });
};

exports.getEmpTableData = async (req, res) => {
    const paginationData = {
        limit: parseInt(req.query.limit) ? parseInt(req.query.limit) : 6,
        offset: parseInt(req.query.offset) ? parseInt(req.query.offset) : false,
    };

    Emp.getCountTotal(({ count }) => {
        Emp.getEmpTableData(paginationData, ({ result }) => {
            res.json({ emp: result, count });
        });
    });
};

// READ SINGLE
exports.getSingleEmp = async (req, res) => {
    const emp_id = parseInt(req.query.emp_id);

    Emp.getSingle({ emp_id }, ({ result }) => {
        res.json({ emp: result });
    })
};

exports.getSingleDept = async (req, res) => {
    const dept_id = parseInt(req.query.dept_id);

    Dept.getSingle({ dept_id }, ({ result }) => {
        res.json({ dept: result });
    })
};

// ADD
exports.addEmp = async (req, res) => {
    const empData = {
        empno: parseInt(req.body.empno),
        ename: req.body.ename,
        job: req.body.job,
        mgr: parseInt(req.body.mgr),
        hiredate: new Date(req.body.hiredate),
        sal: req.body.sal,
        comm: req.body.comm,
        deptno: parseInt(req.body.deptno)
    };
    const newEmp = new Emp(empData);

    if (!newEmp.empno || !newEmp.ename) {
        res.status(400).send({ error: true, message: 'Please provide emp' });
    } else {
        Emp.getSingle({ emp_id: newEmp.empno }, ({ result }) => {
            if (!result) {
                Emp.addEmp(newEmp, function ({ err, result }) {
                    if (err) return res.json({ error: err });
                    res.json({ result });
                });
            } else {
                res.json({ error: 'Duplicate of empno' });
            }
        });
    }
};

exports.addDept = async (req, res) => {
    const deptData = {
        deptno: parseInt(req.body.deptno),
        dname: req.body.dname,
        loc: req.body.loc
    };
    const newDept = new Dept(deptData);

    if (!newDept.deptno || !newDept.dname) {
        res.status(400).send({ error: true, message: 'Please provide dept' });
    } else {
        Dept.getSingle({ dept_id: newDept.deptno }, ({ result }) => {
            if (!result) {
                Dept.addDept(newDept, function ({ err, result }) {
                    if (err) return res.json({ error: err });
                    res.json({ result });
                });
            } else {
                res.json({ error: 'Duplicate of deptno' });
            }
        })
    }
};