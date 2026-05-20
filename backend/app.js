require('dotenv').config({ path: '../.env' }); // Mengambil file .env dari root folder
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

const port = process.env.APP_PORT || 3000;

// Membuat koneksi database pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Fungsi auto-retry jika MySQL belum siap menerima koneksi saat startup
const initDatabase = () => {
    pool.query('SELECT 1', (err) => {
        if (err) {
            console.log('Database belum siap, mencoba kembali dalam 3 detik...', err.message);
            setTimeout(initDatabase, 3000);
            return;
        }
        console.log('Database MySQL berhasil terhubung!');
        
        // Membuat tabel users otomatis jika belum ada
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL
            );
        `;
        pool.query(createTableQuery, (err) => {
            if (err) console.error('Gagal membuat tabel:', err.message);
        });
    });
};
initDatabase();

// --- ENDPOINT API (CRUD) ---

// 1. GET ALL USERS
app.get('/users', (req, res) => {
    pool.query('SELECT * FROM users', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2. CREATE USER
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Name dan email wajib diisi' });

    pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, name, email });
    });
});

// 3. UPDATE USER
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    
    pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User berhasil diperbarui', id, name, email });
    });
});

// 4. DELETE USER
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: `User dengan ID ${id} berhasil dihapus` });
    });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
});