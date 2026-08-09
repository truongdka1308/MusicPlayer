import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {getSongs} from '../services/MusicService';

type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  uri: string;
};

const SongsScreen = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSongs();
  }, []);

  const loadSongs = async () => {
    try {
      setLoading(true);

      const result = await getSongs();

      setSongs(result);
    } catch (error) {
      console.error(error);

      setError('Không thể đọc danh sách nhạc');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#ffffff"
        />

        <Text style={styles.text}>
          Đang quét nhạc...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Songs ({songs.length})
      </Text>

      <FlatList
        data={songs}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.song}>
            <View style={styles.album}>
              <Text style={styles.musicIcon}>
                ♫
              </Text>
            </View>

            <View style={styles.info}>
              <Text
                style={styles.title}
                numberOfLines={1}>
                {item.title || 'Unknown song'}
              </Text>

              <Text
                style={styles.artist}
                numberOfLines={1}>
                {item.artist || 'Unknown artist'}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },

  text: {
    color: '#ffffff',
    marginTop: 10,
  },

  error: {
    color: '#ff5555',
  },

  header: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
  },

  song: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },

  album: {
    width: 55,
    height: 55,
    borderRadius: 6,
    backgroundColor: '#292929',
    justifyContent: 'center',
    alignItems: 'center',
  },

  musicIcon: {
    color: '#aaaaaa',
    fontSize: 25,
  },

  info: {
    flex: 1,
    marginLeft: 15,
  },

  title: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  artist: {
    color: '#888888',
    fontSize: 14,
    marginTop: 4,
  },
});

export default SongsScreen;