# Project Context: Game Review Vault

## Overview
Game Review Vault is a comprehensive game review platform catering to "Pre-Gamers" (seeking spoiler-free reviews) and "Post-Gamers" (seeking deep-dive analyses and community discussions).

## Tech Stack
- **Framework:** Next.js 16.1.6 (App Router)
- **UI Library:** React 19
- **Database:** PostgreSQL with Prisma ORM (v5.22)
- **Authentication:** Auth.js (NextAuth v5 beta) with Prisma Adapter
- **Styling:** Tailwind CSS (assumed based on standard Next.js setups)

## Architecture & Data Models
- **User/Auth:** Managed via `User`, `Account`, `Session`, `VerificationToken`.
- **Game:** The core entity containing metadata (title, genre, release date) and pre-game content (storyline, recommendations).
- **PostReview:** Contains detailed, multi-dimensional scoring (story, graphics, gameplay, quality) for post-game analysis.
- **Article & Comment:** Content management system for deep-dives and user community engagement.

## AI Agent Instructions (CRITICAL)
1. **Test-Driven Approach:** Future AI agents MUST use a Test-Driven Approach (TDD) when writing or modifying code. This is to reduce errors and ensure high reliability. Write or update tests before implementing feature logic.
2. **Documentation Maintenance:** Always add to and update `README.md` and/or `context.md` as needed whenever architectural changes, new environment variables, or significant features are added.
3. **User Guidelines:** Strictly adhere to the separation of concerns, SOLID principles, zero-trust security (validate inputs), and descriptive naming as outlined in user memory. No placeholder code.
