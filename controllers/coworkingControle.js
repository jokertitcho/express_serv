const {Coworking} = require("../db/sequelizeSetup")
const {Op} = require("sequelize")
const { errorValidationConstraint } = require("../errorHandler/errorValidationConstraint")

const allRecupCoworks = async(req, res) => {
    try{
        const allCowork = await Coworking.findAll()

        res.json({message: `il y a  ${allCowork.length}`, data: allCowork})
    }catch (error){
        res.status(500).json(error);
    }   
    /* res.json({ message: `Il y a ${coworkingsData.length} coworkings`, data: coworkingsData }) */
}

const createCowork = async (req, res) => {
    try {
        const newCoworking = await Coworking.create(req.body)
        res.status(201).json({ message: `Un coworking a bien été ajouté`, data: newCoworking })
        console.log(newCoworking.message);
    } catch (error) {
        errorValidationConstraintnt(error, res)
    }
}

const findIdCowork = async(req, res) => {
    try{
        const idUserCall = await Coworking.findByPk(req.params.id)    
        res.json(idUserCall)
    }catch(error){
        res.json(error);
    }
}

const updateCoworkById = async(req, res) => {
    try{
        const modification = await Coworking.findByPk(req.params.id)    
        if(!modification){
            return res.status(404).json({message: "le coworking n'existe pas "})
        }
       await modification.update(req.body)
        res.status(201).json({message :modification})
    }catch(error) {
        errorValidationConstraint(error, res)
    }  
}

const deleteCoworkById = async(req, res) => {
    try{
        const suppression = await Coworking.findByPk(req.params.id)    
        if(!suppression){
            return res.status(404).json({message: "le coworking n'existe pas "})
        }
       await suppression.destroy()
       res.status(201).json({mesasge:`coworking supprimé`})       
    }catch(error){
        res.status(500).json(error.message)
    }   
}
const searchRecupCoworks = async(req, res) => {
    try{
        const allCowork = await Coworking.findAll({where : {name:{ [Op.substring]: `${req.query.name}`} }})
        res.json({message: `il y a  ${allCowork.length}`, data: allCowork})
    }catch (error){
        res.status(500).json(error);
    }   
    /* res.json({ message: `Il y a ${coworkingsData.length} coworkings`, data: coworkingsData }) */
}


module.exports = {allRecupCoworks, createCowork,findIdCowork,updateCoworkById, deleteCoworkById, searchRecupCoworks}