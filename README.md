# ABG Knowledge Hub — MERN application

A responsive enterprise knowledge hub prototype based on the uploaded 8-page ABG
Knowledge Hub BRD. The UI follows the Phase 1 prototype (BRD page 5): navy
sidebar, welcome area, promotional hero, recommended knowledge cards, theme
tiles, recent content and AI assistant panel. It also includes the Phase 2
workflows and collaboration modules described on pages 6–8.

## Important implementation choice

This build intentionally has **no authentication/login system**. It opens
directly, without JWT, passwords, protected routes or 401 login errors, matching
your previous instruction to remove authentication. Consequently, this is a
local prototype: do not expose it publicly with real company information until
proper access controls are added.

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
5. Replace `<password>` with the database user's password and include the
   database name `abg_knowledge_hub`.

## 2. Start the backend

Open a terminal in `backend/`:

```bash
npm install
```

Copy `.env.example` to `.env` and add your Atlas connection string:

```env
PORT=5000
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/abg_knowledge_hub?retryWrites=true&w=majority
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

## Included modules

- Home dashboard, recommendations, trending, recent knowledge and theme
  exploration
- Discover with business/content-type filters and global search
- Knowledge details, views, likes, bookmarks, shares and comments
- Content contribution with metadata and file upload (25 MB limit)
- Pending approval queue: publish, send for revision, reject; approval history
  stored
- Knowledge AI assistant: keyword retrieval from published records with source
  citations (not a hosted LLM)
- Ask an Expert directory and question submission
- Communities of Practice with discussion creation and likes
- Leaderboard based on published contributions
- Reports, analytics and content catalogue
- Workspace/bookmarks and notifications-style feed

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

## Notes / scope boundaries

- The BRD describes a GenAI assistant with conversational responses and
  citations. This prototype uses explainable keyword matching over published
  MongoDB records; connect an approved LLM/RAG service to enable genuine
  generative answers.
- Expert directory entries are demonstration data in the API. Add an Expert
  collection and admin-managed profiles for production.
- Notifications are represented by a simple activity/notification-style UI;
  real-time delivery (email, push or socket) is not configured.
- File metadata is stored in MongoDB, while uploaded bytes are stored in
  `backend/uploads/`. For cloud deployment, use object storage (e.g. S3/Azure
  Blob) rather than local disk.
- No real ABG logo assets were included in the BRD as reusable files. The
  sidebar uses a text-based ABG mark; replace it with an approved corporate logo
  asset before production.
- Demo image thumbnails use remote Unsplash images. Replace with approved
  company imagery for production.
