import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from "./Nav.module.css"
import axios from '../../axios'
const Password = () => {
  const nav = useNavigate();
  const [password, setpassword] = useState('')


  const vaildPassword = () => {

    console.log('validPassword Function', sessionStorage.getItem('email'))
    axios.post('/userpage/vaildpassword', { password: password, email: sessionStorage.getItem('email') })
      .then((res) => {
        console.log('node -> react res', res)
        if (res.data == 'success') { nav('/mypage') }
        else { alert('패스워드가 틀립니다.') }
      }

      )
      .catch((error) => {
        console.error('Error during update:', error);
        alert('An error occurred during the update.');
      });
  }
  return (

    <div className={styles.PasswordForm}>
      <h4>내정보수정</h4>
      <div>
        <h6>비밀번호</h6>
        <input type="password" onChange={(e) => setpassword(e.target.value)}></input>
        <button className={styles.checkpw} onClick={vaildPassword}>확인</button>
      </div>
    </div>
  )
}

export default Password