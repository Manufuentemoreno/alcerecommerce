const db = require("../../database/models");
const Users = db.Users;
const Port = require("../../modules/Port")

module.exports = {
    index: async (req, res)=>{
        const { count, rows } = await Users.findAndCountAll();

        let userList = rows.map( user =>{
            let result = {
                id: user.id,
                name: `${user.name} ${user.last_name}`,
                email: user.email,
                detail: `http://localhost:${Port}/api/users/${user.id}`
            };
            return result;
        })

        res.json({
            count: count,
            users: userList
        });
    },

    detail: async (req,res)=>{
        const UserId = req.params.id;
        let user = await Users.findByPk(UserId,
        {    attributes: {
                exclude: [
                    "password",
                    "category",
                    "updatedAt"
            ]
            }    
        }
        );

        const userData = {
            id: user.id,
            name: user.name,
            last_name: user.last_name,
            birth_date: user.birth_date,
            photo: `http://localhost:${Port}/images/profile/${user.profil_photo}`
        };

        res.json({
            user: userData
        })
    }
};