/*
  Middleware to ensure the user has the required role.
  @param {String} requiredRole - The role required to access the route.
  @returns {Function} Middleware function to validate the role.
 */
exports.requireRole = (requiredRole) => (req, res, next) => {
  const { role } = req.user; // Extract user role from the `req.user` object

  // Error handling: Check if the role is missing or doesn't match
  if (!role) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. User role is not defined.',
    });
  }

  if (role !== requiredRole) {
    return res.status(403).json({
      success: false,
      message: `Access denied. This route requires the '${requiredRole}' role. Your role is '${role}'.`,
    });
  }

  return next(); // Proceed to the next middleware or controller
};
