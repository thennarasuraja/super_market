import express from 'express'
import bodyparser from 'body-parser'
import cors from 'cors'


import productroute from './routes/product.js'



const server=express()
const port=5001

server.use(cors())
server.use(bodyparser.json())
server.get('/',(req,res)=>{
    res.send("response successfully")
})


server.use('/product',productroute)



server.listen(port,()=>{
   console.log(`server is running ${port}`)
})