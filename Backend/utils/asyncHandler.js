 const asyncHandler = (reqHandler) => async (req, res, next) => {
  try {
    await reqHandler(req, res, next)
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong", error: error.message });
  }
};

export default asyncHandler
