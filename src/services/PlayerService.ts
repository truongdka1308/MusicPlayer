import TrackPlayer from '@rntp/player';
import { Song } from '../types/Song';

type SongListener = (song: Song | null) => void;

const listeners: SongListener[] = [];

let songs: Song[] = [];
let currentIndex = -1;

const notifySongChanged = () => {
  const song = getCurrentSong();

  listeners.forEach(listener => {
    listener(song);
  });
};

export const subscribeToSong = (
  listener: SongListener,
) => {
  listeners.push(listener);

  return () => {
    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }
  };
};

export const setPlaylist = (playlist: Song[]) => {
  songs = playlist;
};

export const playSong = async (
  song: Song,
  index?: number,
) => {
  if (index !== undefined) {
    currentIndex = index;
  } else {
    currentIndex = songs.findIndex(
      item => item.id === song.id,
    );
  }

  await TrackPlayer.setMediaItem({
    mediaId: song.id,
    url: song.uri,
    title: song.title,
    artist: song.artist,
    albumTitle: song.album,
    duration: song.duration / 1000,
  });
  notifySongChanged();
  await TrackPlayer.play();
};

export const getCurrentSong = () => {
  if (
    currentIndex < 0 ||
    currentIndex >= songs.length
  ) {
    return null;
  }

  return songs[currentIndex];
};

export const getCurrentIndex = () => {
  return currentIndex;
};

export const playNext = async () => {
  if (songs.length === 0) {
    return;
  }

  if (currentIndex >= songs.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }

  await playSong(
    songs[currentIndex],
    currentIndex,
  );
};

export const playPrevious = async () => {
  if (songs.length === 0) {
    return;
  }

  if (currentIndex <= 0) {
    currentIndex = songs.length - 1;
  } else {
    currentIndex--;
  }

  await playSong(
    songs[currentIndex],
    currentIndex,
  );
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