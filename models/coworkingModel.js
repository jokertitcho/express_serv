const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define(
        'Coworking',
        {
            // Model attributes are defined here
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: "le nom est deja pris "
                },
                validate:{
                    len:{
                        msg:"le nom doit avoir une nombre compris entre 2 et 10",
                        args: [2, 50],
                    }
                },        
            },
            superficy: {
                type: DataTypes.INTEGER,
                isInt: {
                    msg:"blablabla"
                }
            },
            capacity: {
                type: DataTypes.INTEGER,
            },
            price: {
                type: DataTypes.JSON,
                validate : {

                    customValidator(value){
                        if(value.hour === null && value.day === null && value.month === null){
                            throw  new Error("nom compris entre zero et 10")
                        }
                    }
                }

            },
            address: {
                type: DataTypes.JSON,
            }
        },
        {
            // Other model options go here
        },
    );
}
