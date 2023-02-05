import { Box } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, formatISO, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../../redux/auth/authSelectors';
import { updateCurrentDayProductList } from '../../../redux/currentDayProducts/currentDayProductsSlice';
import { selectCurrentDate } from '../../../redux/date/dateSelector';
import { updateCurrentDay, updateCurrentDayId } from '../../../redux/date/dateSlice';
import { useGetDayInfoQuery, useGetUserInfoQuery } from '../../../redux/diet/dietApi';
import { useAppDispatch } from '../../../redux/store/store';
import css from './Calendar.module.css';

const Calendar = () => {
  const dispatch = useAppDispatch();

  const currentDate = useSelector(selectCurrentDate);
  const savedDate = currentDate ? parseISO(currentDate) : new Date();
  const [date, setDate] = useState(savedDate);

  const accessToken = useSelector(selectAccessToken);

  const { data: userInfo } = useGetUserInfoQuery(null);
  const userAge = userInfo?.userData?.age;

  const { data: dayInfo } = useGetDayInfoQuery(currentDate, {
    skip: !currentDate || !accessToken || !userAge,
  });

  useEffect(() => {
    dispatch(updateCurrentDayId(dayInfo?.id ?? ''));
  }, [dayInfo, dispatch]);

  useEffect(() => {
    try {
      const formatDate = formatISO(date, { representation: 'date' });
      dispatch(updateCurrentDay(formatDate));
      dispatch(updateCurrentDayProductList([]));
    } catch (error) {}
  }, [date, dispatch]);

  return (
    <div className={css.container}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ marginBottom: '32px', padding: '0px 15px' }}>
          <DesktopDatePicker
            showToolbar
            value={date}
            onChange={newDate => {
              if (newDate) setDate(newDate);
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <input
                  className={css.dateInput}
                  ref={inputRef}
                  {...inputProps}
                  value={format(date, 'dd.MM.Y')}
                />
                {InputProps?.endAdornment}
              </Box>
            )}
          />
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default Calendar;
