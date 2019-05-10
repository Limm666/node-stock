export class ResultFul{
    static success(result,res){
        // result.message ='success'
        let retInfo ={}
        console.log("result.toString()",result)
        retInfo.message = result.stockInfo
        res.status(200).json(retInfo)
    }
    static failedError(errorCode,err,res){
        console.log('OPS,ERROR OCCUERD!',err)
        res.status(errorCode).send({error:err})
    }
}