// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error occurred in TruthLayer API:', err);

  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'An internal server error occurred',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export default errorHandler;
