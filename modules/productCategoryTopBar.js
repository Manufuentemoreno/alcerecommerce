const db = require('../database/models');

const getCategories = async()=>{
    let categoryData = await db.Products_categories.findAll();
    
    let categories = categoryData.map(element=>element.dataValues.name)

    return categories
}

module.exports = getCategories