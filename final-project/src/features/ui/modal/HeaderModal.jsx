import React from 'react'
import styles from './HeaderModal.module.scss'
import { useNavigate, Link } from 'react-router-dom'
import axios from '../../../axios'

const HeaderModal = ({ isOpen, isClose }) => {
  const navigate = useNavigate()

  if (!isOpen) { return null }

  const logOut = () => {
    sessionStorage.clear()
    axios.post('/userLogin/logout').then(res => (console.log('로그아웃완료')))
    isClose()
    navigate('/')
  }

  return (
    <>

      <section className={styles.headerModalBox}>
        <div className={styles.headerModalTop} >
          <button className={styles.headerModalClose} onClick={isClose}> X </button>
        </div>
        <div className={styles.headerModalMiddle}>
          <div className={styles.profile} style={{
            backgroundImage: `url(${sessionStorage.getItem("location")})`,
            backgroundSize: 'cover',
          }}>
          </div>
          <p>{sessionStorage.getItem('nickname')}님</p>
          <hr style={{ width: '100%', border: 'solid 1px #DBDBDB', margin: '5px' }} />
          <Link to='/myconti' onClick={isClose}>마이콘티</Link>
          <Link to='/mypassword' onClick={isClose}>내정보 수정</Link>
          <hr style={{ width: '100%', border: 'solid 1px #DBDBDB', margin: '5px' }} />
          <p>ContiStoryPrompt</p>
          <button className={styles.headerLogOutBtn} onClick={() => logOut()}>로그아웃 <img src='/images/export_icon.svg' /></button>
        </div>
      </section>
    </>

  )
}

export default HeaderModal