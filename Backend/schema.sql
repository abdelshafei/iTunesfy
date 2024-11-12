CREATE TABLE IF NOT EXISTS Listeners {
    userName TEXT UNIQUE NOT NULL,
    user_id INTEGER UNIQUE NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    country TEXT NOT NULL,
    PRIMARY KEY(userName, user_id)
}

CREATE TABLE IF NOT EXISTS Artists {
    userName TEXT UNIQUE NOT NULL,
    authentication_id INTEGER UNIQUE NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    country TEXT NOT NULL,
    style TEXT, 
    PRIMARY KEY(userName, authentication_id)
}

CREATE TABLE IF NOT EXISTS Song {
    song_id INTEGER UNIQUE NOT NULL,
    song_title TEXT NOT NULL,
    duration INTEGER NOT NULL,
    album_id INTEGER NOT NULL,
    PRIMARY KEY(song_id, song_title),
    FOREIGN KEY (album_id) REFERENCES Album(album_id)
}

CREATE TABLE IF NOT EXISTS Album {
    album_id INTEGER UNIQUE NOT NULL,
    album_title TEXT NOT NULL,
    authentication_id INTEGER NOT NULL,
    PRIMARY KEY(album_id)
    FOREIGN KEY (authentication_id) REFERENCES Artists(authentication_id)
}

CREATE TABLE IF NOT EXISTS PlayList {
    user_id INTEGER UNIQUE NOT NULL,
    playlist_name TEXT UNIQUE NOT NULL,
    like_counter INTEGER NOT NULL,
    play_counter INTEGER NOT NULL,
    PRIMARY KEY(user_id, PlayList)
    FOREIGN KEY (user_id) REFERENCES Listeners(user_id)
}

CREATE TABLE IF NOT EXISTS PlayListLikes_Listeners {
    user_id INTEGER NOT NULL,
    playlist_name TEXT NOT NULL,
    PRIMARY KEY(user_id, PlayList),
    FOREIGN KEY (user_id) REFERENCES Listeners(user_id),
    FOREIGN KEY (playlist_name) REFERENCES PlayList(playlist_name)
}

CREATE TABLE IF NOT EXISTS Playlist_Song {
    song_id INTEGER NOT NULL,
    playlist_name TEXT NOT NULL,
    PRIMARY KEY(song_id, PlayList),
    FOREIGN KEY (song_id) REFERENCES Song(song_id),
    FOREIGN KEY (playlist_name) REFERENCES PlayList(playlist_name)
}


CREATE TABLE IF NOT EXISTS Auth_ids {
    Auth_id  INTEGER PRIMARY KEY NOT NULL
}
INSERT OR IGNORE Auth_ids(Auth_id) {
    
}