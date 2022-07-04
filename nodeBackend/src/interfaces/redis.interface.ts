export interface IRedisFunctions {
    getAsync?: (arg1: string) => Promise<string | null>;
    setAsync?: (arg1: string, arg2: string) => Promise<unknown>;
    delAsync?: (arg1: string) => Promise<number>;
    expireAsync?: (arg1: string, arg2: number) => Promise<unknown>;
}