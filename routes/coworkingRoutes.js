const express = require('express')
const router = express.Router()
const { allRecupCoworks, createCowork,findIdCowork, updateCoworkById,deleteCoworkById, searchRecupCoworks } = require("../controllers/coworkingControle")
const {protect} = require('../middleware/verifAuthentif')

router
    .route('/')
    .get(allRecupCoworks)
    .post(protect, createCowork)

router
    .route('/search')
    .get(searchRecupCoworks)
    
router
    .route('/:id')
    .get(findIdCowork)
    .put(protect, updateCoworkById)
    .delete(protect, deleteCoworkById)

module.exports = router