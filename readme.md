

# Redis Session Management System

## Overview
This project is a simple user session management system using **Express.js** and **Redis** (running locally) to store user session data. It simulates user login and session handling, where user data is stored in Redis with an expiration time (e.g., 30 minutes) for session keys. 

## Prerequisites
- **Node.js** installed on your local machine.
- **Redis** running locally (e.g., `localhost` at port `6379`).

## Getting Started

### 1. Clone the repository:
```bash
git clone https://github.com/your-username/redis-session-management.git
```
```bash
cd redis-session-management
```
### 2. Install dependencies:
Run the following commands to install project dependencies:
```bash
npm install
```

### 3. Start Redis locally:
You can use the built-in `redis-server` command if you have Redis installed locally.
```bash
redis-server
```
If Redis is not installed on your local machine, you can download it from [https://github.com/microsoftarchive/redis/releases](https://github.com/microsoftarchive/redis/releases).

### 4. Run the Express server:

```bash
node index.js
```
The server will start and listen on `http://localhost:3000`.

### 5. Test the API:
#### - **Login Endpoint**:
To simulate a user login, make a `POST` request to `http://localhost:3000/login` with a JSON body:
```json
{
  "username": "Hsk"
}
```
The response will include a `sessionId` (e.g., `session_HsK`).

#### - **Session Data Endpoint**:
To retrieve session data, make a `GET` request to `http://localhost:3000/session/session_Hsk`

This will return the session data stored in Redis, or a `404` error if the session has expired or is not found.

## Redis Commands:
You can also manually check the stored data in Redis using the `redis-cli`:
1. List all keys: `KEYS *`
2. Get session data: `GET session_Hsk`
3. Check session expiration: `TTL session_Hsk`
4. Delete session: `DEL session_Hsk`



## Contributing:
Feel free to open issues and submit pull requests if you find any bugs or want to add features.



