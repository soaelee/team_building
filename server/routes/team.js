const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Team } = require('../models/Team');
// const cookieParser = require("cookie-parser");
const {auth} = require('../middleware/auth')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file")

// router.use(cookieParser());

router.post('/image', (req, res) => {
    //가져온 이미지를 저장을 해주면 된다.
    upload(req, res, err => {
        if (err) { return res.json({ success: false, err }) }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
})

router.post('/', (req, res) => {

    // req.body = {
    //     category: category,
    //     title: name,
    //     description: description,
    //     images: Images,
    //     depart: tmpArray,
    //     contact: contact
    // }
    
    //받아온 정보들을 DB에 넣어 준다.
    const team = new Team(req.body)

    team.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

})

router.post('/teams', (req, res) => {

    // product collection에 들어 있는 모든 상품 정보를 가져오기 
    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm

    let findArgs = {category : req.body.filters["category"]};
    let departArgs = []
    if(req.body.filters["depart"]){ departArgs = req.body.filters["depart"] }

    //검색어가 있고
    if (term) {
        if(departArgs.length > 0) { //필터가 있을 경우
            Team.find(findArgs)
                .find({"title": {"$regex": term}})//.find({ $text: { $search: term } })
                .find({depart: {$in: departArgs}})
                .populate("writer") 
                .sort('-updateData')
                .skip(skip)
                .limit(limit)
                .exec((err, teamInfo) => {
                    if (err) return res.status(400).json({ success: false, err })
                    return res.status(200).json({
                        success: true, teamInfo,
                        postSize: teamInfo.length
                    })
                })
        } 
        else {Team.find(findArgs) //검색만 할 경우
            .find({"title": {"$regex": term}})
            .populate("writer") 
            .skip(skip)
            .limit(limit)
            .exec((err, teamInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, teamInfo,
                    postSize: teamInfo.length
                })
            })
        }
    }
    else {
        if(departArgs.length > 0) { //필터가 있을 경우
            Team.find(findArgs)
                .find({depart: {$in: departArgs}})
                .populate("writer") 
                .sort('-updateData')
                .skip(skip)
                .limit(limit)
                .exec((err, teamInfo) => {
                    if (err) return res.status(400).json({ success: false, err })
                    return res.status(200).json({
                        success: true, teamInfo,
                        postSize: teamInfo.length
                    })
            })
        }
        else {
            Team.find(findArgs)
            .populate("writer") 
            .sort('-updateData')
            .skip(skip)
            .limit(limit)
            .exec((err, teamInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, teamInfo,
                    postSize: teamInfo.length
                })
            })
        }
    }
})

router.post('/mylist', auth, (req, res) => {
    const findArgs = {writer: req.user._id};
    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let isLike = req.body.isLike ? true : false;
    console.log(isLike);
    if(isLike){
        let like = req.user.like.map(item => {
            return item.id
        });
        console.log(like);

            //postId를 이용해서 DB에서 같은 ID의 정보를 가져온다.
        Team.find({ _id: { $in: like } })
        .populate('writer')
        .exec((err, listInfo) => {
            if(err) return res.status(400).json({success: false, err})
            return res.status(200).json({
                success: true, listInfo
            })
        })

    } else {
        Team.find(findArgs)
        .populate("writer")
        .skip(skip)
        .limit(limit)
        .sort('-updateData')
        .exec((err, listInfo) => {
            if(err) return res.status(400).json({success: false, err})
            return res.status(200).json({
                success: true, listInfo
            })
        })
    }
})

router.get('/pagination', auth, (req, res) => {
    const findArgs = {writer: req.user._id};

    Team.find(findArgs)
        .populate("writer")
        .exec((err, listInfo) => {
        if(err) return res.status(400).send(err)
        return res.status(200).send(listInfo)
    })
})
///api/team/post_by_id?id=${postId}&type=single
//id=123123123,324234234,324234234  type=array
router.get('/post_by_id', auth, (req, res) => {

    let type = req.query.type
    let postIds = req.query.id

    console.log(req.cookies);
    
    if (type === "array") {
        //id=123123123,324234234,324234234 이거를 
        //productIds = ['123123123', '324234234', '324234234'] 이런식으로 바꿔주기
        let ids = req.query.id.split(',')
        postIds = ids.map(item => {
            return item
        })
    }
   
    //postId를 이용해서 DB에서 같은 ID의 정보를 가져온다.
    Team.find({ _id: { $in: postIds } })
    .populate('writer')
    .exec((err, team) => {
        if (err) return res.status(400).send(err)
        return res.status(200).send(team)
    })

})

///api/team/removePost?id=${postId}
router.get('/removePost', (req, res) => {
    let postId = req.query.id
    console.log(postId);
    Team.deleteOne({ _id: postId})
        .exec((err, result) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success: true})
        })
})

router.post('/update', (req, res) => {

    const id = req.body.postId;
    const category= req.body.category;
    const title = req.body.title;
    const description = req.body.description;
    const images = req.body.images;
    const depart = req.body.depart;
    const contact = req.body.contact;

    Team.findOneAndUpdate({_id: id}, 
        {$set: { "title": title, "category": category, "description": description, "images": images, "depart": depart, "contact": contact  }}, null, (err, result) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success: true})
        }
        )
})

module.exports = router;