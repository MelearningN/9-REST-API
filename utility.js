exports.asyncHandler= (cb)=> {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        next(error);
      }
    }
  }

exports.errorHandler=(error, res)=>{
if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    const errors = error.errors.map(err => err.message);
  return  res.status(400).json({ errors });   
  } else {
    throw error;
  }
}