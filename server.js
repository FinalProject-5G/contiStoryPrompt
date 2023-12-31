const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const indexRouter = require('./routes');
const kakaoRouter = require('./routes/userKakao');
const googleRouter = require('./routes/userGoogle');
const userRouter = require('./routes/user');
const userJoinRouter = require('./routes/userJoin')
const userMyPageRouter = require('./routes/userMyPage')
const userLoginRouter = require('./routes/userLogin');
const contiRouter = require('./routes/userMyConti')
const exportsRouter = require('./routes/exports');
const uploadRouter = require('./routes/upload');
const generateRouter = require('./routes/generate')
const session = require('express-session');
const fileStore = require('session-file-store')(session)

const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3001;


var fileStoreOptions = {
    path: "./sessions",
    reapInterval: 360000
};

// JSON 요청 본문 크기 제한 늘리기 (50MB로 설정)
app.use(bodyParser.json({ limit: '50mb' }));
// URL-encoded 요청 본문 크기 제한 늘리기 (50MB로 설정)
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(session({
    httpOnly: true,  //http 요청으로 온 것만 처리
    resave: false, // session을 항상 재 저장할지? 즉 새로고침을 할 때마다 저장할거냐~!?
    secret: "secret", //암호화할 때 쓰는 키값
    store: new fileStore(fileStoreOptions),  //세션을 저장하기 위한 저장소
    cookie: { maxAge: 360000 }
}))

// JSON 요청 본문 크기 제한 늘리기 (50MB로 설정)
app.use(bodyParser.json({ limit: '50mb' }));
// URL-encoded 요청 본문 크기 제한 늘리기 (50MB로 설정)
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/userJoin', userJoinRouter);
app.use('/kakao', kakaoRouter);
app.use('/google', googleRouter);
app.use('/userLogin', userLoginRouter);
app.use('/exports', exportsRouter);
app.use('/upload', uploadRouter);
app.use('/conti', contiRouter);
app.use('/userpage', userMyPageRouter);
app.use('/generate', generateRouter);
app.use(express.static(path.join(__dirname, 'final-project', 'build')));

app.listen(PORT, () => {
    console.log(`port waiting... 🐼 ${PORT}`);
});
