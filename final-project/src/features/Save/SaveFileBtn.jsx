import React, { useState, useRef } from 'react';
import axios from '../../axios';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import styles from './Save.module.css'

const SaveFileBtn = () => {

    const store = useSelector((state) => state.cur_project)
    // console.log(store, '스토어')

    const createFile = async () => {

        await axios.post('/upload/createFile', {
            store
        })
            .then(res => {
                console.log(res.data);
                // 파일 다운로드 요청
                axios.get(res.data.downloadLink, {
                    responseType: 'blob' // 파일 다운로드를 위해 responseType을 'blob'으로 설정합니다.
                })
                    .then(res => {
                        // 파일 다운로드를 위한 코드
                        const url = window.URL.createObjectURL(new Blob([res.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', store.title + '.corn');
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <button className={styles.btn} onClick={createFile}>
            <img src='/images/export_icon.svg' />
        </button>
    );
}


export default SaveFileBtn;