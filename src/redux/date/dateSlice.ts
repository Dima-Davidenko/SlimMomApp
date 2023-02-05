import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentDate: '',
  currentDateId: '',
};

interface IAction {
  type: string;
  payload: string;
}

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    updateCurrentDay: (state, action: IAction) => {
      state.currentDate = action.payload;
    },
    updateCurrentDayId: (state, action: IAction) => {
      state.currentDateId = action.payload;
    },
  },
});

export const dateReducer = dateSlice.reducer;
export const { updateCurrentDay, updateCurrentDayId } = dateSlice.actions;
