import {Router} from 'express';
import { getUsers, getUserByCuil, postUser, deleteUserByCuil, updatedUserByCuil } from '../controllers/user.controller.js';
import passport from 'passport';
import { authorization } from '../../utils/authorization.js';

const userRouter = Router();

userRouter.get('/', passport.authenticate('jwt', {session: false}), authorization(["super", "cronograma", "administrador"]), getUsers);
userRouter.get('/:cuil', passport.authenticate('jwt', {session: false}), authorization(["super", "cronograma", "administrador"]), getUserByCuil);
userRouter.post('/register', passport.authenticate('jwt', {session: false}), authorization(["super", "cronograma", "administrador"]), passport.authenticate('register', {session: false}),  postUser);
userRouter.delete('/:cuil', passport.authenticate('jwt', {session: false}), authorization(["super"]), deleteUserByCuil);
userRouter.put('/:cuil', passport.authenticate('jwt', {session: false}), authorization(["super", "cronograma", "administrador"]), updatedUserByCuil);

export default userRouter