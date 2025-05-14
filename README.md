# ERP Backend API Documentation

This document provides an overview of the main API endpoints and features of the ERP backend system.

---

## 🔐 Authentication

### POST /api/auth/login  
Authenticate a user and obtain a JWT token.

**Request body:**

```json
{
  "email": "admin@example.com",
  "motDePasse": "123456"
}
```

**Response:**

```json
{
  "success": true,
  "token": "JWT_TOKEN"
}
```

All endpoints below require this token in the header:

```
Authorization: Bearer YOUR_TOKEN
```

---

## 👥 Clients

### GET /api/clients  
Query params: `page`, `limit`, `searchName`, `searchEmail`

### POST /api/clients

**Request JSON example:**

```json
{
  "nom": "Ahmed Ben Salah",
  "email": "ahmed@example.com",
  "tel": "12345678"
}
```

### PUT /api/clients/:id

**Request JSON example:**

```json
{
  "nom": "Ahmed B. Salah",
  "email": "ahmedb@example.com"
}
```

---

## 📦 Articles

### POST /api/articles

**Request JSON example:**

```json
{
  "nom": "Clavier AZERTY",
  "référence": "ART-123",
  "prix": 59.99,
  "stock": 25
}
```

### PUT /api/articles/:id

**Request JSON example:**

```json
{
  "prix": 49.99,
  "stock": 30
}
```

---

## 📄 Factures (Invoices)

### POST /api/factures

**Request JSON example:**

```json
{
  "clientId": "CLIENT_ID",
  "articles": [
    {
      "articleId": "ARTICLE_ID",
      "quantite": 2
    }
  ],
  "date": "2025-05-01"
}
```

---

## 🚚 Fournisseurs (Suppliers)

### POST /api/fournisseurs

**Request JSON example:**

```json
{
  "nom": "Société ABC",
  "email": "contact@abc.com",
  "tel": "98765432"
}
```

---

## 👨‍💼 Employés (Employees)

### POST /api/employes

**Request JSON example:**

```json
{
  "nom": "Sana Jelassi",
  "poste": "Comptable",
  "salaire": 1800
}
```

---

## 💰 Paiements (Payments)

### POST /api/paiements

**Request JSON example:**

```json
{
  "clientId": "CLIENT_ID",
  "factureId": "FACTURE_ID",
  "montant": 800,
  "datePaiement": "2025-05-01"
}
```

---

## 🎫 Abonnements (Subscriptions)

### POST /api/abonnements

**Request JSON example:**

```json
{
  "nom": "Pack Gold",
  "description": "Abonnement annuel complet",
  "prix": 1200,
  "dureeMois": 12,
  "statut": "actif"
}
```

---

## ⚙️ Configuration

### POST /api/config

**Request JSON example:**

```json
{
  "banque": {
    "nom": "BIAT",
    "iban": "TN591234...",
    "swift": "BIAATTNT"
  },
  "facturation": {
    "tva": 19,
    "delaiPaiementJours": 30,
    "mentionsLegales": "TVA non applicable"
  }
}
```

---

## 📤 Export PDF

### GET /api/reports/bilan/pdf  
Generates a downloadable PDF financial report (secured route).

---

## ❌ Error Handling (Global)

Example error response:

```json
{
  "success": false,
  "message": "Client non trouvé"
}
```

---

## 📌 Notes

- All data modification endpoints require JWT authentication.
- Pagination defaults to page 1, limit 10.
- Filtering uses case-insensitive substring search.
- All errors are caught and returned in JSON format.
- Standard response format:

Success:

```json
{
  "success": true,
  "data": { ... }
}
```

Error:

```json
{
  "success": false,
  "message": "Error message",
  "stack": "Error stack trace (only in development)"
}
```

- Common HTTP status codes used:

  - 200 OK
  - 201 Created
  - 204 No Content
  - 400 Bad Request
  - 401 Unauthorized
  - 404 Not Found
  - 500 Internal Server Error
