import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import {
  IAddProduct,
  IAddProductResponse,
  ICalculatorFormData,
  IDailyRateRes,
  IDayInfoRes,
  IDeleteProduct,
  IProductSearchRes,
  ItodaySummary,
  IUserInfoRes,
} from '../../types/dietApiTypes';
import { RootState } from '../store/store';

let toastId: any;

export const dietApi = createApi({
  reducerPath: 'dietApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://slimmom-backend.goit.global',
    prepareHeaders: (headers, api) => {
      const state = api.getState() as RootState;
      const accessToken = state.auth.accessToken;
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['userInfo', 'dayInfo'],
  endpoints: builder => {
    return {
      getUserInfo: builder.query<IUserInfoRes, null>({
        query: () => `/user`,
        providesTags: ['userInfo'],
      }),
      searchProduct: builder.query<Array<IProductSearchRes>, string>({
        query: q => {
          return {
            url: '/product',
            method: 'GET',
            params: {
              search: q,
            },
          };
        },

        providesTags: ['userInfo'],
      }),
      getDayInfo: builder.query<IDayInfoRes, string>({
        query: date => {
          return {
            url: '/day/info',
            method: 'POST',
            body: { date },
          };
        },
        providesTags: (_, _2, arg) => [{ type: 'dayInfo', id: arg }],
      }),
      dailyRate: builder.mutation<IDailyRateRes, ICalculatorFormData>({
        query: body => {
          if (!toastId)
            toastId = toast.loading(t('notify.diet.dailyRate') ?? 'Calculating rate for you...');
          return {
            url: '/daily-rate',
            method: 'POST',
            body,
          };
        },
        transformResponse: (response: IDailyRateRes, meta, arg) => {
          if (meta?.response?.status === 200) {
            toast.update(toastId, {
              render: t('notify.diet.dailyRateSuccess') ?? 'Data calculated successfully.',
              type: 'success',
              isLoading: false,
              autoClose: 3000,
            });
            toastId = null;
          }
          return response;
        },
        transformErrorResponse: (response, meta, arg) => {
          toast.update(toastId, {
            render: t('notify.diet.dailyRateError') ?? 'Can not calculate. An error happened...',
            type: 'error',
            isLoading: false,
            autoClose: 3000,
          });
          toastId = null;
          return response.status;
        },
      }),
      userDailyRate: builder.mutation<IDailyRateRes, { id: string; body: ICalculatorFormData }>({
        query: ({ id, body }) => {
          return {
            url: `/daily-rate/${id}`,
            method: 'POST',
            body,
          };
        },
        invalidatesTags: ['userInfo'],
      }),
      addEatenProduct: builder.mutation<IAddProductResponse, IAddProduct>({
        query: ({ date = new Date().toJSON().slice(0, 10), productId, weight }) => {
          if (!toastId)
            toastId = toast.loading(t('notify.diet.addNewProduct') ?? 'Add new product...');
          return {
            url: '/day',
            method: 'POST',
            body: { date, productId, weight },
          };
        },
        transformResponse: (response: IAddProductResponse, meta, arg) => {
          if (meta?.response?.status === 201) {
            toast.update(toastId, {
              render: t('notify.diet.addSuccess') ?? 'New product has been successfully added.',
              type: 'success',
              isLoading: false,
              autoClose: 3000,
            });
            toastId = null;
          }
          return response;
        },
        transformErrorResponse: (response, meta, arg) => {
          toast.update(toastId, {
            render: t('notify.diet.addError') ?? 'Can not add new product. An error happened...',
            type: 'error',
            isLoading: false,
            autoClose: 3000,
          });
          toastId = null;
          return response.status;
        },
        invalidatesTags: (_, _2, { date }) => [{ type: 'dayInfo', id: date }],
      }),
      deleteEatenProduct: builder.mutation<ItodaySummary, IDeleteProduct>({
        query: ({ dayId, eatenProductId }) => {
          if (!toastId) toastId = toast.loading(t('notify.diet.deleting') ?? 'Deleting product...');

          return {
            url: '/day',
            method: 'DELETE',
            body: { dayId, eatenProductId },
          };
        },
        transformResponse: (response: ItodaySummary, meta, arg) => {
          if (meta?.response?.status === 201) {
            toast.update(toastId, {
              render: t('notify.diet.deleteSuccess') ?? 'Product successfully deleted',
              type: 'success',
              isLoading: false,
              autoClose: 3000,
            });
            toastId = null;
          }
          return response;
        },
        transformErrorResponse: (response, meta, arg) => {
          toast.update(toastId, {
            render:
              t('notify.diet.deleteError') ?? 'Can not delete new product. An error happened...',
            type: 'error',
            isLoading: false,
            autoClose: 3000,
          });
          toastId = null;
          return response.status;
        },
        invalidatesTags: (_, _2, { date }) => [{ type: 'dayInfo', id: date }],
      }),
    };
  },
});

export const {
  useGetUserInfoQuery,
  useSearchProductQuery,
  useGetDayInfoQuery,
  useDailyRateMutation,
  useUserDailyRateMutation,
  useAddEatenProductMutation,
  useDeleteEatenProductMutation,
} = dietApi;
