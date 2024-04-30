
const {User, Role} =require("../db/sequelizeSetup")
const { errorValidationConstraint } = require("../errorHandler/errorValidationConstraint")
const bcrypt = require("bcrypt")

const findAllUsers = async(req, res) => {
    try {
        const allUser = await User.findAll()
        res.status(200).json({message:allUser})
    } catch (error) {
        res.status(500).json(error)    
    }
  /* res.json({ message: 'Hello utilisateur!' }) */
}

const findUserByPk = async(req, res) => {
    console.log(req); 
    try {
        const resultUser = await User.findByPk(req)
        res.status(200).json({message:`utilisateur trouvé ${resultUser.username}`})
    } catch (error) {
        res.status(500).json({message:`un probleme est survenue ${error}`})   
    } 
}

const createUser =async (req, res) => {
    try {
        const hashPass = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashPass

        if(req.body.RoleId)return res.status(403).json({message: "droit non modifiable"})

        const resultCreate = await User.create(req.body)
        res.status(200).json({message:`l'utilisateur ${resultCreate.username} a etait creer`})
    } catch (error) {
       errorValidationConstraint(error, res) 
    }
}
const editProfil = async(req, res, next)=>{
    console.log(req.body);
    const {password} = req.body
    try {
        const findUser = await User.findByPk(req.data.id, {include:Role})
        if(!findUser)return res.status(404).json({ message :"l'utilisateur n'existe pas "})
        
        if(req.body.RoleID)return res.status(403).json({ message: 'Droit non modifiable' })
        
        if(password){
        const newPass = await bcrypt.hash(password, 10)
        req.body.password = newPass
        await findUser.update (req.body)
        return res.status(200).json({message : "votre mot de passe a ete modifié"})
        }
        
    } catch (error) {
        errorValidationConstraint(error, res)
    }
}

const updateUsers = async (req, res)=>{
    try {
        console.log(req.body);
        const findUserById = await findUserByPk(req.params.id, {include: Role});
        if(!findUserById)return res.status(404).json({message: "l'utilisateur n'existe pas"})
        if(req.body.password){
            const hash = await bcrypt.hash(req.body.password, 10)
            req.body.password = hash
        }
        if(req.body.RoleId){
           if(req.body.RoleId < req.data.Role.id)return res.status(403).json({message:"droits insuffisants "})
        }
        await findUserById.update(req.body)
        res.status(201).json({ message : 'ulitilisateur modifié ', data: findUserById})
    } catch (error) {
        errorValidationConstraint(error, res)
    }
}

const deleteMyProfil = async (req, res )=>{
    try {
        const findIdForDelete = await User.findByPk(req.data.id)
        if (!findIdForDelete) {
            return res.status(404).json({message: "l'utilisateur que vous essayez de suprimer n'existe pas"})
        }
        await findIdForDelete.destroy()
        res.clearCookie("access_token").status(200).json({message : "l'utilisateur a ete suprimé "})

    } catch (error) {
        errorValidationConstraint(error, res)
    }
}

const deleteUsers = async (req, res)=>{
    try {
        const findUserforDelete = await User.findByPk(req.params.id)
        if(!findUserforDelete){
            return res.status(404).json({message: "l'utilisateur n'existe pas"})
        }
        await findUserforDelete.destroy()
        res.status(200).json({message :"utilisateur supprimé"})
        
    }catch(error){
        errorValidationConstraint(error, res)
    }
}
module.exports = { findAllUsers, findUserByPk, createUser, editProfil, updateUsers, deleteUsers, deleteMyProfil }