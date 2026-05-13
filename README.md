# Work Order Management System

A full-stack web application for managing field technician work orders — built with Java Spring Boot, PostgreSQL, and React.

## Motivation

Inspired by my experience as a Field Service Technician at Bell Canada, where managing work orders was a core part of daily operations. This project simulates the kind of enterprise utility software built by companies like SpryPoint.

## Features

- View all work orders in a clean, filterable table
- Filter by status: OPEN, IN_PROGRESS, CLOSED
- Color-coded status and priority badges
- Create new work orders via a form
- Full REST API with GET, POST, PUT, DELETE endpoints
- Data persisted in PostgreSQL

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Java 17, Spring Boot |
| Database | PostgreSQL |
| API Style | REST |
| Version Control | Git, GitHub |

## Project Structure

```
work-order-management/
├── src/main/java/com/workorder/api/
│   ├── ApiApplication.java
│   ├── WorkOrder.java
│   ├── WorkOrderRepository.java
│   └── WorkOrderController.java
├── src/main/resources/
│   └── application.properties
├── frontend/
│   └── src/
│       └── App.js
└── pom.xml
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/workorders | Get all work orders |
| GET | /api/workorders/{id} | Get one work order |
| POST | /api/workorders | Create new work order |
| PUT | /api/workorders/{id} | Update work order |
| DELETE | /api/workorders/{id} | Delete work order |

## Getting Started

### Prerequisites
- Java 17
- PostgreSQL
- Node.js

### Backend Setup
```bash
# Create the database
psql -U postgres -c "CREATE DATABASE workorderdb;"

# Run the Spring Boot server
./mvnw spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

App runs at `http://localhost:3000`  
API runs at `http://localhost:8080`