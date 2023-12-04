import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import styles from './Generatepage.module.scss'
import HeaderNav from '../features/generate/components/HeaderNav'
import ToggleBtn from '../features/ui/toggleBtn/ToggleBtn'
import CutsNumber from '../features/generate/components/CutsNumber'
import Prompts from '../features/generate/components/Prompts'
import BoxItem from '../features/ui/BoxItem/BoxItem'
import axios from 'axios'
import ColorButton from '../features/ui/button/ColorButton/ColorButton';
import OutputImgs from '../features/inpainting/components/OutputImgs';
import BarLoader from 'react-spinners/BarLoader'
import { setImages } from '../store';
import Canvas from '../features/inpainting/components/Canvas';
import { setBrushState } from '../store/canvasSlice';
import GenerateTutorial from '../features/tutorial/GenerateTutorial'
const Generatepage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const promptsList = useSelector((state) => state.cur_project.prompts);
  const promptsNum = useSelector((state) => state.cur_project.imgNums);
  const image = useSelector((state) => state.cur_project.images);

  const generate = async ({ prompt, promptLen }) => {
    setLoading(true)
    let newImages = []
    for (let i = 0; i < promptLen; i++) {
      const result = await axios.get(
        `http://114.34.116.46:41443/?prompt==${prompt[i]},%20pencilstyle,%20nopencil,%20cartoon,%20fast%20sketch,%20rough%20sketch,%20croquis`
      );
      newImages = [...newImages, result.data];
    }
    dispatch(setImages(newImages));
    setLoading(false)
  };

  useEffect(() => {
    dispatch(setBrushState('touch'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <GenerateTutorial />
      <div className={styles.Wrapper}>
        <nav className={styles.navBar}>
          <HeaderNav />
        </nav>
        <div className={styles.contentsWrapper}>
          <section className={styles.designTab}>
            <ToggleBtn tab1={"드로잉"} tab2={"리터칭"} />
            <BoxItem title={"드로잉 컷 수 지정"} />
            <CutsNumber />
            <BoxItem title={"콘티 내용"} />
            <div className={styles.promptsBox}>
              <Prompts />
            </div>
            <ColorButton text={"드로잉"} func={generate} parameter={{ prompt: promptsList, promptLen: promptsNum }} generate={loading} />
          </section>
          <section className={styles.canvas}>
            {
              loading ?
                <section className={styles.canvasblack}>
                  <div className={styles.loading_bar}>
                    <img style={{ transform: 'translateY(120px)', width: '180px', height: '320px' }} src='/images/consoupLoadingLogo.gif'></img>
                  </div>
                </section>
                : image.length > 0 ?
                  <Canvas />
                  : null
            }
          </section>
          <section className={styles.designTab}>
            <OutputImgs />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Generatepage

