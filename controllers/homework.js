const Homework = require('../models/Homework')
const mongoose = require('mongoose')

module.exports = {
  getHomeworks: async (req, res) => {
  
    const homeworks = await Homework.find({}).sort({createdAt: -1})
  
    res.status(200).json(homeworks)
  },

  getHomework: async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such homework'})
    }
  
    const homework = await Homework.findById(id)
  
    if (!homework) {
      return res.status(404).json({error: 'No such homework'})
    }
    
    res.status(200).json(homework)
  },

  createHomework: async (req, res) => {
    const {title, content, grade, teacher} = req.body
  
    let emptyFields = []
  
    if(!title) {
      emptyFields.push('title')
    }
    if(!content) {
      emptyFields.push('content')
    }
    if(!grade) {
      emptyFields.push('grade')
    }
    if(!teacher) {
      emptyFields.push('teacher')
    }
    if(emptyFields.includes('teacher')) {
      return res.status(400).json({ error: 'Only teachers can create homeworks'})
    }
    if(emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }
  
    // add doc to db
    try {
      const user_id = req.user._id
      const homework = await Homework.create({title, content, grade, teacher, user_id})
      console.log(req.user)
      res.status(200).json(homework)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  },

  deleteHomework: async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such homework'})
    }
  
    const homework = await Homework.findOneAndDelete({_id: id})
  
    if (!homework) {
      return res.status(400).json({error: 'No such homework'})
    }
  
    res.status(200).json(homework)
  },

  updateHomework:  async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such homework'})
    }
  
    const homework = await Homework.findOneAndUpdate({_id: id}, {
      ...req.body
    })
  
    if (!homework) {
      return res.status(400).json({error: 'No such homework'})
    }
  
    res.status(200).json(homework)
  }
}
/*
// get all homeworks
const getHomeworks = async (req, res) => {
  const user_id = req.user._id

  const homeworks = await Homework.find({user_id}).sort({createdAt: -1})

  res.status(200).json(homeworks)
}

// get a single homework
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such homework'})
  }

  const homework = await Homework.findById(id)

  if (!homework) {
    return res.status(404).json({error: 'No such homework'})
  }
  
  res.status(200).json(homework)
}


// create new homework
const createWorkout = async (req, res) => {
  const {title, load, reps} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!load) {
    emptyFields.push('load')
  }
  if(!reps) {
    emptyFields.push('reps')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const homework = await Homework.create({title, load, reps, user_id})
    res.status(200).json(homework)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a homework
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such homework'})
  }

  const homework = await Homework.findOneAndDelete({_id: id})

  if (!homework) {
    return res.status(400).json({error: 'No such homework'})
  }

  res.status(200).json(homework)
}

// update a homework
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such homework'})
  }

  const homework = await Homework.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!homework) {
    return res.status(400).json({error: 'No such homework'})
  }

  res.status(200).json(homework)
}


module.exports = {
  getHomeworks,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}
*/