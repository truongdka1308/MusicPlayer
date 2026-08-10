import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Slider from '@react-native-community/slider';

import TrackPlayer, {
  useProgress,
  useIsPlaying,
} from '@rntp/player';

import {Song} from '../types/Song';
import {
  getCurrentSong,
  pauseSong,
  resumeSong,
} from '../services/PlayerService';

const PlayerScreen = () => {
  const [song, setSong] = useState<Song | null>(null);

  const progress = useProgress();
  const isPlaying = useIsPlaying();

  useEffect(() => {
    const currentSong = getCurrentSong();

    if (currentSong) {
      setSong(currentSong);
    }
  }, []);

  const togglePlay = async () => {
  if (isPlaying) {
    await pauseSong();
  } else {
    await resumeSong();
  }
};

  const seekTo = async (value: number) => {
    await TrackPlayer.seekTo(value);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  if (!song) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>
          Chưa có bài hát
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Album */}
      <View style={styles.album}>
        <Text style={styles.musicIcon}>
          ♫
        </Text>
      </View>

      {/* Song information */}
      <Text
        style={styles.title}
        numberOfLines={1}>
        {song.title}
      </Text>

      <Text
        style={styles.artist}
        numberOfLines={1}>
        {song.artist || 'Unknown artist'}
      </Text>

      {/* Progress */}
      <View style={styles.progressContainer}>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={progress.duration || 1}
          value={progress.position}
          minimumTrackTintColor="#ffffff"
          maximumTrackTintColor="#555555"
          thumbTintColor="#ffffff"
          onSlidingComplete={seekTo}
        />

        <View style={styles.timeRow}>
          <Text style={styles.time}>
            {formatTime(progress.position)}
          </Text>

          <Text style={styles.time}>
            {formatTime(progress.duration)}
          </Text>
        </View>

      </View>

      {/* Controls */}
      <View style={styles.controls}>

        <TouchableOpacity>
          <Text style={styles.control}>
            ⏮
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playButton}
          onPress={togglePlay}>

          <Text style={styles.playIcon}>
           {isPlaying ? 'Ⅱ' : '▶'}
          </Text>

        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.control}>
            ⏭
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 25,
    justifyContent: 'center',
  },

  center: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#ffffff',
    fontSize: 18,
  },

  album: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#292929',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },

  musicIcon: {
    color: '#888888',
    fontSize: 100,
  },

  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },

  artist: {
    color: '#888888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },

  progressContainer: {
    marginTop: 30,
  },

  slider: {
    width: '100%',
    height: 40,
  },

  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  time: {
    color: '#888888',
    fontSize: 12,
  },

  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 35,
    gap: 40,
  },

  control: {
    color: '#ffffff',
    fontSize: 30,
  },

  playButton: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  playIcon: {
    color: '#121212',
    fontSize: 25,
  },
});

export default PlayerScreen;