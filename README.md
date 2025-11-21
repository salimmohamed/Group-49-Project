## CS340 Project - Tech R Us Sales Management System

Authors: Salim Mohamed, Samuel Veney

### Backend database setup

1. **Create database (if not already created)**

   ```sql
   CREATE DATABASE tech_r_us_db;
   ```

2. **Install stored procedures (`sp_reset_techrus`, `sp_delete_customer`)**

   ```bash
   mysql -u root tech_r_us_db < backend/database/pl.sql
   ```

3. **Environment variables**
   - `backend/.env`:
     ```env
     DB_HOST=
     DB_USER=
     DB_PASSWORD=
     DB_DATABASE=
     PORT=8500
     ```
   - `frontend/.env`:
     ```env
     VITE_API_URL=
     ```

### Running the app

1. Install dependencies
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. Start the backend API
   ```bash
   cd backend
   npm start
   ```
3. Start the frontend
   ```bash
   cd frontend
   npm run dev
   ```
4. Navigate to the URL printed by Vite

### Reference

[OSU CS340 React Starter App](https://github.com/osu-cs340-ecampus/react-starter-app).
