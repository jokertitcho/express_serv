const {User} = require("../db/sequelizeSetup")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY = require("../configs/privatekey")

const login = async (req, res)=>{ 
    try {
        //destructuration du corps de ma requete
        const {username, password} = req.body 
        //recherche dans ma base de donnée
        const findUser = await User.scope("withPassword").findOne({where: {username:username}})
            //si rien est trouvé je passe ici
            if( findUser === null)return res.status(404).json({message :"le mot de passe n'existe pas "})
            //si je passe ce test je compare le mot de passe entrée avec celui hashé dans ma base de donnée
            const isCorrect =  await bcrypt.compare(password , findUser.password)
            //si les correspondances ne match pas je passe ici
            if(!isCorrect)return res.status(400).json({message: "Vos données d'authentification sont incorrect"})
            //si tous corresponds alors je lui fabrique un token que j'envoi dans un cookie
            const token = jwt.sign({ data :{id:findUser.id, email: findUser.email} }, SECRET_KEY, {expiresIn : "1h"})
            //et j'envoi ce cookie a mon utilisateur 
            res.cookie("access_token", token).json({message : `l'utilisateur ${findUser.username} est loggé `})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "erreur"})    
    }    
}
const logOut = (req, res)=>{
    
    res.clearCookie("access_token").json({message: "log out"})
}

module.exports = {login, logOut}