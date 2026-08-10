import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  useIsPlaying,
} from '@rntp/player';

import {Song} from '../types/Song';

import {
  getCurrentSong,
  subscribeToSong,
  pauseSong,
  resumeSong,
} from '../services/PlayerService';

type Props = {
  onPress: () => void;
};

const MiniPlayer = ({onPress}: Props) => {
  const [song, setSong] = useState<Song | null>(
    getCurrentSong(),
  );

  const isPlaying = useIsPlaying();

  useEffect(() => {
    const unsubscribe = subscribeToSong(
      updatedSong => {
        setSong(updatedSong);
      },
    );

    return unsubscribe;
  }, []);

  if (!song) {
    return null;
  }

  const togglePlay = async () => {
    if (isPlaying) {
      await pauseSong();
    } else {
      await resumeSong();
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}>

      <View style={styles.album}>
        <Text style={styles.musicIcon}>
          ♫
        </Text>
      </View>

      <View style={styles.info}>
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
      </View>

      <TouchableOpacity
        style={styles.playButton}
        onPress={togglePlay}>

        <Text style={styles.playIcon}>
          {isPlaying ? 'Ⅱ' : '▶'}
        </Text>

      </TouchableOpacity>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#242424',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },

  album: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#383838',
    justifyContent: 'center',
    alignItems: 'center',
  },

  musicIcon: {
    color: '#aaaaaa',
    fontSize: 24,
  },

  info: {
    flex: 1,
    marginLeft: 12,
  },

  title: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },

  artist: {
    color: '#888888',
    fontSize: 13,
    marginTop: 3,
  },

  playButton: {
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },

  playIcon: {
    color: '#ffffff',
    fontSize: 20,
  },
});

export default MiniPlayer;