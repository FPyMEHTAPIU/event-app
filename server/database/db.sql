CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    photo TEXT
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    photo TEXT NOT NULL,
    capacity INTEGER NOT NULL
);

CREATE TABLE booked_events (
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    PRIMARY KEY(user_id, event_id)
);