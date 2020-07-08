const shop=require("./src/mock.json")
module.exports={
    lintOnSave:false,//阻止控制台报错
    devServer:{
        before(app){
            app.get("/getList",(req,res)=>{
                res.send(shop)
            })
        }
    }
}