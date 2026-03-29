# Supabase Implementation Specification

This document details all the logic, architecture, and specifications related to Supabase integration within the Sandbox project. It covers both the Frontend (Next.js) and Backend (Spring Boot) implementations.

## 1. Frontend Integration (Next.js)

The frontend uses `@supabase/ssr` to implement robust server-side rendering support for Supabase Authentication, paired with `@supabase/supabase-js` for browser-based operations.

### 1.1 Auth Clients
Supabase requires different client initializers depending on the rendering context.

- **Browser Client (`utils/supabase/client.ts`)**
  Uses `createBrowserClient(URL, ANON_KEY)`. It relies on browser cookies that have already been set. It is used in Client Components.
- **Server Client (`utils/supabase/server.ts`)**
  Uses `createServerClient(URL, ANON_KEY, { cookies })`. Since Server Components cannot write to cookies, it reads from `cookies().getAll()`.

### 1.2 Auth State Hook (`hooks/useSupabaseSession.ts`)
A custom React hook (`useSupabaseSession`) used for accessing user session data across client components.
- **Logic:** Calls `getSession()` on initial mount and subscribes to `onAuthStateChange` to listen to token refreshes or login/logout events.
- **Provides:**
  - `data` (The current `Session` object if logged in, otherwise `null`).
  - `status` (`"loading" | "authenticated" | "unauthenticated"`).
  - `supabase` (The browser client instance for executing DB/Auth functions).

### 1.3 Route Guarding (`middleware.ts`)
Next.js Middleware intercepts requests before they hit the page logic to secure private routes.
- **Session Refresh:** Reads cookies, initializes `createServerClient`, intercepts and attaches the latest session. Runs `supabase.auth.getUser()`.
- **Protected Paths:** All paths except `/login`, `/auth`, and `/` remain protected. Unauthenticated users are redirected to `/login`.
- **Guest Paths:** If an authenticated user attempts to access `/login`, they are automatically redirected back to `/`.

### 1.4 OAuth Callback (`app/auth/callback/route.ts`)
Used as an endpoint to verify PKCE auth codes exchanged during OAuth, Magic Link, or typical signups.
- Extracts `code` and `next` (redirect url) from search params.
- Calls `supabase.auth.exchangeCodeForSession(code)` on the Server client.
- Automatically stores auth cookies and redirects the user to the `next` route on success or `/login?error=auth-code-exchange` on failure.

---

## 2. Backend Integration (Spring Boot)

The backend applications (`chat`, `dinner`) utilize Supabase's underlying Postgres Database directly and make explicit REST API calls to Supabase Storage.

### 2.1 Database (PostgreSQL)
Since Supabase exposes a native Postgres connection, the Spring configurations connect to Supabase DB via JDBC.
- **Configuration** (`application.yml`):
  ```yaml
  datasource:
    url: jdbc:postgresql://db.xabewjiiewyhhjfekazv.supabase.co:5432/postgres
    username: ${SUPABASE_DB_USERNAME}
    password: ${SUPABASE_DB_PASSWORD}
  ```
- **Usage:** Managed primarily by Spring Data JPA and Hibernate. DDL Auto is typically set to `none` as schema operations should be run via migrations elsewhere.

### 2.2 Storage / Blobs (`BlobStorageService.java`)
The backend is responsible for uploading files to Supabase Storage.
- **REST Implementation:** Unlike standard SDKs, the project uploads directly to Supabase Storage API using Spring's `RestTemplate`.
- **Upload Flow:**
  - Posts file to `[SUPABASE_URL]/storage/v1/object/[BUCKET_NAME]/[FILE_NAME]`.
  - Appends headers:
    - `Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
    - `apikey: ${SUPABASE_SERVICE_ROLE_KEY}`
  - Returns a byte stream of the file equivalent to legacy Azure flows.
- **Public URL Generation:**
  - Generates asset URLs via standard routing:
    `[SUPABASE_URL]/storage/v1/object/public/[BUCKET_NAME]/[FILE_NAME]`

## 3. Environment Variables Required

For full operation, the application requires the following environment mappings across stacks:

**Frontend (.env):**
- `NEXT_PUBLIC_SUPABASE_URL` (Starts with https://xabewjiiewyhhjfekazv.supabase.co)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Backend (Runtime Env Settings):**
- `SUPABASE_DB_USERNAME`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_SERVICE_ROLE_KEY`
