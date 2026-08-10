import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import { playSong,  setPlaylist } from '../services/PlayerService';
import {
  PERMISSIONS,
  RESULTS,
  request,
} from 'react-native-permissions';

import { getSongs } from '../services/MusicService';
import { Song } from '../types/Song';
import { useNavigation } from '@react-navigation/native';
const SongsScreen = () => {
  const navigation = useNavigation();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadSongs();
  }, []);

  const requestMusicPermission = async () => {
    if (Platform.OS !== 'android') {
      return true;
    }

    const permission =
      Platform.Version >= 33
        ? PERMISSIONS.ANDROID.READ_MEDIA_AUDIO
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

    const result = await request(permission);

    console.log('Music permission:', result);

    return result === RESULTS.GRANTED;
  };

  const loadSongs = async () => {
    try {
      setLoading(true);
      setError('');

      const hasPermission =
        await requestMusicPermission();

      if (!hasPermission) {
        setError(
          'Ứng dụng chưa được cấp quyền đọc nhạc.',
        );
        return;
      }

      const result = await getSongs();

      console.log('SONGS:', result);

      setSongs(result);
      setPlaylist(result);
    } catch (error) {
      console.error(
        'LOAD SONG ERROR:',
        error,
      );

      setError(
        'Không thể đọc danh sách nhạc.',
      );
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
        renderItem={({ item,index }) => (
          <TouchableOpacity
            style={styles.song}
            onPress={async () => {
              await playSong(item,index);

              navigation.navigate('Player' as never);
            }}
          >
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
          </TouchableOpacity>

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
    padding: 20,
  },

  text: {
    color: '#ffffff',
    marginTop: 10,
  },

  error: {
    color: '#ff5555',
    textAlign: 'center',
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