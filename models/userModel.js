const {DataTypes} = require("sequelize")


module.exports = (sequelize) =>{
    return sequelize.define(
        "User",
        {
            /* id :{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement :true

            }, */
            username:{
                type: DataTypes.STRING,
                unique: true,
                validate:{
                        len:{
                     args: [8, 80],// longeur du mot de passe entre 8 et 80
                     msg: "votre mot de passe doit contenir au minimum 8 charactéres et max 80 "
                    }
                }
            },
            password:{
                allowNull: false,
                type: DataTypes.STRING,
                
                
            },
            address: {
                type: DataTypes.JSON,
            },
            email:{
                type:DataTypes.STRING,
                validate:{
                    isEmail : true
                }
            }
            
            /* subscription: {
                type: DataTypes.STRING,
            } */

        },
        {
            defaultScope: {
            attributes:{exclude: ["password"]}
            },
        scopes :{
            withPassword : {
                attributes: {}
            }
        },
        hooks: {
            afterCreate: (record) => {
                delete record.dataValues.password;
            },
            afterUpdate: (record) => {
                delete record.dataValues.password;
            },
        }
        },
       
    );
}
