import express,{ Request, Response, NextFunction } from 'express'
import { userRouter } from './users/users';


const port = 8000 
const app = express()

app.use((req, res, next) => {
  console.log('time', Date.now());
  next()
})

app.get('/hello', (req, res) => {
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  
  res.status(401).send(err.message)
})

app.use('/users', userRouter)


app.listen(port, () => {
  console.log(`server started http://localhost:${port}`)
})