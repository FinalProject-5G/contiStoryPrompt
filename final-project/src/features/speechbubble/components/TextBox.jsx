import React, { useState, useEffect } from 'react';
import styles from '../styles/TextBox.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSpeechList } from '../../../store/canvasSlice'
const TextBox = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [position, setPosition] = useState({ x: 800, y: 100 });
  const dispatch = useDispatch();
  const speechList = useSelector((state) => state.canvas_slice);
  useEffect(()=>{
  })
  
  // useEffect(() => {
  //   if (speechList.cntOfBubble > speechList.speechList.length ) {
  //       const additionalPrompts = Array(cur_project.imgNums - promptsList.length).fill(" ");
  //       dispatch(setPrompt([...promptsList, ...additionalPrompts]));
  //   } else if (cur_project.imgNums < promptsList.length) {
  //       const reducedPrompts = promptsList.slice(0, cur_project.imgNums);
  //       dispatch(setPrompt(reducedPrompts));
  //   }
  //   inputRefs.current = inputRefs.current.slice(0, cur_project.imgNums);
  // }, [cur_project.imgNums, dispatch, promptsList]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffsetX(e.clientX - position.x);
    setOffsetY(e.clientY - position.y);
  };


  const handleMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      setPosition({
        x: e.clientX - offsetX,
        y: e.clientY - offsetY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.speechBox}>
        {
          speechList.speechList.map((item, idx) => {
            return (
              <input className={styles.speechBoxContent}
                onChange={(e) => {
                  const newSpeechEl = e.target.value
                  console.log(newSpeechEl)
                }}
                style={{ top: position.y, left: position.x }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                >
              </input>
              // console.log(item, 'array map called')
            )
          })
        }
      </div>
    </div>
  );
}




export default TextBox