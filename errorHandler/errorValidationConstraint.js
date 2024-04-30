const { UniqueConstraintError, ValidationError } = require("sequelize")

const errorValidationConstraint = (error , res)=>{
    if(error instanceof UniqueConstraintError){

       console.log(error.parent.sqlMessage); 
       //patch qui regler le souci de recuperation de message du model pour l'unicité
       const substring = error.parent.sqlMessage.split(`'`)
       const field = substring[substring.length - 2]

        return res.status(400).json({message: `${field}deja pris`})
    }
    if(error instanceof ValidationError){
        return res.status(400).json({message: error.message})
    }
    console.log(error);
    res.status(500).json({ message: `Une erreur est survenue` })
}
module.exports ={errorValidationConstraint}