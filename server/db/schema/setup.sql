PRAGMA journal_mode=WAL;
PRAGMA foreign_keys = ON;

-- Users Table --
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('volontaire', 'company', 'admin'))
);

-- Volontaire Table --
CREATE TABLE IF NOT EXISTS volontaire (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    age INTEGER NOT NULL,  
    tele TEXT NOT NULL,  
    ncin TEXT NOT NULL,     
    gender TEXT CHECK(gender IN ('male', 'female')) NOT NULL,
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL,
    localisation TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Company Table --
CREATE TABLE IF NOT EXISTS company (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    name TEXT NOT NULL UNIQUE,
    specialite TEXT NOT NULL,
    tele TEXT NOT NULL,  
    localisation TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Post Table --
CREATE TABLE IF NOT EXISTS post (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_src TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(company_id) REFERENCES company(id) ON DELETE CASCADE
);

-- Skills Table --
CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    volontaire_id INTEGER NOT NULL,
    skill TEXT NOT NULL,
    FOREIGN KEY(volontaire_id) REFERENCES volontaire(id) ON DELETE CASCADE
);

-- Invites Table --
CREATE TABLE IF NOT EXISTS invites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER NOT NULL,
    volontaire_id INTEGER NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('pending', 'accepted')),
    FOREIGN KEY(company_id) REFERENCES company(id) ON DELETE CASCADE,
    FOREIGN KEY(volontaire_id) REFERENCES volontaire(id) ON DELETE CASCADE
);

-- Sessions Table --
CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

