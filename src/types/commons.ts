export enum Status {
    FAIL = 'fail',
    SUCCESS = 'success',
}

export type ProcessResponse<T> = {
    status: Status
    message?: string
    data?: T
}

export type Maybe<T, P> = T | P