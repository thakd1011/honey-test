// app은 express에서 나오는 객체라 찾을 수가 없다!
var express = require('express')
var app = express()
var router = express.Router();
//상위 폴더에 가기 위해서 상대경로 쓰려면 path 쓰자!
var path = require('path')

// url routing - get방식
// 여기는 /main이 루트니까 get /이걸로만 받아도돼
router.get('/', function(req, res) {
    console.log("main.js loaded");
    // get으로 data 받는 경우 : req.param('email') 이런 식으로 받을 수 있음
    res.sendFile(path.join(__dirname,'../public/form.html'))
});
//router로 만든 모듈을 export 할 수 있다!
//node에선 외부 라이브러리 가져와서 require로 가져오거나 export 할 수 있다.
// exports 하면 다른 파일 (app.js)에서 가져다 쓸 수 있다!
module.exports = router;