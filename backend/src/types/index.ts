export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

// reason: https://stackoverflow.com/questions/77744204/exact-function-return-type-without-additional-properties/77759775#77759775
export type OmitAndProhibit<T, K extends string> = Omit<T, K> & { [P in K]?: never }

export type PartialExcept<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>
