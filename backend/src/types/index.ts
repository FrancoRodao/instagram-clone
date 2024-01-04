export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type OmitAndProhibit<T, K extends string> = Omit<T, K> & { [P in K]?: never };
