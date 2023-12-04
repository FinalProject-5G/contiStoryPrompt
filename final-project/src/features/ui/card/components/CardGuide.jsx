import React, { useState } from 'react';
import styles from '../styles/CardGuide.module.scss';
import Button from '../../button/Button';
import { Link } from 'react-router-dom';
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import CardGuideCarousel from '../../carousel/components/CardGuideCarousel';

const Cardguide = () => {
  return (
    <section className={styles.cardGuide}>
      <article className={styles.cardGuideBox}>
        <div className={styles.cardGuideBoxLeft}>
          <h1>생성형 AI로 만드는 자동 콘티</h1>
          <p>인물과 스토리만 입력하면 인공지능이 <br></br>스토리보드 이미지를 만들어줍니다</p>
          {sessionStorage.getItem('email') ?
            <Link className={styles.linkGenerate} to='/generate'>{Button('콘티 생성하기')}</Link>
            :
            <Link className={styles.linkGenerate} to='/login'>{Button('콘티 생성하기')}</Link>
          }
        </div>
        <CardGuideCarousel></CardGuideCarousel>

      </article>

    </section >
  )
}

export default Cardguide