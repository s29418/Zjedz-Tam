# 🍽️ Zjedz Tam!

**Zjedz Tam!** to aplikacja webowa umożliwiająca rezerwację stolików w restauracjach. Projekt został stworzony jako część mojego portfolio programistcznego i ma na celu pokazanie moich umiejętności w tworzeniu pełnych aplikacji (full-stack) – zarówno po stronie frontendowej, jak i backendowej.

---

## ✨ Główne funkcjonalności

- ✅ Rejestracja i logowanie użytkownika z JWT
- ✅ Przegląd restauracji i szczegółowe informacje
- ✅ Rezerwacja stolika na konkretną datę i godzinę
- ✅ Panel użytkownika z historią rezerwacji
- ✅ Obsługa autoryzacji przy każdej interakcji z backendem
- ✅ Zabezpieczenie endpointów za pomocą middleware
- ✅ Walidacja danych po stronie frontendowej i backendowej

---

## 🛠️ Technologie

**Frontend:**
- React
- HTML / CSS
- JavaScript
- Context API
- Fetch API

**Backend:**
- Node.js + Express
- JWT (autoryzacja)
- MySQL
- REST API

**Inne:**
- bcrypt (hashowanie haseł)
- środowisko lokalne (MySQL)
- Postman (testowanie API)

---

## 📁 Struktura projektu

```
Zjedz-Tam/
├── backend/            # Backend - Node.js + Express + MySQL
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env            # Konfiguracja serwera
├── frontend/           # Frontend - React
│   ├── public/
│   └── src/
│       ├── components/
│       └── context/
│           └── UserContext.js
│       ├── pages/
│       ├── styles/
│       └── utils/
├── database/           # Skrypty bazy danych i model ERD
│   ├── db_create.sql
│   ├── db_values.sql
│   └── db-model.png
└── README.md
```

---

## ⚙️ Konfiguracja i uruchomienie projektu lokalnie

### 📦 Wymagania wstępne

- Node.js (v16+)
- MySQL
- Git

---

### 🗃️ Krok 1: Utworzenie bazy danych

1. Uruchom lokalny serwer MySQL
2. Zaloguj się do MySQL.
3. W katalogu `database/` znajdują się 2 pliki SQL:
   - `db_create.sql` – tworzy strukturę bazy danych
   - `db_values.sql` – wstawia dane przykładowe
4. Wykonaj te pliki w kolejności:

```sql
-- Najpierw struktura
SOURCE /ścieżka/do/database/db_create.sql;

-- Następnie dane przykładowe
SOURCE /ścieżka/do/database/db_values.sql;
```

📌 Uwaga: upewnij się, że masz utworzoną bazę danych `zjedz_tam` lub zmodyfikuj nazwę bazy w plikach SQL i `.env`.

---

### 🔑 Krok 2: Konfiguracja środowiska

> ℹ️ **Uwaga:** Plik `.env` został dołączony do repozytorium dla wygody testowania aplikacji lokalnie. Zawiera domyślne dane (np. root/admin) i może być bezpiecznie używany w środowisku lokalnym.

#### 📁 backend/.env

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin
DB_NAME=zjedz_tam
DB_PORT=3306
PORT=8000
JWT_SECRET=sekretnysekret
```

#### 📁 frontend/.env

```
BACKEND_URL=http://localhost:8000
```

---

### 🧩 Krok 3: Instalacja zależności

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

---

### 🚀 Krok 4: Uruchomienie aplikacji

**Uruchom backend:**
```bash
cd backend
npm run dev
```

**Uruchom frontend:**
```bash
cd ../frontend
npm start
```

Aplikacja będzie dostępna pod adresem: [http://localhost:3000](http://localhost:3000)

---

### 📊 Model bazy danych

Schemat ERD znajduje się w pliku:

```
/database/db-model.png
```

---

## 🧠 Czego się nauczyłem

- Integracji frontend ↔ backend z użyciem tokenów JWT
- Obsługi zapytań do MySQL z poziomu Node.js
- Uwierzytelniania i autoryzacji w aplikacjach SPA
- Dobrej organizacji kodu w projekcie fullstack
- Pracy z błędami i obsługi wyjątków

---

## 📚 Plany rozwoju

- [ ] System powiadomień o rezerwacjach
- [ ] Edytowanie/Anulowanie rezerwacji
- [ ] Obsługa wielu restauracji jako użytkowników "właścicieli"
- [ ] Dodanie testów jednostkowych i integracyjnych

---

## 📸 Screeny (opcjonalne)

Dodaj tu 2–3 screeny z aplikacji (np.):
- Strona główna z listą restauracji
- Formularz rezerwacji
- Panel użytkownika z historią rezerwacji

---


## 📫 Kontakt

- GitHub: [@s29418](https://github.com/s29418)
- Email: _kulasmikolaj00@gmail.com_