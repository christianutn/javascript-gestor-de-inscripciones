import { Router } from "express";
import passport from "passport";
import { postLogin } from "../controllers/login.controller.js";

const loginRouter = Router();

loginRouter.post('/',passport.authenticate('login', {session: false}), postLogin);

export default loginRouter



