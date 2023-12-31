import React, { useState } from 'react'
import styles from './styles/Tutorial.module.scss'
import TutorialBtn from './components/TutorialBtn'

const tutContents = [
    {
        title: '생성 / 편집',
        text: '생성화면 / 편집화면으로 전환할 수 있습니다.',
        position: { left: '20%', top: '5%' },
        linePosition: 'leftTop'
    },
    {
        title: '컷수 지정',
        text: '제작할 콘티의 컷수를 지정합니다. 최소 1컷~ 최대 20컷까지 가능합니다. 직접 입력도 가능합니다.',
        position: { left: '20%', top: '13%' },
        linePosition: 'leftTop'
    },
    {
        title: '콘티 내용 입력',
        text: '지정한 컷 수만큼 입력 창이 생성됩니다. 입력창 1칸은 1컷에 해당됩니다. 칸에 알맞게  콘티 내용을 넣어줍니다.',
        position: { left: '20%', top: '30%' },
        linePosition: 'leftTop'
    },
    {
        title: '생성하기',
        text: '생성 하기 버튼을 누릅니다. 생성이 완료되면, 해당 버튼이 초기화 버튼으로 바뀌게 됩니다.결과가 마음에 들지 않을 경우 전체 내용을 초기화 할 수 있습니다.',
        position: { left: '20%', top: '46%' },
        linePosition: 'leftBottom'
    },
    {
        title: '저장 / 공유하기',
        text: '생성 하기 버튼을 누릅니다. 생성이 완료되면, 해당 버튼이 초기화 버튼으로 바뀌게 됩니다.결과가 마음에 들지 않을 경우 전체 내용을 초기화 할 수 있습니다.',
        position: { left: '60%', top: '0.5%' },
        linePosition: 'rightTop'
    }
]

const GenerateTutorial = () => {
    const [index, setIndex] = useState(0);
    const [display, setDisplay] = useState(false);
    // console.log(index, tutContents.length)

    return (
        <>
            {/* 튜토리얼 온오프 토글 버튼 */}
            <button
                className={styles.tutToggleBtn}
                onClick={() => {
                    setDisplay(!display)
                    setIndex(0)
                }
                }>?</button>
            <div className={styles.tutText}>사용방법</div>
            {/* <button>◀</button>
            <button>▶</button> */}

            {display && ( //display가 true일 때만 tutorialWrapper를 렌더
                <div className={styles.tutorialWrapper}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    style={{ position: 'absolute' }} >
                    <div style={{ position: 'absolute', left: tutContents[index].position.left, top: tutContents[index].position.top, width: '300px', height: '200px' }}
                        onClick={() => {
                            if (index < tutContents.length - 1) {
                                setIndex(index + 1)
                            } else {
                                setIndex(0)
                                setDisplay(false)

                            }
                        }}>
                        <TutorialBtn
                            index={index}
                            title={tutContents[index].title}
                            text={tutContents[index].text}
                            position={tutContents[index].position}
                            linePosition={tutContents[index].linePosition}
                        />
                    </div>
                </div>
            )
            }
        </>
    )
}

export default GenerateTutorial