const mongoose = require('mongoose')
const config = require('config')

const connectDB = async (db = process.env.mongoURI || config.get('mongoURI')) => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Conected...')
  } catch (error) {
    console.error(error.message)
    process.exit(1)
  }
}

module.exports = connectDB