import express from 'express';
import {
  activateUser,
  userRegistration,
} from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/register', userRegistration);
userRouter.post('/activate-user', activateUser);

export default userRouter;
