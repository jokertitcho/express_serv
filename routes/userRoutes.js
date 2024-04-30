const express = require('express')
const router = express.Router()
const { findAllUsers, createUser, findUserByPk, editProfil, updateUsers, deleteUsers, deleteMyProfil } = require('../controllers/userControler')
const { login, logOut } = require('../controllers/authController')
const {protect, restricTo} = require('../middleware/verifAuthentif')

router
    .route('/')
    .get(protect, restricTo("'admin"), findAllUsers)

router
    .route('/signup')
    .post(createUser)

router
    .route("/profil")
    .put(protect, editProfil)
    .delete(protect, restricTo("superAdmin"), deleteMyProfil)
    
//logging---------------
router
    .route('/login')
    .post(login)
router
    .route('/logOut')
    .put(logOut) 
    
router
    .route('/:id')
    .get(protect, restricTo("admin"),findUserByPk)
    .put(protect, restricTo("admin"), updateUsers)
    .delete(protect, restricTo("superAdmin"), deleteUsers)

module.exports = router