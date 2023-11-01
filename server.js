const express = require('express');
const app = express();

const indexRouter = require('./routes');
const userRouter = require('./routes/user');

const path = require('path');

const cors = require('cors');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('port', process.env.PORT || 3001);

app.use(express.static(path.join(__dirname, 'react-project', 'build')))

app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen(app.get('port'), () => {
    console.log('port waiting... 🐼')
});
