const conn = require("../config/database");
const express = require("express");
const router = express.Router();


//패스워드 인증
router.post('/vaildpassword',(req,res)=>{
    const {password,email} = req.body
    console.log(password,email)
    sql = 'select * from t_user where user_email = ? and user_password =?'
    conn.query(sql,[email,password],(err,rows)=>{
        console.log(rows.length)
        if(err){
            res.send('fail')
        }else if(rows.length>0){
            res.send('success')
        }else{
            res.send('invaild')
        }
    })
 })

//회원정보수정
router.post("/update", (req, res) => {
  let { email } = req.body;
  console.log(email);
  let sql = "select * from t_user where user_email = ?";
  conn.query(sql, [email], (err, rows) => {
    if (err) {
      res.send("err");
    } else if (rows.length > 0) {
      res.json(rows[0]);
    }
  });
});
module.exports = router;
