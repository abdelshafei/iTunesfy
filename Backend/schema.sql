CREATE TABLE IF NOT EXISTS Listeners (
    user_id INTEGER UNIQUE NOT NULL,
    userName TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    country TEXT NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE IF NOT EXISTS Artists (
    userName TEXT UNIQUE NOT NULL,
    authentication_id TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    country TEXT NOT NULL,
    style TEXT, 
    -- img_url TEXT,
    PRIMARY KEY(authentication_id)
);

CREATE TABLE IF NOT EXISTS Song (
    song_id INTEGER UNIQUE NOT NULL,
    song_title TEXT NOT NULL,
    duration INTEGER NOT NULL,
    album_id INTEGER NOT NULL,
    -- img_url TEXT,
    PRIMARY KEY(song_id),
    FOREIGN KEY (album_id) REFERENCES Album(album_id)
);

CREATE TABLE IF NOT EXISTS Album (
    album_id INTEGER UNIQUE NOT NULL,
    album_title TEXT NOT NULL,
    authentication_id TEXT NOT NULL,
    -- img_url TEXT,
    PRIMARY KEY(album_id)
    FOREIGN KEY (authentication_id) REFERENCES Artists(authentication_id)
);

CREATE TABLE IF NOT EXISTS PlayList (
    user_id INTEGER NOT NULL,
    playlist_name TEXT NOT NULL,
    play_counter INTEGER NOT NULL,
    PRIMARY KEY(user_id, playlist_name)
    FOREIGN KEY (user_id) REFERENCES Listeners(user_id)
);

CREATE TABLE IF NOT EXISTS Playlist_Song (
    song_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    playlist_name TEXT NOT NULL,
    PRIMARY KEY (playList_name, user_id, song_id),
    FOREIGN KEY (song_id) REFERENCES Song(song_id),
    FOREIGN KEY (user_id, playList_name) REFERENCES PlayList(user_id, playlist_name)
);

CREATE TABLE IF NOT EXISTS Playlist_Like (
    user_id INTEGER NOT NULL,
    playlist_name TEXT NOT NULL,
    Liked_id INTEGER NOT NULL,
    userLiked_id INTEGER NOT NULL,
    PRIMARY KEY (user_id, playList_name, userLiked_id),
    FOREIGN KEY (user_id, playList_name) REFERENCES Playlist(user_id, playList_name),
    FOREIGN KEY (userLiked_id) REFERENCES Listener(user_id)
);


CREATE TABLE IF NOT EXISTS Auth_ids (
    Auth_id  TEXT UNIQUE NOT NULL,
    FOREIGN KEY (Auth_id) REFERENCES Artists(authentication_id)
);

INSERT OR IGNORE INTO Auth_ids VALUES("369196");
INSERT OR IGNORE INTO Auth_ids VALUES("538359");
INSERT OR IGNORE INTO Auth_ids VALUES("239473");
INSERT OR IGNORE INTO Auth_ids VALUES("139010");
INSERT OR IGNORE INTO Auth_ids VALUES("923253");
INSERT OR IGNORE INTO Auth_ids VALUES("763365");
INSERT OR IGNORE INTO Auth_ids VALUES("666777");