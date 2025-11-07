# CS340 Project - Tech R Us Sales Management System

Authors: Salim Mohamed, Samuel Veney

## Description

A full-stack web application for managing sales operations with CRUD (Create, Read, Update, Delete) operations on Customers, Products, Sales, Sales Details, Sales Associates, and Manufacturers.

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd App/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your database configuration:
   ```
   DB_HOST=your_host
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_DATABASE=your_database
   PORT=8500
   ```

4. Run the database DDL script to create tables:
   ```bash
   mysql -u your_user -p your_database < database/ddl.sql
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd App/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your API URL:
   ```
   VITE_API_URL=http://localhost:8500/api/
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Build for production:
   ```bash
   npm run build
   ```

6. Serve the built application:
   ```bash
   npm run serve
   ```

## Project Structure

```
App/
  backend/
    controllers/     # Request handlers
    routes/         # API route definitions
    database/       # Database configuration and DDL
    server.js       # Express server entry point
  frontend/
    src/
      components/   # React components
      pages/        # Page components
    public/         # Static assets
```

## API Endpoints

### Customers
- `GET /api/customers` - Get all customers
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create a new customer
- `PUT /api/customers/:id` - Update a customer
- `DELETE /api/customers/:id` - Delete a customer

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Sales
- `GET /api/sales` - Get all sales
- `GET /api/sales/:id` - Get sale by ID
- `POST /api/sales` - Create a new sale
- `PUT /api/sales/:id` - Update a sale
- `DELETE /api/sales/:id` - Delete a sale

### Sales Details
- `GET /api/salesDetails` - Get all sales details
- `GET /api/salesDetails/:id` - Get sales detail by ID
- `POST /api/salesDetails` - Create a new sales detail
- `PUT /api/salesDetails/:id` - Update a sales detail
- `DELETE /api/salesDetails/:id` - Delete a sales detail

### Sales Associates
- `GET /api/salesAssociates` - Get all sales associates
- `GET /api/salesAssociates/:id` - Get sales associate by ID
- `POST /api/salesAssociates` - Create a new sales associate
- `PUT /api/salesAssociates/:id` - Update a sales associate
- `DELETE /api/salesAssociates/:id` - Delete a sales associate

### Manufacturers
- `GET /api/manufacturers` - Get all manufacturers
- `GET /api/manufacturers/:id` - Get manufacturer by ID
- `POST /api/manufacturers` - Create a new manufacturer
- `PUT /api/manufacturers/:id` - Update a manufacturer
- `DELETE /api/manufacturers/:id` - Delete a manufacturer

