import { Injectable, NotFoundException } from '@nestjs/common';
import _ from 'lodash';
import { RedisService } from 'nestjs-redis';
import { v4 } from 'uuid';
import ytdl from 'ytdl-core';
import { forNowPlaying, forTracks } from '../database/lib/redis-prefixes';
import type { AddTrackInput } from './dto/addTrack.dto';
import { RemoveTrackInput } from './dto/removeTrack.dto';
import type { Track } from './entities/track.entity';
import { secToString } from './lib/youtube';

@Injectable()
export class MusicService {
  constructor(private readonly redisService: RedisService) {}

  redis = this.redisService.getClient('bot');

  async getTracks(guildId: string) {
    const _tracks = await this.redis.lrange(forTracks(guildId), 0, -1);
    const tracks = _tracks.map((_track) => ({ ...JSON.parse(_track) }));
    // should be a Track object
    return tracks;
  }

  async addTrack(input: AddTrackInput): Promise<Track> {
    const { guildId, youtubeUrl } = input;
    let res: ytdl.videoInfo;
    try {
      res = await ytdl.getBasicInfo(youtubeUrl);
    } catch {
      throw new NotFoundException();
    }
    const { videoDetails } = res;
    if (!videoDetails) {
      // probably don't need this but let's guard anyway
      throw new NotFoundException();
    }
    const track = {
      id: v4(),
      title: videoDetails.title,
      duration: secToString(parseInt(videoDetails.lengthSeconds, 10)),
      url: videoDetails.video_url,
      thumbnailURL: videoDetails.thumbnails[0].url,
    };
    this.redis.rpush(forTracks(guildId), JSON.stringify(track));
    return track;
  }

  async removeTrack(input: RemoveTrackInput): Promise<number> {
    const { track, guildId } = input;
    // TODO: switch to a sorted set coz this really sucks
    return this.redis.lrem(forTracks(guildId), 1, JSON.stringify(track));
  }

  async shuffle(guildId: string): Promise<Track[]> {
    const key = forTracks(guildId);
    const _tracks = await this.redis.lrange(key, 0, -1);
    const shuffled = _.shuffle(_tracks);
    this.redis
      .pipeline()
      .del(key)
      .lpush(key, ...shuffled)
      .exec();
    // I should try making an ORM for redis
    // sounds like a decent project
    return shuffled.map((track) => JSON.parse(track));
  }

  async getNowPlaying(guildId: string) {
    const _track = await this.redis.get(forNowPlaying(guildId));
    return JSON.parse(_track);
  }
}
