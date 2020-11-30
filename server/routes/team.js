const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Team } = require('../models/Team');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {

    //가져온 이미지를 저장을 해주면 된다.
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })

})




router.post('/', (req, res) => {

    // req.body = {
    //     category: category,
    //     name: name,
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


    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    // product collection에 들어 있는 모든 상품 정보를 가져오기 
    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm


    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {

            console.log('key', key)

            if (key === "price") {
                findArgs[key] = {
                    //Greater than equal
                    $gte: req.body.filters[key][0],
                    //Less than equal
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }

        }
    }


    if (term) {
        Team.find(findArgs)
            .find({ $text: { $search: term } })
            .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, teamInfo) => {
                if (err) return res.status(400).json({ success: false, err })
                return res.status(200).json({
                    success: true, teamInfo,
                    postSize: teamInfo.length
                })
            })
    } else {
        Team.find(findArgs)
            .populate("writer")
            .sort([[sortBy, order]])
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

})


//id=123123123,324234234,324234234  type=array
router.get('/teams_by_id', (req, res) => {

    let type = req.query.type
    let productIds = req.query.id

    if (type === "array") {
        //id=123123123,324234234,324234234 이거를 
        //productIds = ['123123123', '324234234', '324234234'] 이런식으로 바꿔주기
        let ids = req.query.id.split(',')
        teamIds = ids.map(item => {
            return item
        })

    }

    //productId를 이용해서 DB에서  productId와 같은 상품의 정보를 가져온다.

    Team.find({ _id: { $in: teamIds } })
        .populate('writer')
        .exec((err, team) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(team)
        })

})






module.exports = router;