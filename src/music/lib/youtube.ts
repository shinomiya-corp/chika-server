export const YOUTUBE_URL_REGEX =
  /^https?:\/\/(youtu\.be\/|(www\.)?youtube.com\/(embed|v|shorts)\/)/;

const padTimeZero = (chunk: number): string =>
  `${chunk <= 9 ? `0${chunk}` : chunk}`;

export const secToString = (sec: number): string => {
  // less than a minute
  if (sec < 60) return `00:${padTimeZero(sec)}`;
  // between a minute and an hour
  if (sec > 60 && sec < 3600)
    return `${padTimeZero(Math.floor(sec / 60))}:${padTimeZero(sec % 60)}`;
  // more than an hour
  const subHour = sec % 3600;
  const ss = subHour % 60;
  const mm = (subHour - ss) / 60;
  const hh = Math.floor(sec / 3600);
  return `${padTimeZero(hh)}:${padTimeZero(mm)}:${padTimeZero(ss)}`;
};
