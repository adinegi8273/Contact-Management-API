# Task 2 — Contact Management System

Backend: Express.js + PostgreSQL (`pg`). Frontend: plain HTML/JS served as static files by the same server.

## Folder structure

```
task2-contact-management/
├── config/
│   └── db.js               # Postgres connection pool
├── models/
│   └── contactModel.js      # All SQL queries
├── controllers/
│   └── contactController.js # Request handling + responses
├── routes/
│   └── contactRoutes.js     # /contacts routes
├── middleware/
│   └── validateContact.js   # Input validation
├── public/
│   ├── home.html             # List, search, sort, paginate, edit/delete
│   ├── add_contact.html      # Create a contact
│   └── change_contact.html   # Edit a contact (?id=)
├── insertData.js            # Your seed script (unchanged)
├── server.js
└── package.json
```

## 1. Setup

```bash
cd task2-contact-management
npm install
```

Your database is already seeded (from `insertData.js`), so nothing else is needed there —
**just confirm your `contacts` table has an `id` column** (usually `id SERIAL PRIMARY KEY`),
since editing/deleting/searching a single contact relies on it. If you're not sure, run:

```sql
\d contacts
```

in `psql`. If `id` is missing, add it with:

```sql
ALTER TABLE contacts ADD COLUMN id SERIAL PRIMARY KEY;
```

If your DB connection details differ from `postgresql://postgres:123@localhost/Contact`,
edit `config/db.js` (or set a `DATABASE_URL` environment variable).

## 2. Run

```bash
npm start
```

Server runs at `http://localhost:3000`. Open `http://localhost:3000/home.html` in your browser
for the UI, or hit the API directly.

## 3. API reference

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/contacts` | List contacts (supports `search`, `sortBy`, `order`, `page`, `limit`) |
| GET | `/contacts/:id` | Get a single contact |
| POST | `/contacts` | Create a contact |
| PUT | `/contacts/:id` | Update a contact |
| DELETE | `/contacts/:id` | Delete a contact |

## 4. Checklist — how to verify each task requirement

**Express.js backend** ✅
- `npm start` and confirm you see `Listening at http://localhost:3000` with no errors.

**Database models for name/email/phone/address/company** ✅
- `models/contactModel.js` reads/writes all 5 fields. Confirm via:
  `curl http://localhost:3000/contacts` — each row should show all 5 fields.

**Add / update / delete / retrieve APIs** ✅
- Retrieve all:
  `curl http://localhost:3000/contacts`
- Retrieve one:
  `curl http://localhost:3000/contacts/1`
- Add:
  ```bash
  curl -X POST http://localhost:3000/contacts \
    -H "Content-Type: application/json" \
    -d '{"name":"Test User","email":"test.user@example.com","phone_number":"9998887771","address":"Test St","company":"Test Co"}'
  ```
  Confirm response is `201` with the new row (note its `id`).
- Update (use the id from above):
  ```bash
  curl -X PUT http://localhost:3000/contacts/21 \
    -H "Content-Type: application/json" \
    -d '{"name":"Test User Updated","email":"test.user@example.com","phone_number":"9998887771","address":"New St","company":"Test Co"}'
  ```
- Delete:
  ```bash
  curl -X DELETE http://localhost:3000/contacts/21
  ```
  Then GET it again and confirm you get `404`.

**Search by name, email, or phone number** ✅
- `curl "http://localhost:3000/contacts?search=Reddy"` → matches by name
- `curl "http://localhost:3000/contacts?search=ananya.reddy@example.com"` → matches by email
- `curl "http://localhost:3000/contacts?search=9845123670"` → matches by phone
- Or just type into the search box on `home.html` and watch the table filter live.

**Sorting and pagination** ✅
- `curl "http://localhost:3000/contacts?sortBy=email&order=DESC"`
- `curl "http://localhost:3000/contacts?page=2&limit=5"`
- Response includes a `pagination` object: `{ total, page, limit, totalPages }`.
- On `home.html`, use the sort dropdowns and the Prev/Next buttons at the bottom of the table.

**Validate input & prevent duplicates** ✅
- Try POSTing with a missing name/bad email/short phone → expect `400` with a `details` array
  explaining what's wrong:
  ```bash
  curl -X POST http://localhost:3000/contacts \
    -H "Content-Type: application/json" \
    -d '{"name":"A","email":"not-an-email","phone_number":"123"}'
  ```
- Try POSTing a contact with an email or phone that already exists (e.g. copy one from
  `insertData.js`) → expect `409 Conflict`:
  ```bash
  curl -X POST http://localhost:3000/contacts \
    -H "Content-Type: application/json" \
    -d '{"name":"Dup Test","email":"ananya.reddy@example.com","phone_number":"9845123670","address":"x","company":"x"}'
  ```

**Handle API errors with meaningful responses** ✅
- Unknown route → `404 {"error":"Route not found"}`
- Unknown contact id → `404 {"error":"Contact not found"}`
- Invalid id in URL (e.g. `/contacts/abc`) → `400 {"error":"Invalid contact id"}`
- Bad input → `400` with a `details` array
- Duplicate email/phone → `409` with an explanation
- Unexpected DB/server issue → `500 {"error":"..."}` (check server console for the real stack trace)

**Scalable folder structure** ✅
- Routes, controllers, models, middleware, and config are separated (see structure above),
  so adding new resources later (e.g. `/users`) won't mean piling more code into `server.js`.

## 5. Notes / things I fixed from your original files

- `server.js` only had a single `GET /` — no create/update/delete/search, and the DB
  password/URL was hardcoded with no env override. Split into config/model/controller/routes
  and added the missing CRUD + search endpoints.
- `home.html` had a few bugs: the row HTML was built as a plain string but never assigned to
  anything (` \`...\` ` template literal with no target), and `tbody.appendChild(contacts)`
  tried to append an array instead of DOM nodes. Rewired it to build actual `<tr>` elements
  and append each one, plus added search/sort/pagination controls and Edit/Delete buttons.
- `change_contact.html` was empty — built it out as an edit form that loads the contact by
  `?id=` and PUTs the changes back.
- Added `add_contact.html`, which didn't exist yet but is needed to actually create contacts
  from the UI.
