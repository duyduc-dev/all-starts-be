class AuthController {
  // [GET] /auth/
  index(req, res) {
    res.json({
      message: 'Test api [GET] /api/v1/auth',
    });
  }

  // [POST] /auth/login
  login(req, res) {
    res.json({
      message: 'this is api login',
    });
  }

  // [POST] /auth/signup
  signup(req, res) {
    res.json({
      message: 'this is api signup',
    });
  }
}

const authController = new AuthController();

export default authController;
