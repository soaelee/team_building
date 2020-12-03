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
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ name: req.body.name }, (err, user) => {

        if(!user) 
            return res.json({
                loginSuccess: false,
                message: "일치하는 아이디가 없습니다."
            });
        
        user.comparePassword(req.body.password, (err, isMatch) =>{
            if (!isMatch)
                return res.json({loginSuccess: false, message: "잘못된 비밀번호입니다."});

                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err)

                    res.cookie("w_authExp", user.tokenExp);
                    res.cookie("w_auth", user.token).status(200).json({loginSuccess: true, userId: user._id})
                });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        
        res.clearCookie("w_auth");
        res.clearCookie("w_authExp");
        res.status(200).send({
            success: true
        });
    });
});

router.post('/addLike', auth, (req, res) => {
    const user = req.user._id;
    const postId = req.body.postId;

    User.findOne({ _id : user},
        (err, userInfo) => {
            //좋아요가 like에 이미 있는지 확인하기!
            let duplicate = false;
            userInfo.like.forEach( item => {
                if (item.id === postId){
                    duplicate = true;
                }
            })

            //이미 like에 있다면 삭제
            if (duplicate){
                User.findOneAndUpdate(
                    {_id: user},
                    {"$pull":{"like": {"id": postId}}},
                    { new: true},
                    (err, userInfo) => {
                        if(err) return res.status(400).json({success: false, err})
                        return res.status(200).json({success: true, duplicate: true})
                    }
                )
            } else { //like에 없다면 더해주자!
                User.findOneAndUpdate(
                    {_id: user},
                    {$push: { like: { id: postId, date: Date.now()}}},
                    { new: true},
                    (err, userInfo) => {
                        if(err) return res.status(400).json({success: false, err})
                        return res.status(200).json({success: true, deplicate: false})
                    }
                )
            }
        })
})
module.exports = router;
