# ABG Knowledge Hub — MERN application

## Requirements

- Node.js 18+ (20 LTS recommended)
- MongoDB Atlas cluster and database user
- Internet connection for package installation and remote demo thumbnail images

## 1. Configure MongoDB Atlas

1. In MongoDB Atlas, create a free/shared cluster.
2. Create a database user (username and password).
3. In Network Access, allow your current IP address. For temporary local testing
   only, you can allow `0.0.0.0/0`; restrict it before deployment.
4. Select **Connect → Drivers → Node.js** and copy the connection string.
5. Enter the connection string in the `.env` file 

## 2. Start the backend

Open a terminal in `backend/`:

```bash
npm install
```

Copy `.env.example` to `.env` and add your Atlas connection string:

```env
PORT=5000
MONGODB_URI=MongoDB connection string here
CLIENT_URL=http://localhost:5173
```

Then run:

```bash
npm run seed
npm run dev
```

Expected messages include `MongoDB Atlas connected` and
`ABG Knowledge Hub API listening on http://localhost:5000`.

## 3. Start the frontend

Open another terminal in `frontend/`:

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

## 4. Verify the API

- `GET http://localhost:5000/api/health` — server/database health
- `GET http://localhost:5000/api/knowledge` — published knowledge records
- `GET http://localhost:5000/api/dashboard` — dashboard counts and top/recent
  content
- `GET http://localhost:5000/api/filters` — business/function/type/topic filters

The `/api/knowledge` route is implemented directly and returns
`{ success, count, data }`. If Atlas is not configured or not reachable, the API
will not return database records; the frontend has visual fallback cards so the
design remains viewable.


## API endpoints

| Method         | Endpoint                      | Purpose                                       |
| -------------- | ----------------------------- | --------------------------------------------- |
| GET/POST       | `/api/knowledge`              | List/search and create knowledge              |
| GET/PUT/DELETE | `/api/knowledge/:id`          | View, edit and archive                        |
| POST           | `/api/knowledge/:id/like`     | Like content                                  |
| POST           | `/api/knowledge/:id/bookmark` | Bookmark content                              |
| POST           | `/api/knowledge/:id/share`    | Record share                                  |
| POST           | `/api/knowledge/:id/comments` | Add comment                                   |
| PATCH          | `/api/knowledge/:id/workflow` | Approval status/history                       |
| GET            | `/api/dashboard`              | Adoption and content metrics                  |
| GET            | `/api/filters`                | Taxonomy values                               |
| POST           | `/api/assistant`              | Search published knowledge with cited sources |
| GET/POST       | `/api/questions`              | Ask Expert questions                          |
| GET/POST       | `/api/communities`            | Community discussions                         |
| GET            | `/api/experts`                | Expert directory sample data                  |
| GET            | `/api/leaderboard`            | Contributor ranking                           |


