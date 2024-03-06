const express = require('express')
const bodyParser = require('body-parser')
const riskRoute = require('./routes/riskRoute')
const Risk = require('./models/RiskModel')
const cors = require('cors')
require('dotenv').config()

const app = express()


 app.use(bodyParser.json())
 app.use(express.urlencoded({extended: true}))

app.use(cors())
app.use('/risks', riskRoute);


Risk.sync({force: false})
.then(() => {
   console.log('Risk model synchronized with DB')
})
.catch((error) => {
   console.error('Error synchronizing Risk model with the database:', error)
})

 app.listen(process.env.PORT_NUMBER_2, () =>{
    console.log(`Server is connected on ${process.env.PORT_NUMBER_2}`)
 })