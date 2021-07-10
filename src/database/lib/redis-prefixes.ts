import type { KeyType } from 'ioredis';

// server side
export const forUser = (userId: KeyType) => `user:${userId}`;

// bot side
export const forTracks = (guildId: KeyType) => `queue:${guildId}`;
export const forNowPlaying = (guildId: KeyType) => `nowplaying:${guildId}`;
