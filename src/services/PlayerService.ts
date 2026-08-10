import TrackPlayer from '@rntp/player';
import {Song} from '../types/Song';

let currentSong: Song | null = null;

export const playSong = async (song: Song) => {
  currentSong = song;

  await TrackPlayer.setMediaItem({
    mediaId: song.id,
    url: song.uri,
    title: song.title,
    artist: song.artist,
    albumTitle: song.album,
    duration: song.duration / 1000,
  });

  await TrackPlayer.play();
};

export const getCurrentSong = () => {
  return currentSong;
};

export const pauseSong = async () => {
  await TrackPlayer.pause();
};

export const resumeSong = async () => {
  await TrackPlayer.play();
};

export const stopSong = async () => {
  await TrackPlayer.stop();
};