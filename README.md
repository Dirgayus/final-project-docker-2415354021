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