import TrackPlayer, {
  PlayerCommand,
} from '@rntp/player';

let initialized = false;

export const setupPlayer = () => {
  if (initialized) {
    return;
  }

  TrackPlayer.setupPlayer({
    contentType: 'music',
    handleAudioBecomingNoisy: true,
  });

  TrackPlayer.setCommands({
    capabilities: [
      PlayerCommand.PlayPause,
      PlayerCommand.Next,
      PlayerCommand.Previous,
      PlayerCommand.Seek,
    ],
  });

  initialized = true;
};
