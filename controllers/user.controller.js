import 'dotenv/config';
import userModel from '../models/user.model.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import { userErrorMessages } from '../errors/user.error.js';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';

export const userRegistration = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isEmailExist = await userModel.findOne({ email });

    if (isEmailExist) {
      return next(new ErrorHandler(userErrorMessages[1001], 1001));
    }

    /**@type {import('../types/user.type.js').UserRegistrationBody} */
    const user = { name, email, password };

    const { activationCode, token } = createActivationToken(user);

    const data = {
      user: {
        name: user.name,
      },
      activationCode,
    };

    try {
      await sendEmail({
        email: user.email,
        subject: 'Activate your account',
        template: 'activation-email.ejs',
        data,
      });

      res.status(201).send({
        succuss: true,
        message: `please check your email: ${user.email} to activate your account`,
        activationToken: token,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const createActivationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET,
    {
      expiresIn: '2h',
    },
  );

  return { token, activationCode };
};

export const activateUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { activationToken, activationCode } = req.body;

    /** @type {*}*/
    const newUser = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

    if (newUser.activationCode !== activationCode) {
      return next(new ErrorHandler('Invalid Activation Code', 400));
    }

    const { name, email, password } = newUser.user;

    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return next(new ErrorHandler('Email Already Exist', 400));
    }

    const user = await userModel.create({ name, email, password });

    res.status(201).json({ succuss: true });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
