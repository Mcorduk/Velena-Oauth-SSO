import Redis, { Redis as RedisClientType } from 'ioredis';
import { config } from '../config';

class RedisService {
  private _client?: RedisClientType;

  constructor(private url: string, private host?: string, private port?: number, private password?: string) {}

  public async connect() {
    this._client = new Redis(this.url);

    this._client.on('connect', () => {
      console.log('Redis Client Connected');
    });

    this._client.on('error', (err: Error) => {
      console.log('Redis Client Error ', err);
    });

    // No need to explicitly connect with ioredis
    // Connection is established when creating the Redis instance

    // You can also await for the connection by listening to the 'ready' event
    await new Promise<void>((resolve) => {
      this._client!.once('ready', () => {
        resolve();
      });
    });
  }

  public get client(): RedisClientType {
    if (!this._client) {
      throw new Error('Client is not initialized');
    }
    return this._client;
  }
}

export const redisService = new RedisService(config.REDIS_URL);
