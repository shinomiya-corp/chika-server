import type { KeyType } from 'ioredis';

export const forUser = (key: KeyType) => `user:${key}`;
