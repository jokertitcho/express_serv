/* labelle superadmin, admin, user
    id : 1, 2, 3 */

    const {DataTypes} = require("sequelize")


    module.exports = (sequelize) =>{
        return sequelize.define(
            "Role",
            {
                /* id :{
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement :true
                }, */
                label:{
                    type: DataTypes.STRING,
                    unique: true,
                },

                 
                /* subscription: {
                    type: DataTypes.STRING,
                } */
            },
            {
                updatedAt: false,
                createdAt: false
        
             })
            
    }