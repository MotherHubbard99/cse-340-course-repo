// Test route for 500 errors: http://127.0.0.1:3000/test-error
// Test route for 500 errors
const testErrorPage = (req, res, next) => {
    const err = new Error('This is a test error');
    err.status = 500;
    next(err);
};

// Export any controller functions
export { testErrorPage };