# Final Project Docker - [2415354021]

## Nama Identitas
- **Nama:** I Putu Restu Dirgayusa
- **NIM:** [2415354021]
- **Kelas:** [4A TRPL]

---

## Deskripsi Project
Aplikasi REST API CRUD Node.js (Express) yang diintegrasikan dengan database MySQL dan Redis menggunakan Docker Compose. 

---

## Arsitektur Docker Services
Project ini menjalankan beberapa layanan via Docker Compose:
1. **backend-app**: Aplikasi Node.js Express berjalan pada port `3000`
2. **mysql-db**: Database MySQL berjalan pada port `3306`
3. **redis-db**: Caching / NoSQL berjalan pada port `6379`
4. **phpmyadmin-app**: Interface database berbasis web berjalan pada port `8080`

---

## Cara Menjalankan Project

1. Clone repository ini:
   ```bash
   git clone [https://github.com/](https://github.com/)[Dirgayus]/final-project-docker-[2415354021].git
   cd final-project-docker-[2415354021]


---

## langkah praktikumnya 
1. Membuat Volume yang akan di gunakan untuk container MYSQL
2. Compose project dengan file 'docker-compose.yml', yang kemudian Docker akan secara otomatis membuat container dengan volume dan membuat network.
3. Menguji ke-4 endpoint (GET, POST, PUT, DELETE)
create post menggunakan curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d "{\"name\":\"I Putu Restu Dirgayusa\", \"email\":\"restu.dirgayusa@mail.com\"}"
gett all users curl http://localhost:3000/users
Update User curl -X PUT http://localhost:3000/users/1 -H "Content-Type: application/json" -d "{\"name\":\"Restu Ganteng\", \"email\":\"restu.dirgayusa@mail.com\"}"
Delete User curl -X DELETE http://localhost:3000/users/1
