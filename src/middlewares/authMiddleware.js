import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(400).json({
      message: 'Token không được cung cấp',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log('🚀 ~ file: authMiddleware.js:13 ~ authMiddleware ~ decoded:', decoded);

    req.user = decoded;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(403).json({
        message: 'Token hết hạn',
      });
    }

    return res.status(401).json({
      message: 'Token không hợp lệ',
    });
  }
};
