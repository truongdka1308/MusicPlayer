import {NativeModules} from 'react-native';

import {Song} from '../types/Song';

type MusicModuleType = {
  getSongs(): Promise<Song[]>;
};

const {MusicModule} = NativeModules as {
  MusicModule: MusicModuleType;
};

export default MusicModule;