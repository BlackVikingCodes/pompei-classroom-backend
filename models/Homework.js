const mongoose = require('mongoose')

const Schema = mongoose.Schema

const homeworkSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  grade: {
    type: Number,
  },
  teacher: {
    type: Boolean, 
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Homework', homeworkSchema)