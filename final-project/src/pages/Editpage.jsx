import React, { useState, useRef, useEffect } from "react";
import styles from "./Editpage.module.scss";
import HeaderNav from "../features/generate/components/HeaderNav";
import ToggleBtn from "../features/ui/toggleBtn/ToggleBtn";
import BoxItem from "../features/ui/BoxItem/BoxItem";
import PromptBox from "../features/inpainting/components/PromptBox";
import ColorButton from "../features/ui/button/ColorButton/ColorButton";
import OutputImgs from "../features/inpainting/components/OutputImgs";
import { useDispatch, useSelector } from "react-redux";
import { setBrushState } from "../store/canvasSlice";
import axios from "axios";
import Canvas from "../features/inpainting/components/Canvas";
import { setImages } from "../store";
import { setBubble, setCntofBubble } from "../store/canvasSlice";
import InpaintingTutorial from "../features/tutorial/EditTutorial";

const Editpage = () => {
  const dispatch = useDispatch();
  const cur_project = useSelector((state) => state.cur_project);
  const brushState = useSelector((state) => state.canvas_slice);
  const btnRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [gray, setGray] = useState(["#fff", "#fff", "#fff", "#fff"]);

  useEffect(() => {
    dispatch(setBrushState("touch"));
  }, []);


  /** 툴버튼 활성화/비활성화 */
  const activeBtn = (idx) => {
    if (gray[idx] == "#fff") {
      let copy = [...gray];
      copy[idx] = "#A4A4A4";
      setGray(copy);
    } else {
      let copy = [...gray];
      copy[idx] = "#fff";
      setGray(copy);
    }
    if (brushState.BubbleIsActivated == false) {
      dispatch(setBubble(true))
    } else {
      dispatch(setBubble(false))
    }
  };

  /** 인페인팅 */
  const regenerate = async ({ prompt, mask_data, init_data, idx }) => {
    setLoading(true)
    console.log('mask : ', mask_data)
    console.log('image : ', init_data)
    // if (mask_data.length > 0) {
    const result = await axios.post(
      'http://64.98.238.3:41012/inpainting', {
      edited_prompt: prompt[idx],
      mask_data: mask_data,
      image_data: init_data[idx]
    })
    let copy = [...init_data]
    copy[idx] = result.data
    dispatch(setImages(copy))
    // console.log(cur_project)
    setLoading(false)
    // } 
  }
  // 
  return (
    <div className={styles.Wrapper}>
      <InpaintingTutorial />
      <nav className={styles.navBar}>
        <HeaderNav />
      </nav>
      <div className={styles.contentsWrapper}>
        <div>
          <ToggleBtn tab1={"생성"} tab2={"편집"} />
          <section className={styles.designTab}>
            <BoxItem title={"프롬프트"} />
            <PromptBox />
            <BoxItem title={"인페인팅"} />
            <p>설명</p>
            <button
              className={styles.toolBtn}
              ref={(el) => (btnRef.current[0] = el)}
              style={{ backgroundColor: gray[0] }}
              onClick={() => {
                if (brushState.allowType == "touch") {
                  dispatch(setBrushState("all"));
                } else {
                  dispatch(setBrushState("touch"));
                }
                activeBtn(0);
              }}
            >
              <img src={"/images/Pencil.svg"} value="tool"></img>
            </button>
            <BoxItem title={"텍스트"} />
            <div className={styles.textBtnBox}>
              <button
                className={styles.toolBtn}
                style={{ backgroundColor: gray[1] }}
                ref={(el) => (btnRef.current[1] = el)}
                onClick={() => {
                  return (
                    activeBtn(1)
                  );
                }}
              >
                <img src={"/images/bubble.svg"}></img>
              </button>
              <button
                className={styles.toolBtn}
                style={{ backgroundColor: gray[2] }}
                ref={(el) => (btnRef.current[2] = el)}
                onClick={() => {
                  activeBtn(2);
                }}
              >
                <img src={"/images/Effect_bubble.svg"}></img>
              </button>
              {
                brushState.BubbleIsActivated
                  ?
                  <button
                    className={styles.toolBtn}
                    onClick={console.log('yaho')}
                  >

                    <img src={"/images/plus_gray.png"}></img>
                  </button>
                  : null
              }
            </div>
            <ColorButton
              text={"재생성"}
              func={regenerate}
              parameter={{
                prompt: cur_project.prompts,
                mask_data: cur_project.mask,
                init_data: cur_project.images,
                idx: cur_project.curIdx,
              }}
              generate={loading}
            />
          </section>
        </div>
        <section className={styles.canvas}>
          {loading ? (
            <div className={styles.loading_bar}>
              <img style={{ transform: 'translateY(150px)', width: '200px', height: '200px' }} src='/images/consoupLoadingLogo.gif'></img>
            </div>
          ) :
            // cur_project.images.length != 0 ? 
            (
              <div>
                <Canvas />
              </div>
            )
            //  : null
          }

        </section>
        <section className={styles.designTab}>
          <OutputImgs />
        </section>
      </div>
    </div>
  );
};

export default Editpage;
