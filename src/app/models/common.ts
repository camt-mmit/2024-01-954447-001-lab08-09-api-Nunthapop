export type OverrideProperties<T, PR> = {
  [key in keyof T]: PR;
};

export type RequiredProperties<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: T[P];
};
