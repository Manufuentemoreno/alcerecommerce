const db = require('../database/models');

const getCart = async(req, res)=>{
    let detalles = []
    if(req.session.loggedUser){
        let ordenEnCarrito = await db.Orders.findOne({
            where: {
              user_id: req.session.loggedUser.id,
              order_status: "enCarrito",
            },
          });
      
        if (ordenEnCarrito) {
            detalles = await db.Orders_details.findAll({
              include: ["product"],
              where: {
                order_id: ordenEnCarrito.id,
              },
            });
        }
        };    
    return detalles;
}

module.exports = getCart;