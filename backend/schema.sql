CREATE TABLE IF NOT EXISTS rooms (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('tersedia', 'dipinjam'))
);
