import React, { useRef, useEffect, useState } from 'react'
import { ReactSketchCanvas } from 'react-sketch-canvas'
import styles from '../styles/Canvas.module.scss'
import { useSelector, useDispatch } from 'react-redux';
import { setMask } from '../../../store';
import {fabric} from 'fabric'
const style = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
};

const Canvas = ({speech,setSpeech}) => {
    const brushState = useSelector((state) => state.canvas_slice);
    const cur_project = useSelector((state) => state.cur_project);
    const dispatch = useDispatch();
    const curIdx = cur_project.curIdx
    const canvasRef = useRef();
    const img = cur_project.images[curIdx]
    const onChange = async () => {
        const paths = await canvasRef.current.exportPaths();
        if (paths.length) {
            const data = await canvasRef.current.exportImage("png");
            const temp = data.split(",");
            const splited_data = temp[1]
            dispatch(setMask(splited_data))
        }
    };
    //  아래의 해당 로직 대신 이미지가 재생성되면 리덕스에 저장된 해당 이미지와 프롬프트 값 바꾸는 것으로 변경하기

    
    // const predictions = props.predictions.map((prediction) => {
    //     prediction.lastImage = prediction.output
    //     ? prediction.output[prediction.output.length - 1]
    //     : null;
    //     return prediction;
    // });                                                                                                                                                          

    // const predicting = predictions.some((prediction) => !prediction.output);
    // const lastPrediction = predictions[predictions.length - 1];
 
  

    return (
        <div className={styles.canvasWrapper} >
            {
                cur_project.images ?
                <img
                className={styles.predictImg}
                alt={"prediction" + curIdx}
                key={"prediction" + curIdx}
                layout="fill"
                style={{ zIndex: curIdx }}
                src={`data:image/png;base64,${img}`}
                />
                : null  
            }
            <div style={{zIndex: curIdx + 10}}
                 className={styles.canvasBox}
            >
                <ReactSketchCanvas
                    
                    className={styles.sketchCanvas}
                    onChange={onChange}
                    ref={canvasRef}
                    style={style}
                    width="500px"
                    height="500px"
                    strokeWidth={30}
                    strokeColor="black"
                    canvasColor="transparent"
                    exportWithBackgroundImage="true"
                    allowOnlyPointerType={brushState.allowType}
                />
            </div>
        </div>
    )
}

export default Canvas   