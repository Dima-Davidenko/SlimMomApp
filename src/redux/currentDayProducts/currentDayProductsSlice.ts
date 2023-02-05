import { createSlice } from '@reduxjs/toolkit';
import { IEatenProductInfo } from '../../types/dietApiTypes';

const productList: IEatenProductInfo[] | [] = [];
const initialState = {
  productList,
};

interface IActionUpdate {
  type: string;
  payload: IEatenProductInfo[] | [];
}
interface IActionAdd {
  type: string;
  payload: IEatenProductInfo;
}
interface IActionDelete {
  type: string;
  payload: string;
}

export const currentDayProductsSlice = createSlice({
  name: 'currentDayProducts',
  initialState,
  reducers: {
    updateCurrentDayProductList: (state, action: IActionUpdate) => {
      state.productList = action.payload;
    },
    addProductCurrentDayList: (state, action: IActionAdd) => {
      state.productList = [...state.productList, action.payload];
    },
    deleteProductCurrentDayList: (state, action: IActionDelete) => {
      state.productList = state.productList.filter(product => product.id !== action.payload);
    },
  },
});

export const currentDayProductsReducer = currentDayProductsSlice.reducer;
export const {
  updateCurrentDayProductList,
  addProductCurrentDayList,
  deleteProductCurrentDayList,
} = currentDayProductsSlice.actions;
