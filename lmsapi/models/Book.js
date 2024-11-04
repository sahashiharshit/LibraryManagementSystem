const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');
const Book = sequelize.define('Book',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    bookTakenDate:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW,
    },
    bookReturnDate:{
        type:DataTypes.DATE,
        allowNull:false,

    },
    fine:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    status:{
        type:DataTypes.ENUM('taken','returned'),
        defaultValue:'taken',
    },
});
module.exports=Book;