export class ResultFul{
    static success(result,res){
        result.message ='success'
        res.status(200).json(result)
    }
    static failedError(errorCode,err,res){
        console.log('OPS,ERROR OCCUERD!',err)
        res.status(errorCode).send({error:err})
    }
}