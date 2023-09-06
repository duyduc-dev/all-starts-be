export const validationMdw = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body);
    next();
  } catch (error) {
    res.status(500).json({ message: error.errors.join(', ') });
  }
};
