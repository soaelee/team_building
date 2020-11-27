const express = require('express');
const router = express.Router();
const {User} = require('../models/User');

const { auth } = require('../middleware/auth');
const async = require('async');

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        name: req.user.name,
        like: req.user.like,
        history: req.user.history
    });
});

router.post("/register", (req, res) => {

    console.log(req.body)
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

module.exports = router;