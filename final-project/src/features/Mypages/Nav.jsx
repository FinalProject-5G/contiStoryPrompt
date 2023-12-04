import React, { useState, useEffect } from 'react'
import styles from "./Nav.module.css"
import { Link, NavLink } from 'react-router-dom'
import FileUpload from "../FileUpload/FileUpload";

const Nav = () => {
  const [modal, setModal] = useState(false);
  const [location, setLocation] = useState(sessionStorage.getItem('location'));
  const navLists = [' 내정보 수정', ' 마이 콘티']

  useEffect(() => {
    if (!location) {
      sessionStorage.setItem('location', 'images/defaultImage.png');
    }
    setLocation(sessionStorage.getItem('location'))
  }, [setLocation]);

  return (
    <nav className={styles.navBox}>

      <div onClick={() => setModal(true)} className={styles.userImg} style={{
        backgroundImage: `url(${location})`,
        backgroundSize: 'cover',
      }}>
        <img className={styles.modifyBtn} src="images/Vector1.png" />
      </div>

      <h5>
        {sessionStorage.getItem('nickname')}님
      </h5>
      <div className={styles.navList}>

        <NavLink
          to='/mypassword'
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? `${styles.active}` : ""
          }
        >
          <img style={{ width: '22px' }} src={'images/icon1.png'} alt="myInfo icon" />
          {navLists[0]}
        </NavLink>

        <NavLink
          to='/myconti'
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? `${styles.active}` : ""
          }
        >
          <img style={{ width: '22px' }} src={'images/icon2.png'} alt="myConti icon" /> {navLists[1]}
        </NavLink>

      </div >
      {modal && <FileUpload setModal={setModal} location={location} setLocation={setLocation}></FileUpload>}
    </nav >
  )
}

export default Nav