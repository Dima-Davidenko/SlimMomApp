import { RootState } from '../store/store';

export const selectCurrentDate = (s: RootState) => s.date.currentDate;
export const selectCurrentDateId = (s: RootState) => s.date.currentDateId;
