var express = require('express')
var app = express()
// post 받으려면 body-parser
var bodyParser = require('body-parser')
var mysql = require('mysql')
var main = require('./routes/main') // js는 생략 가능하다.

// db connection
//express에 mysql 연결 가이드 있어!
//
var connection = mysql.createConnection({
    host: 'us-cdbr-iron-east-05.cleardb.net',
    user : 'b84bd6e063c03d',
    port : '3306',
    password : '378507c8',
    database : 'heroku_ede7c59d187240c'
})

// var connection = mysql.createConnection({
//     host : 'localhost',
//     port : '3306',
//     user : 'honeycombo',
//     password : 'sjaqj15951!',
//     database : 'honeycombo'
// })

connection.connect();

app.listen(process.env.PORT || 3000, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)
    // console.log("start, express server on port 3000")
});

// 도메인에서 해당 디렉토리 아래의 파일 바로 다운로드 가능
app.use(express.static('public'))
app.use(express.static('public/javascripts'))
app.use(express.static('public/images'))
app.use('/main', main) // main으로 들어오면 main.js모듈을 쓰게 해달라는 것! 라우터 정보 넣어

// post방식으로 받기 위해서 bodyparser 쓴다고 말해줘야해
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true})) // post에서 json으로 전송하지 않고 받을 때 인코딩해서 들어옴.

// html과 서버 데이터 결합하려면 ejs -> var로 인클루드 필요 없어!
app.set('view engine', 'ejs') // view engine == ejs



app.post('/email_post', function(req, res){
    // post는 data 받으려면 bodyparser 모듈 필요함 -> npm install body-parser --save
    // console로 찍어서 확인해봐
    console.log(req.body.email)

    // res.send("welcome!" + req.body.email)
    res.render('email.ejs', {'email' : req.body.email})
});

// form에서 submit 해도 새로고침 없이 ajax로 확인해서 보내는법!
app.post('/ajax_send_email', function(req, res){
    // console.log(req.body.email);
    // 온 거 확인했으니 응답하자!
    var email = req.body.email;
    // 여기서 반드시 해야할 것 : check validation about input value -> select DB로 디비 조회해서 값이 맞는지 확인한 뒤 보내!
    var responseData = {}; // obj 형태로 초기화해두기

    var query = connection.query('select name from user where email = "'+email+'"', function(err, rows) {
        if(err) throw err; // client로 500error 보내는 게 정상!
        if(rows[0]) {
            console.log(rows[0])
            responseData.result = "ok";
            responseData.name = rows[0].name;
        } else {
            responseData.result = "none";
            responseData.name = "";
            console.log('non : ' + rows[0])
        }
        res.json(responseData)
    });
    // res.json(responseData);
});