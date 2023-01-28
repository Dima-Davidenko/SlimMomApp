const bloodTypes = [1, 2, 3, 4] as const;

export interface IUserData {
  age: number;
  height: number;
  weight: number;
  desiredWeight: number;
  bloodType: typeof bloodTypes[number];
}
