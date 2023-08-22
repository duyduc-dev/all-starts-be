class AuthController {
  // [POST] /auth/login
  login(req, res) {
    res.json({
      message: 'this is api login',
    });
  }
}

const authController = new AuthController();

export default authController;
