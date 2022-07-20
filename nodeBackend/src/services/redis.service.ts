import redis, { RedisClient } from 'redis';
import bluebird from 'bluebird';
import redismock from 'redis-mock';
import { promisify } from 'util';
import { IRedisFunctions } from '../interfaces/redis.interface';

class RedisService {
    private static instance: RedisService;
    private redisClient: RedisClient & IRedisFunctions;
    private connected = false;

    constructor(url = 'mock', port = 6379, password?: string) {
        this.redisClient = url === 'mock' ? redismock.createClient() : redis.createClient(port, url, { password });

        this.initialize();
    }

    static getInstance = (url?: string, port?: number, password?: string) : RedisService => {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService(url, port, password);
        }
        return RedisService.instance;
    };

    initialize = () : void => {
        const getAsync = promisify(this.redisClient.get).bind(this.redisClient);
        const setAsync = promisify(this.redisClient.set).bind(this.redisClient);
        const delAsync = promisify(this.redisClient.del).bind(this.redisClient);
        const expireAsync = promisify(this.redisClient.expire).bind(this.redisClient);
        this.redisClient.getAsync = getAsync;
        this.redisClient.setAsync = setAsync;
        this.redisClient.delAsync = delAsync;
        this.redisClient.expireAsync = expireAsync;

        bluebird.promisifyAll(redis.RedisClient.prototype);
        bluebird.promisifyAll(redis.Multi.prototype);

        this.redisClient.on('connect', async () => {
            this.connected = true
            console.log("Redis connected");
        });

        this.redisClient.on('error', async (error) => {
            console.log(error);
        })
    };

    private setKey = async (key: string, value: any) => {
        await this.redisClient.setAsync!(key, JSON.stringify(value));
    };

    private getKey = async (key: string) => {
        const result = await this.redisClient.getAsync!(key);
        return result as string;
    };

    private setKeyTime = async (key: string, value: string, seconds: number) => {
        const result = await this.redisClient.setAsync!(key, value);
        await this.redisClient.expireAsync!(key, seconds);
        return result;
    }

    private deleteKey = async (key: string) => {
        const deletedKeys = await this.redisClient.delAsync!(key);
        return deletedKeys > 0;
    }

    setExpireKeyToRedis = async (key: string, value: string, seconds: number): Promise<any> => await this.setKeyTime(key, value, seconds);

    getFromRedis = async (key: string): Promise<any> => await this.getKey(key);

    setToRedis = async (key: string, value: any): Promise<void> => await this.setKey(key, value);

    delFromRedis = async (key: string) => await this.deleteKey(key);

    isConnected = async (): Promise<boolean> => {
        return this.redisClient.ping();
    };
}

export default RedisService;