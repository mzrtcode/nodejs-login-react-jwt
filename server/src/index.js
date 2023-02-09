import express from 'express'
import cors from 'cors'
import userRouter from './routes/user.routes.js'


const app = express();

app.use(cors())
app.use(express.json())
app.use(userRouter)

app.listen(3000,()=>{
    console.log('Server listening on port 3000')
})