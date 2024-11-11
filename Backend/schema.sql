CREATE TABLE IF NOT EXISTS Listeners {
    -- userName, user_id, email, password, country

}

CREATE TABLE IF NOT EXISTS Artists {
    -- userName, authentication_id, email, password, country, style
}

CREATE TABLE IF NOT EXISTS Song {
    -- song_id, song_title, duration, album_id
}

CREATE TABLE IF NOT EXISTS Album {
    -- album_id, album_title, authentication_id
}

CREATE TABLE IF NOT EXISTS PlayList {
    -- user_id, playlist_name, like_counter, play_counter
}

CREATE TABLE IF NOT EXISTS Playlist_Song {
    -- song_id, playlist_name
}