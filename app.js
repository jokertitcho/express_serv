const express = require('express')
const morgan = require('morgan')
const cookieParser = require("cookie-parser")
const app = express()
const port = process.env.PORT || 5000

require("./db/sequelizeSetup")
console.log(process.env.NODE_ENV);
app
    
    .use(express.json())
    .use(cookieParser())
if(process.env.NODE_ENV === "developpement")app.use(morgan('dev'))

const coworkingRouter = require('./routes/coworkingRoutes')
const userRouter = require('./routes/userRoutes')
const reviewRouter = require('./routes/reviewRoutes')

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' })
})

app.use('/api/coworkings', coworkingRouter)
app.use('/api/users', userRouter)
app.use('/api/reviews', reviewRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})