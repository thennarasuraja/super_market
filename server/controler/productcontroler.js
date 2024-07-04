import connection from '../configure/index.js'

export class ProductControler{
    static createproducts(req,res) {      //  insert Data
        const datas=req.body.products
        console.log(datas,"insertData")

        connection.query("INSERT INTO `products` SET ?", [datas],(err,result)=>{
            if(err){
                console.log(err,"somethingerror")

                return res.json({
                    success:false
                })
            }

            return res.json({
                success:true,
                message:result
            })
        })

    }
    static updateproduct(req,res){
        const updatedata=req.body.product
        // const productId=updatedata.productId
        console.log(updatedata)
    
    connection.query(`UPDATE products SET ? WHERE products.productId=${updatedata.productId}`,[updatedata],(err,result)=>{
      if(err){
        console.log(err,"somethingerror")

        return res.json({
            success:false
        })
      } 
      
      return res.json({
        success:true,
        message:'updated successfully'
      })
    })
    }
    static deleteproducts(req,res){
        const deletedata=req.body.product
        console.log(deletedata)

       connection.query(`DELETE FROM products WHERE products.productId=${deletedata}`,(err,result)=>{
        if(err){
            console.log("something error",err)

            return res.json({
                success:false
            })
        }
        return res.json({
            success:true,
            message:"deleted successfull"
        })
       }) 
    }
    static getproducts(req,res){
        
        connection.query("SELECT * from products",(err,result)=>{
            if(err){
                return res.send("something error")
            }
            return res.json({
                success:true,
                Alldata:result
            })
        })
    }
}