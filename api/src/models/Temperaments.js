// const sequelize = require('sequelize');
const  DataTypes = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Temperaments", {
        // id: {
        //     type: DataTypes.UUID,
        //     defaultValue: DataTypes.UUIDV4,
        //     primaryKey: true,
        //     allowNull: false,
        //   },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          
    },{timestamps:false})
}