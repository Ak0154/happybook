# Happy Book - Frontend Web Application

Welcome to the **Happy Book** frontend repository! This document serves as a comprehensive guide for developers (especially backend engineers) integrating into the existing architecture.

## 🚀 Tech Stack & Framework

This application is built continuously on modern React primitives designed for high performance, smooth UX, and immediate feedback.
- **Framework:** Next.js 14 (App Router enabled)
- **Language:** TypeScript (`.tsx`)
- **Styling:** Tailwind CSS + Vanilla CSS Variables (in `styles/globals.css`)
- **Icons:** `lucide-react`
- **Theming:** `next-themes` mapping to manual `.dark` class attributes, animated using native DOM View Transitions.
- **UI Components:** heavily customized Radix UI/Shadcn primitives (Dialog, Progress, Avatar).

---

## 📂 Project Architecture

The current routing aligns strictly with the Next.js App Router paradigm (`app/` directory). Every route folder relies on `page.tsx` for rendering and `layout.tsx` for structure.

```bash
/app
 ├── layout.tsx         # Global Root Layout (Injects ThemeProvider, Font, and globals.css)
 ├── page.tsx           # Public Landing Page (Marketing, hero blobs, entry routing)
 ├── /login             # Native Authentication View (Currently mock localStorage token)
 ├── /signup            # Native Auth View with Term/Conditions checkbox modal
 └── /dashboard
      ├── layout.tsx    # Dashboard Sidebar logic (Navigation, Teams, Collapsible Layout globally)
      ├── template.tsx  # Intercepts internal Dashboard routing to enforce 1.3s visual loading spinners
      ├── page.tsx      # Core Dashboard / AI Tutor Chatbot Engine
      ├── /settings     # User profile and password configurations
      ├── /support      # Mock help ticketer
      ├── /subjects     # User's current subjects and course layout
      ├── /calendar     # Scheduling integration
      └── /flashcards & /summaries # Auxiliary generated saved materials
```

---

## 🔌 Backend Integration Guide

Currently, the application operates purely on the client side using **Mock APIs**, `setTimeout` delays, and `localStorage` to simulate database persistence.

To connect the backend, your friend will need to swap out the following pseudo-logic with real network calls (e.g., `fetch` or `axios` to your REST/GraphQL API).

### 1. Authentication (`app/login/page.tsx` & `app/signup/page.tsx`)
- **Current Behavior:** On submit, the app sets a 1-second timeout, saves `localStorage.setItem('auth_token', 'mock_token_123')`, and routes to `/dashboard`.
- **Integration Step:** Replace this mock timeout with a true stateless API request. On success, store the JWT token within an `HttpOnly` cookie or secure Context block instead of raw `localStorage`.

### 2. User State Management (`app/dashboard/layout.tsx`)
- **Current Behavior:** The Sidebar reads the user's name relying on global window `user-updated` events and `localStorage.getItem('happybook-user')`.
- **Integration Step:** Remove the `localStorage` hooks. Replace it natively with a backend `/api/user/me` call securely wrapped in a React Context Provider or a state management library (like Redux/Zustand or React Query).

### 3. AI Chatbot Engine (`app/dashboard/page.tsx`)
- **Current Behavior:** The `AiTutor` chat runs from a `setTimeout` hook returning raw Strings randomly picked from an array (`mockResponses`). The local `Typewriter` component streams these strings out artificially character by character to mimic ChatGPT.
- **Integration Step:** 
  1. Link the `handleSend` function to a backend WebSocket API or standardized Server-Sent Events (SSE) streaming endpoint.
  2. Map the incoming chunk payloads directly into the `Typewriter` state buffer instead of hardcoded strings.
  3. Swap the `saveMessages` mapping away from `localStorage.setItem("happybook_tutor_chat")` over to a MongoDB/Postgres `/api/history` database sync for retrieving chat history arrays.

### 4. Dashboard Overview Data (`app/dashboard/page.tsx -> DialogContent`)
- **Current Behavior:** The "My Dashboard Overview" button in the AI sidebar pulls up a Modal showing *Upcoming Assignments*, *Weekly Focus*, and *Streak Trackers*. Currently, these are rigidly hardcoded into the component DOM.
- **Integration Step:** Expose an API endpoint (e.g., `/api/dashboard/stats`) and render these `<Progress />` bars and due dates based strictly on the JSON layout returned.

---

## 🎨 Styling & Theming Core

### View Transitions (Light/Dark Mode)
The application uses state-of-the-art **DOM View Transitions API** linked to a Theme Toggler (`components/animate-ui/components/buttons/theme-toggler.tsx`).
- Variables for `--primary`, `--background`, etc., live in `styles/globals.css`.
- When shifting themes, NextThemes switches the `.dark` tag on the HTML root.
- Custom CSS keyframes in `globals.css` hijack this DOM shift, resulting in a sweeping **0.84-second `clip-path`** eclipse transition. 
- *Dark mode triggers Top-to-Bottom (`ttb`). Light mode triggers Bottom-to-Top (`btt`).*

---
Good luck! Let us know if you need specific components structured differently for data mapping!
