import MusicModule, {
  NativeSong,
} from '../native/MusicModule';

export const getSongs = async (): Promise<NativeSong[]> => {
  try {
    const songs = await MusicModule.getSongs();

    console.log('Songs from MediaStore:', songs);

    return songs;
  } catch (error) {
    console.error('Failed to get songs:', error);

    throw error;
  }
};