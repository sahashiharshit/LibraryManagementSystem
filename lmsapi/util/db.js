const {Sequelize} = require('sequelize');
const sequelize = new Sequelize("lms", "harshit", "19962024", {
    dialect: "mysql",
    host: "localhost",
  });
  (async()=>{
    try{
        await sequelize.authenticate();
        console.log('Database Connected');
    }catch(error){
        console.error('Unable to connect to the database:', error);
        
    }
  })();

  module.exports = sequelize;