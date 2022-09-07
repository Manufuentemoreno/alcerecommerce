const db = require('../database/models');
const Users = db.Users;

module.exports = {
    index: (req, res)=>{
        res.send("Api")
    }
};