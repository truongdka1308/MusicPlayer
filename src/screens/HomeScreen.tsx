import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good evening</Text>

          <Text style={styles.title}>
            What do you want to listen to?
          </Text>
        </View>

        {/* Search */}
        <TextInput
          style={styles.search}
          placeholder="Search songs..."
          placeholderTextColor="#888"
        />

        {/* Recently Played */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Recently played
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}>

            <TouchableOpacity style={styles.recentItem}>
              <View style={styles.albumPlaceholder}>
                <Text style={styles.musicIcon}>♫</Text>
              </View>

              <Text style={styles.songTitle}>
                No songs yet
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.recentItem}>
              <View style={styles.albumPlaceholder}>
                <Text style={styles.musicIcon}>♫</Text>
              </View>

              <Text style={styles.songTitle}>
                No songs yet
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.recentItem}>
              <View style={styles.albumPlaceholder}>
                <Text style={styles.musicIcon}>♫</Text>
              </View>

              <Text style={styles.songTitle}>
                No songs yet
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </View>

        {/* Your Music */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Your music
          </Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Text>♫</Text>
            </View>

            <View>
              <Text style={styles.menuTitle}>
                All songs
              </Text>

              <Text style={styles.menuSubtitle}>
                All music on your device
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Text>♥</Text>
            </View>

            <View>
              <Text style={styles.menuTitle}>
                Favorites
              </Text>

              <Text style={styles.menuSubtitle}>
                Your favorite songs
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Text>☷</Text>
            </View>

            <View>
              <Text style={styles.menuTitle}>
                Playlists
              </Text>

              <Text style={styles.menuSubtitle}>
                Your playlists
              </Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },

  content: {
    padding: 20,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 20,
  },

  greeting: {
    color: '#aaa',
    fontSize: 15,
    marginBottom: 6,
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },

  search: {
    height: 48,
    backgroundColor: '#242424',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 15,
    marginBottom: 30,
  },

  section: {
    marginBottom: 30,
  },

  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },

  recentItem: {
    width: 130,
    marginRight: 15,
  },

  albumPlaceholder: {
    width: 130,
    height: 130,
    borderRadius: 10,
    backgroundColor: '#292929',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  musicIcon: {
    color: '#aaa',
    fontSize: 45,
  },

  songTitle: {
    color: '#fff',
    fontSize: 14,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },

  menuIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#292929',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },

  menuTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  menuSubtitle: {
    color: '#888',
    fontSize: 13,
    marginTop: 3,
  },
});

export default HomeScreen;