import { RootState } from '../store/store';

export const selectproductList = (s: RootState) => s.currentDayProducts.productList;
