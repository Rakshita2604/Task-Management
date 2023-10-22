// Middleware to check if the user is an admin
function isAdmin(req, res, next) {
    // Check user's role and authenticate user if necessary
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    return res.status(403).json({ message: 'Access denied. Admin privilege required.' });
  }
  
  // Middleware to check if the user is a regular user
  function isRegularUser(req, res, next) {
    // Check user's role and authenticate user if necessary
    if (req.user && req.user.role === 'regular') {
      return next();
    }
    return res.status(403).json({ message: 'Access denied. Regular user privilege required.' });
  }
  
  module.exports = { isAdmin, isRegularUser };
  