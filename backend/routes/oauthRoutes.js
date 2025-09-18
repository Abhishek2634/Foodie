import express from 'express';
import passport from 'passport';
import { oauthSuccess } from '../controllers/oauthController.js';

const router = express.Router();

router.get('/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/',session: false}),oauthSuccess);

export default router;