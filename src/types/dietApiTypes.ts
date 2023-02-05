export interface IShortCredentials {
  email: string;
  password: string;
}
export interface IFullCredentials extends IShortCredentials {
  username: string;
}
export interface IRegistrationRes {
  email: string;
  username: string;
  id: string;
}
export interface ItodaySummary {
  date: string;
  kcalLeft: number;
  kcalConsumed: number;
  dailyRate: number;
  percentsOfDailyRate: number;
  userId: string;
  id: string;
}
export interface ICalculatorFormData {
  weight: number | string;
  height: number | string;
  age: number | string;
  bloodType: number | string;
  desiredWeight: number | string;
}

export interface IDailyRateRes {
  dailyRate: string;
  notAllowedProducts: Array<string>;
}
export interface IUserData extends ICalculatorFormData, IDailyRateRes {}

export interface IUserInfo {
  email: string;
  username: string;
  id: string;
  userData: IUserData;
}
export interface ILoginRes {
  accessToken: string;
  refreshToken: string;
  sid: string;
  todaySummary: ItodaySummary;
  user: IUserInfo;
}
export interface IRefreshRes {
  newAccessToken: string;
  newRefreshToken: string;
  sid: string;
}

export interface IEatenProductInfo {
  id: string;
  title: string;
  weight: number;
  kcal: number;
}

export interface IDayInfoRes {
  id?: string;
  date?: string;
  daySummary?: IDaySummary;
  eatenProducts?: Array<IEatenProductInfo>;
  dailyRate?: number;
  kcalConsumed?: number;
  kcalLeft?: number;
  percentsOfDailyRate?: number;
}
export interface IDayInfo {
  _id: string;
  date: string;
  daySummary: IDaySummary;
  eatenProducts: Array<IEatenProductInfo>;
}

export interface IDaySummary {
  date: string;
  kcalLeft: number;
  kcalConsumed: number;
  dailyRate: number;
  percentsOfDailyRate: number;
  userId: string;
  _id: string;
}

export interface IUserInfoRes extends IUserInfo {
  days: Array<IDayInfo>;
}

export interface IProductTitle {
  ru: string;
  ua: string;
}

export interface IProductSearchRes {
  _id: string;
  weight: number;
  calories: number;
  categories: string[];
  title: IProductTitle;
}

export interface IAddProduct {
  date: string;
  productId: string;
  weight: number;
}
export interface IAddProductResponse {
  eatenProduct: IEatenProductInfo;
  day: {
    _id: string;
    date: string;
    daySummary: IDaySummary;
    eatenProducts: Array<IEatenProductInfo>;
  };
  daySummary: {
    date: string;
    kcalLeft: number;
    kcalConsumed: number;
    dailyRate: number;
    percentsOfDailyRate: number;
    userId: string;
    _id: string;
  };
}

export interface IDeleteProduct {
  dayId: string;
  eatenProductId: string;
  date: string;
}
