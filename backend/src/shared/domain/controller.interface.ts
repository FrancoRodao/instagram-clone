export interface IControllerResponse{
    ok: boolean,
    msg: string,
    [key: string]: unknown
}

export interface IController{
    execute(...args: any): Promise<IControllerResponse> | IControllerResponse
}
