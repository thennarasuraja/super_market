import express from 'express'
import { ProductControler } from '../controler/productcontroler.js'


const router=express.Router()

router.post('/creat',ProductControler.createproducts)
router.put('/update',ProductControler.updateproduct)
router.delete('/delete',ProductControler.deleteproducts)
router.get('/get',ProductControler.getproducts)
router.get('/',(req,res)=>{
    res.send("response success")
})

export default router;