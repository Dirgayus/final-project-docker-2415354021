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
## Langkah Praktikumnya

### 1. Pengujian Docker Compose, Volume, Network, dan Container

Langkah ini dilakukan untuk memastikan seluruh layanan (services), network, dan volume berhasil dibuat dan berjalan dengan baik.

* **Menjalankan Docker Compose:**
    ```bash
    docker compose up -d
    ```
* **Memeriksa Status Container:**
    Jalankan perintah berikut untuk memastikan semua container berstatus *Up*:
    ```bash
    docker compose ps
    ```
    *Hasil pengujian pada terminal menunjukkan 4 container berjalan normal:*
    * `backend-app` (Port 3000) -> **Up**
    * `mysql-db` (Port 3307->3306) -> **Up**
    * `phpmyadmin-app` (Port 8080->80) -> **Up**
    * `redis-db` (Port 6379) -> **Up**

* **Memeriksa Jaringan (Network):**
    ```bash
    docker network ls
    ```
* **Memeriksa Volume (Data Persistence MySQL):**
    ```bash
    docker volume ls
    ```

---

### 2. Pengujian Endpoint (Request dan Response)

Pengujian dilakukan untuk memastikan REST API backend berfungsi dengan baik dan terintegrasi ke database serta caching system.

#### A. Melalui Browser
* **phpMyAdmin:** Buka [http://localhost:8080](http://localhost:8080) di browser untuk memastikan interface database MySQL dapat diakses.
* **Backend Status:** Buka [http://localhost:3000](http://localhost:3000) untuk mengecek respons awal dari server Node.js Express.

#### B. Melalui Postman (CRUD Testing)
Gunakan aplikasi Postman untuk menguji endpoint REST API dengan skenario berikut:

* **CREATE (Post Data)**
    * **Method:** `POST`
    * **URL:** `http://localhost:3000/api/items` (sesuaikan dengan route Anda)
    * **Body (JSON):** ```json
      {
        "name": "Barang Praktikum",
        "description": "Testing input data lewat Docker"
      }
      ```
    * **Response:** `201 Created` (Data berhasil masuk ke MySQL).

* **READ (Get Data & Redis Caching)**
    * **Method:** `GET`
    * **URL:** `http://localhost:3000/api/items`
    * **Response:** `200 OK` (Menampilkan data). Request pertama mengambil dari MySQL, request kedua dan seterusnya diambil dari cache Redis (lebih cepat).

* **UPDATE (Ubah Data)**
    * **Method:** `PUT`
    * **URL:** `http://localhost:3000/api/items/1`
    * **Body (JSON):** `{"name": "Barang Diupdate"}`
    * **Response:** `200 OK` (Data berhasil diperbarui).

* **DELETE (Hapus Data)**
    * **Method:** `DELETE`
    * **URL:** `http://localhost:3000/api/items/1`
    * **Response:** `200 OK` (Data berhasil dihapus).

---

### 3. Pengujian Upload ke Docker Hub

Langkah-langkah untuk mem-build image backend secara lokal dan mengunggahnya ke repository Docker Hub.

* **Login ke Docker Hub melalui Terminal:**
    ```bash
    docker login
    ```
    *Masukkan dirgayusa dan password Docker Hub.*

* **Build dan Tag Image Backend:**
    Pastikan berada di direktori project, lalu jalankan perintah (ganti `<dirgayusa>` dengan Docker Hub):
    ```bash
    docker build -t <dirgayusa>/backend-good:latest ./backend
    ```
* **Push Image ke Docker Hub:**
    ```bash
    docker push <dirgayusa>/backend-good:latest
    ```
* **Verifikasi:** Buka browser dan cek dashboard [hub.docker.com](https://hub.docker.com/) untuk memastikan repository `<dirgayusa>/backend-good` sudah terbit.

---

### 4. Pengujian Lainnya yang Diperlukan (Troubleshooting & Logs)

* **Melihat Log Real-time Backend:**
    Digunakan untuk proses debugging atau melihat aktivitas request yang masuk ke Express app:
    ```bash
    docker compose logs -f backend-app
    ```
* **Menghentikan Layanan Aman:**
    Untuk mematikan seluruh container tanpa menghapus data database yang ada di volume:
    ```bash
    docker compose down
    ```