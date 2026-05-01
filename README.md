# CRUD Query App

A complete Expo (React Native) application demonstrating full CRUD operations using **TanStack Query v5** and the **JSONPlaceholder** REST API.

---

## Features

- **Fetch Posts (GET)** — Load all posts or filter by User ID using `useQuery`
- **Create Post (POST)** — Form-based post creation with `useMutation`; new post is instantly prepended to the list
- **Update Post (PUT)** — Edit title and body of any existing post via a bottom-sheet form
- **Patch Post (PATCH)** — Update only the title of a post with a dedicated PATCH mutation
- **Delete Post (DELETE)** — Remove a post from the list with optimistic cache update
- **Filter by User ID** — Search field that refetches posts filtered by `?userId=<n>`
- **Pull-to-refresh** — Swipe down on the list to refetch
- **Loading / Error / Empty states** — Gracefully handled across all operations

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Expo (React Native) |
| Data fetching | TanStack Query v5 (`@tanstack/react-query`) |
| HTTP | Native `fetch` API |
| Styling | React Native `StyleSheet` |
| API | JSONPlaceholder (`https://jsonplaceholder.typicode.com`) |

---

## Project Structure

```
crud-query-app/
├── App.js                  # Root component — QueryClientProvider + layout
├── api/
│   └── postsApi.js         # All fetch/create/update/patch/delete functions
├── components/
│   ├── PostList.js         # FlatList with useQuery, hosts PostForm modal
│   ├── PostItem.js         # Single post card with Edit / Patch / Delete buttons
│   ├── PostForm.js         # Bottom-sheet modal form (create / edit / patch modes)
│   └── Filter.js           # User ID search bar
├── styles/
│   └── styles.js           # Shared StyleSheet + color tokens
├── app.json                # Expo configuration
├── babel.config.js
└── package.json
```

---

## Setup & Running

### Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`) or use `npx`
- Expo Go app on your phone, **or** an Android/iOS simulator

### Install & Start

```bash
# 1. Clone the repo
git clone https://github.com/yisakor-mirany/crud-query-app.git
cd crud-query-app

# 2. Install dependencies
npm install

# 3. Start the dev server
npx expo start
```

Scan the QR code with **Expo Go** (Android) or the **Camera app** (iOS) to run on your device.

---

## API Reference

All requests target `https://jsonplaceholder.typicode.com`.

| Operation | Method | Endpoint |
|---|---|---|
| Fetch all posts | GET | `/posts` |
| Fetch by user | GET | `/posts?userId=1` |
| Create post | POST | `/posts` |
| Update post | PUT | `/posts/:id` |
| Patch post | PATCH | `/posts/:id` |
| Delete post | DELETE | `/posts/:id` |

> JSONPlaceholder is a fake REST API — mutations are simulated and not persisted server-side. Local state is updated via TanStack Query's cache for a realistic UX.

---

## Example Commit Messages

```
feat: initialize Expo project with TanStack Query setup
feat: add fetchPosts with userId filter support
feat: implement GET posts list with useQuery and FlatList
feat: add create post form with useMutation (POST)
feat: add edit post functionality with PUT mutation
feat: add patch title-only update with PATCH mutation
feat: add delete post with optimistic cache removal
feat: add user ID filter component with query refetch
style: apply mobile-first StyleSheet with color tokens
```

---

## GitHub Repository

- **Name:** `crud-query-app`
- **Description:** Expo React Native app demonstrating CRUD operations with TanStack Query v5 and JSONPlaceholder API
