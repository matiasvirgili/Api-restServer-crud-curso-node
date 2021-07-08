const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })

    console.log('base de datos conectada')
  } catch (error) {
    throw new Error('Error a la hora de iniciar la base de datos')
  }
}

module.exports = {
  dbConnection,
}
