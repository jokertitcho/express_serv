// CONFIG DB
const { Sequelize } = require('sequelize');
const CoworkingModel = require('../models/coworkingModel')
const UserModel = require("../models/userModel")
const UserRole = require("../models/roleModel")
const ReviewModel = require("../models/review")
const mockCoworkings = require('../coworkings')

const UserTable = require("../user")
const bcrypt = require("bcrypt")
// Option: Passing parameters separately (other dialects)
const sequelize = new Sequelize('bx_coworkings', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

const Coworking = CoworkingModel(sequelize)
const User = UserModel(sequelize)
const Role = UserRole(sequelize)
const Review = ReviewModel(sequelize)

Role.hasMany(User,{
    foreignKey :{
        defaultValue : 3
    }
})// role a plusieurs utilisateur
User.belongsTo(Role)//user appartient a role
Review.hasMany(User)


User.hasMany(Coworking)
Coworking.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)
Coworking.hasMany(Review)
Review.belongsTo(Coworking)

sequelize.sync({ force: true })
    .then(() => {
        mockCoworkings.forEach(coworking => {
            Coworking.create(coworking)
                .then()
                .catch(error => {
                    console.log(error)
                })
        })
        Role.create({id : 1, label: "superAdmin"}),
        Role.create({id : 2, label: "admin"}),
        Role.create({id : 3, label: "user"}),
     
        UserTable.forEach(async user => {
            const hash = await bcrypt.hash(user.password, 10)
            user.password = hash
            User.create(user)
                .then()
                .catch(error => {
                    console.log(error)
                })
        })
    })
    .catch((error) => {
        console.log(error)
    })



sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = { sequelize, Coworking, User, Role, Review }