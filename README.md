# Game Review Vault

A comprehensive game review platform designed for both Pre-Gamers and Post-Gamers.

## Features
- **Pre-Game Reviews:** Spoiler-free advice, ratings, and recommendations.
- **Post-Game Analysis:** Deep dives, ending explanations, and multi-dimensional scoring.
- **Community Engagement:** Comments, discussions, and user profiles.
- **Authentication:** Secure login via Auth.js / NextAuth.

## Tech Stack
- **Next.js 16** (App Router)
- **React 19**
- **Prisma** (PostgreSQL)
- **Auth.js** (v5)

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL instance (e.g., Supabase, local PostgreSQL)

### Installation

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables. Create a `.env` file in the root based on provided configuration. Required variables:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - Auth providers (if configured, e.g., `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`)
   - `AUTH_SECRET`

3. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Guidelines

- **Architecture:** Enforce strict separation of concerns among UI components, business logic, and data access.
- **Security:** Validate all inputs before processing. Never hardcode secrets. Implement safe error handling.
- **Code Quality:** Ensure descriptive naming, zero placeholders in code, and strict typing.

> **Note for AI Agents / Contributors:** Please refer to `context.md` for critical guidelines, including mandatory Test-Driven Development (TDD) and documentation practices. Always update the documentation as the architecture evolves!
