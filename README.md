
# **URL Shortener API**

The **URL Shortener API** allows users to shorten URLs, manage them, and track their usage. The API supports features such as user authentication, custom aliases, expiration dates, and detailed analytics.

---

## **Features**

- **User Authentication**
  - User registration and login using JWT for secure access.
  - Passwords are securely hashed.

- **URL Management**
  - Create short URLs with optional custom aliases and expiration dates.
  - Retrieve, update, and delete your shortened URLs.

- **Redirection**
  - Access short URLs to redirect to their original URLs.

- **Input Validation**
  - Ensures all inputs are properly validated with meaningful error messages.

- **Rate Limiting**
  - Prevent abuse by limiting the number of requests per user.

- **API Documentation**
  - Interactive Swagger UI available at `/api-docs`.

---
## **Technologies Used**

- **Framework:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Documentation:** Swagger/OpenAPI

---

## Getting Started

To run the application locally, follow these steps:

1. Clone this repository to your local machine:

```
git clone <repository-url>
```

2. Install dependencies:
```
npm install
```

3. Start the server:

```
npm run serve
```

4. Once the server is running, you can use tools like Thunder Client, Postman, or any other HTTP client to interact with the API endpoints.

5. **Access the API**
   - Base URL: **[http://localhost:3000/](http://localhost:3000)**
   - Swagger Documentation: **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

---

## **API Endpoints**

### **Authentication**
| Method | Endpoint                | Description            |
|--------|-------------------------|------------------------|
| POST   | `/api/users/register`   | Register a new user    |
| POST   | `/api/users/login`      | Log in and get a token |

### **URL Management**
| Method | Endpoint                   | Description                                    |
|--------|----------------------------|------------------------------------------------|
| POST   | `api/urls/`                | Create a short URL                             |
| GET    | `api/urls/`                | Retrieve all URLs (with pagination and filters)|
| PATCH  | `api/urls/{alias}`         | Update a short URL                             |
| DELETE | `api/urls/{id}`            | Delete a short URL                             |

### **Redirection**
| Method | Endpoint                    | Description                                   |
|--------|-----------------------------|-----------------------------------------------|
| GET    | `api/urls/{alias}`          | Redirect to the original URL                  |

---

## **Swagger Documentation**
The API documentation is available at **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**. It provides details on all endpoints, request/response formats, and examples.

---
