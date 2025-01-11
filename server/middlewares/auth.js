import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Remove 'Bearer ' from the token
  if (!token) {
    return res.status(401).json({ success: false, error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.role) {
      return res.status(403).json({ success: false, message: 'Role not defined in token' });
    }

    req.user = decoded; // Store the decoded token data on the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('Token verification failed:', err); // Log any error during verification
    res.status(400).json({ success: false, error: 'Invalid token' });
  }
};
