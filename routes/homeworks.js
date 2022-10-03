const express = require('express')
const HomeworksController = require('../controllers/homework')
const ensureAuth = require('../middleware/ensureAuth')

const router = express.Router()

// require auth for all homework routes
router.use(ensureAuth)

// GET all homeworks
router.get('/', HomeworksController.getHomeworks)

//GET a single homework
router.get('/:id', HomeworksController.getHomeworks)

// POST a new homework
router.post('/', HomeworksController.createHomework)

// DELETE a homework
router.delete('/:id', HomeworksController.deleteHomework)

// UPDATE a homework
router.put('/:id', HomeworksController.updateHomework)


module.exports = router