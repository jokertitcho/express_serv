const express = require('express')
const { protect } = require('../middleware/verifAuthentif')
const { createReview, updateReview, findAllReview, deleteReview } = require('../controllers/reviewControler')
const router = express.Router()

router
    .route('/')
    .get(protect, findAllReview)
    .post(protect, createReview)

router
    .route('/:id')
    .put(protect, updateReview)
    .delete(protect, deleteReview)
module.exports = router