import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { t } from 'i18next';

/**
 * Log a warning and show a toast!
 */
const toastId = 'middleware-toast';
export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => next => action => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejectedWithValue(action)) {
    const msg = action?.payload?.data?.message;
    console.log(action);
    if (msg) {
      switch (msg) {
        case 'No allowed products found for this query':
          toast.warn(t('notify.diet.noProducts') ?? 'No allowed products found for this query', {
            toastId: toastId,
          });
          break;
        case 'Unauthorized':
          toast.warn('You are not authorized. Please reload the page.', {
            toastId: toastId,
          });
          break;
      }
    } else if (action?.payload?.status === 'FETCH_ERROR') {
      toast.warn(t('notify.other.networkError') ?? 'Network Error has occurred! Try again.', {
        toastId: toastId,
      });
    }
  }

  return next(action);
};
