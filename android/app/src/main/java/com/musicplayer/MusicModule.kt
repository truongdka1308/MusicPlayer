package com.musicplayer

import android.provider.MediaStore
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class MusicModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "MusicModule"
    }

    @ReactMethod
    fun getSongs(promise: Promise) {
        try {
            val songs = Arguments.createArray()

            val projection = arrayOf(
                MediaStore.Audio.Media._ID,
                MediaStore.Audio.Media.TITLE,
                MediaStore.Audio.Media.ARTIST,
                MediaStore.Audio.Media.ALBUM,
                MediaStore.Audio.Media.DURATION
            )

            val selection =
                "${MediaStore.Audio.Media.IS_MUSIC} != 0"

            val sortOrder =
                "${MediaStore.Audio.Media.TITLE} ASC"

            val cursor = reactContext.contentResolver.query(
                MediaStore.Audio.Media.EXTERNAL_CONTENT_URI,
                projection,
                selection,
                null,
                sortOrder
            )

            cursor?.use {
                val idColumn =
                    it.getColumnIndexOrThrow(
                        MediaStore.Audio.Media._ID
                    )

                val titleColumn =
                    it.getColumnIndexOrThrow(
                        MediaStore.Audio.Media.TITLE
                    )

                val artistColumn =
                    it.getColumnIndexOrThrow(
                        MediaStore.Audio.Media.ARTIST
                    )

                val albumColumn =
                    it.getColumnIndexOrThrow(
                        MediaStore.Audio.Media.ALBUM
                    )

                val durationColumn =
                    it.getColumnIndexOrThrow(
                        MediaStore.Audio.Media.DURATION
                    )

                while (it.moveToNext()) {

                    val id = it.getLong(idColumn)
                    val title = it.getString(titleColumn)
                    val artist = it.getString(artistColumn)
                    val album = it.getString(albumColumn)
                    val duration = it.getLong(durationColumn)

                    val uri =
                        "${MediaStore.Audio.Media.EXTERNAL_CONTENT_URI}/$id"

                    val song = Arguments.createMap()

                    song.putString("id", id.toString())
                    song.putString("title", title)
                    song.putString("artist", artist)
                    song.putString("album", album)
                    song.putDouble(
                        "duration",
                        duration.toDouble()
                    )
                    song.putString("uri", uri)

                    songs.pushMap(song)
                }
            }

            promise.resolve(songs)

        } catch (e: Exception) {
            promise.reject(
                "MUSIC_ERROR",
                e.message,
                e
            )
        }
    }
}