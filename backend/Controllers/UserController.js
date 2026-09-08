import User from "../Models/UserModel.js";
import AsyncErrors from "../Middlewares/AsyncErrors.js";
import GenerateToken from "../Middlewares/GenerateToken.js";
const registerUser = AsyncErrors(async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  console.log(req.body);

  if (!firstName || !lastName || !email || !password || !phone) {
    return res.status(400).json({
      success: false,
      message: "First name, last name, email, phone and password are required",
    });
  }

  const existingUser = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: "Email is already registered",
    });
  }

  if (phone) {
    const existingPhone = await User.findOne({
      phone: phone.trim(),
    });

    if (existingPhone) {
      return res.status(409).json({
        success: false,
        message: "Phone number is already registered",
      });
    }
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  const newUser = await User.create({
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: email.toLowerCase().trim(),
    phone: phone ? phone.trim() : undefined,
    password: password,
  });

  // Generate JWT
  const token = GenerateToken(newUser._id);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",

    user: {
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      isEmailVerified: newUser.isEmailVerified,
      token: token,
    },
  });
});

const loginUser = AsyncErrors(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required",
    });
  }

  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  if (!user.isActive) {
    return res.status(403).json({
      success: false,
      message: "Your account has been deactivated",
    });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  user.lastLogin = new Date();

  await user.save();

  // Generate JWT
  const token = GenerateToken(user._id);

  return res.status(200).json({
    success: true,
    message: "Login successful",

    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage,
      isEmailVerified: user.isEmailVerified,
      lastLogin: user.lastLogin,
      token: token,
    },
  });
});

export { registerUser, loginUser };
