const {Review} = require("../db/sequelizeSetup")
const { errorValidationConstraint } = require("../errorHandler/errorValidationConstraint")

const findAllReview= async(req, res )=>{
    try{
        const allReview = await Review.findAll()
        res.json({message: `il y a  ${allReview.length}`, data: allReview})
    }catch (error){
        res.status(500).json(error);
    }
}
const updateReview = async (req, res ) =>{
    try {
        const reviewfind = await Review.findByPk( req.params.id)
        if(!reviewfind)res.status(404).json({message: "le commentaire n'existe pas "})
        res.status(200).json({message :"votre commentaire et modifié"})
    } catch (error) {
        errorValidationConstraint(error, res)
    } 
}
const createReview = async (req,res ) =>{
     req.body.UserId = req.data.id
    try {
       const comment = await Review.create(req.body)
       res.status(200).json({message: "votre commentaire est posté"})
    } catch (error) {
        errorValidationConstraint( error , res)
    }
}
const deleteReview = async(req, res) =>{
    try{
        const suppression = await Review.findByPk(req.params.id)    
        if(!suppression){
            return res.status(404).json({message: "le commentaire n'existe pas "})
        }
       await suppression.destroy()
       res.status(201).json({mesasge:`commentaire supprimé`})       
    }catch(error){
        errorValidationConstraint( error, res)
    }
}

module.exports = {createReview, updateReview, findAllReview, deleteReview }