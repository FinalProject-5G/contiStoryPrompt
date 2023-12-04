import React, { useEffect, useState } from 'react'
import styles from './Conti.module.scss'
import { Card, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../../axios';



function Conti() {

  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState('');
  const [originalContiTitle, setOriginalContiTitle] = useState([]);
  const [filterContiTitle, setFilterContiTitle] = useState([]);

  const getContiData = () => {
    axios.post('/conti/contilist', { email: sessionStorage.getItem('email') })
      .then((res) => { console.log(res.data); return (setOriginalContiTitle(res.data), setFilterContiTitle(res.data)) })
      .catch(function (error) {
        console.log(error.toJSON());
      });
  }

  useEffect(() => { getContiData() }, [])

  const searchConti = () => {
    let copy = originalContiTitle.filter((x) => x.project_title.includes(sortOrder))
    setFilterContiTitle(copy)
  }
  const sortCreatedAt = () => {
    let copy = filterContiTitle.sort((x) => x.created_at)
    setFilterContiTitle(copy)
  }
  const sortContiTitle = () => {
    let copy = filterContiTitle.sort((x) => x.project_title)
    setFilterContiTitle(copy)
  }
  const ContiList = () => {

    return (

      filterContiTitle.map((data, idx) => (
        <div key={data.id} className={styles.contiListBox}>
          <Card>
            <img className={styles.contiViewImg} variant="top" src={data.img_path} />
            <div className={styles.selectBtn}>
              <button

                className={styles.exportBtn}>
                <img src="images/Vector.png" alt="" />
              </button>
              <button className={styles.modifyBtn}>
                <img src="images/Vector1.png" alt="" />
              </button>
            </div>
          </Card>
          <h5>{data.project_title}</h5>
          <p>{data.created_at.substring(0, 10) + " " + data.created_at.substring(11, 16)}</p>
        </div>
      ))

    )
  }
  console.log(sortOrder)

  return (
    <div>
      <div className={styles.section}>

        <h4>마이콘티</h4>
        <div className={styles.search}>
          <input placeholder='콘티 제목을 검색' onChange={(e) => setSortOrder(e.target.value)}></input>
          <div>|</div>
          <button className={styles.searchBtn} variant="outline-dark" onClick={searchConti}>검색</button>
          <div>|</div>
          <ButtonGroup style={{ fontSize: '0.4rem' }} className={styles.btnGroup}>
            <DropdownButton className={styles.dropBtn} as={ButtonGroup} title="정렬" id="bg-nested-dropdown" variant="outline-secondary">
              <Dropdown.Item eventKey="1" onClick={sortContiTitle}>제목순</Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={sortCreatedAt}>만든날짜순</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </div>

        <div className={styles.contiBox}>

          <ContiList></ContiList>

          <div onClick={() => navigate('/generate')} className={styles.contiListBox}>
            <Card className={styles.contiViewImg} variant="top">
              <img className={styles.contiImgAdd} src="/images/plus.png"></img>
              <div>새 콘티 드로잉</div>
            </Card>
          </div>

        </div>
      </div>
    </div >
  );
}

export default Conti;