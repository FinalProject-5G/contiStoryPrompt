import { createSlice } from "@reduxjs/toolkit";

const canvasState = createSlice({
    name: 'canvas_slice',

    initialState: {
        allowType: 'touch',
        BubbleIsActivated: false,
        speechList: [],
        cntOfBubble: 0,
    },

    reducers: {
        setBrushState: (state, action) => {
            state.allowType = action.payload;
            // if (state.allowType == 'touch') {
            //   state.allowType = 'all'
            // } else {
            //   state.allowType = 'touch'
            // }
        },
        setBubble: (state, action) => {
            state.BubbleIsActivated = action.payload;
        },
        setSpeechList: (state, action) => {
            state.speechList = action.payload;
        },
        setCntofBubble: (state, action) => {
            state.cntOfBubble = action.payload;
        }
        

    }
})

export const { setBrushState, setBubble, setSpeechList, setCntofBubble } = canvasState.actions;

export default canvasState.reducer;