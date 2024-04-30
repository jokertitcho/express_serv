const {DataTypes} =require("sequelize")



module.exports = (sequelize) =>{
    return sequelize.define(
        "Review",
        {
           
            commentaire:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            note:{
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min:0,
                    max:5
                }
            }
        },
        )
        
}