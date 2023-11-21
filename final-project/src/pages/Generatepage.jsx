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
        `http://154.20.254.95:50095/?prompt==${prompt[i]},%20pencil%20style,%20cartoon,%20fast%20sketch,%20rough%20sketch,%20croquis`
      );
      newImages = [...newImages, result.data];
    }
    dispatch(setImages(newImages));
    setLoading(false)
  };
  console.log(image)

  useEffect(()=>{
    dispatch(setBrushState('touch'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div className={styles.Wrapper}>
      <nav className={styles.navBar}>
        <HeaderNav />
      </nav>
      <div className={styles.contentsWrapper}>
        <section className={styles.designTab}>
          <ToggleBtn tab1={"생성"} tab2={"편집"} />
          <BoxItem title={"생성할 컷 수 지정"} />
          <CutsNumber />
          <BoxItem title={"콘티 내용 입력"} />
          <div className={styles.promptsBox}>
            <Prompts />
          </div>
          <ColorButton style={{ backgroundColor: 'gray' }} text={"생성하기"} func={generate} parameter={{ prompt: promptsList, promptLen: promptsNum }} generate={loading} />
        </section>
        <section className={styles.canvas}>
          {loading ?
            <div className={styles.loading_bar}>
              <BarLoader color="#36d7b7" loading={loading} width={200} height={20} />
            </div>
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
  );
}

export default Generatepage
