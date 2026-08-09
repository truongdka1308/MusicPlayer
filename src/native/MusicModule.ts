import {NativeModules} from 'react-native';

export type NativeSong = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  uri: string;
};

type MusicModuleType = {
  getSongs(): Promise<NativeSong[]>;
};

const {MusicModule} = NativeModules as {
  MusicModule: MusicModuleType;
};

export default MusicModule;