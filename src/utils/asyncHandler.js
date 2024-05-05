//promise based wrapper function
const asyncHandler = (requestHandler) => {
   (req , res , next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
 }
}

export {asyncHandler}


//wrapper function
//try/catch based function
//Higher order function
//it takes function and then passed it into another function
// const asyncHandler = (fn) => async (req,res,next) => {
//   try{
//      await fn(req,res,next)
//   }catch(error){
//     res.status(err.code || 500).json({
//         success:false,
//         message: err.message
//     })
//   }

// }