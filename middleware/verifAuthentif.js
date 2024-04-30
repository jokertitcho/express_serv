const jwt = require("jsonwebtoken")
const SECRET_KEY = require("../configs/privatekey")
const { User, Role } = require("../db/sequelizeSetup")
const { errorValidationConstraint } = require("../errorHandler/errorValidationConstraint")

const rolesHierarchy = {
    user: ["user"],
    admin: ["admin", "user"],
    superAdmin: ["superAdmin", "admin","user"]
}

const protect =  async(req, res, next)=>{
    
    const token = req.cookies.access_token
    //je verifie la presence de mon token 
    if(!token)return res.status(401).json({message : "non authentifié"})
    //on vérifie la validité du token
    try {
        const decoded = jwt.verify(token, SECRET_KEY);


        const findUser = await User.findByPk(decoded.data.id, {include:Role})
        if(!findUser){
            return res.status(404).json({message: "utilisateur non trouvé"})
        }
        
        //je recupere l'id enfermé dans le token pour pouvoir m'en servir ailleurs
        req.data = findUser.dataValues
       
        //tout vas bien je passe a la suite
        next()
    } catch (error) {
        console.log(error);
        return res.status(401).json({message: "Jeton non valide"})
    }
}
const restricTo = (labelRole)=>{
    
   
    return  async(req, res, next)=>{
        try {
            console.log(req.data.Role);
            if(!rolesHierarchy[req.data.Role.label].includes(labelRole))return res.status(403).json({message:"Droits insuffisants"})
            next() 
        } catch (error) {
            errorValidationConstraint(error, res)
        }
    }
    /* try {
        const roleUser = await User.findByPk(req.userId)
    } catch (error) {
        
    } */   
}

module.exports = {protect, restricTo}