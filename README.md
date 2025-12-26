# Realtime Patient Form (Next.js + Supabase)

A small realtime web application built with **Next.js (App Router)** and **Supabase**.  
The system allows patients to input personal information while staff can monitor updates in near real-time.

This project was created as part of a Front-end Developer assignment, with a focus on **realtime data synchronization**, **clear UI structure**, and **maintainable component architecture**.

---

## 🌐 Live Demo

- **Deployed App:** <https://realtimeforms.netlify.app/>
- **Repository:** <https://github.com/PanupongPromklum/realtime-form>

---

## 🧩 Project Overview

The application consists of two main parts:

1. **Patient Form**
   - Patients enter personal details through a responsive form.
   - Data is saved to Supabase in real time while typing.
   - Form validation is applied before submission.

2. **Staff Dashboard**
   - Staff can view patient data in near real-time.
   - Patient status is clearly displayed (e.g. active, inactive, submitted).
   - UI is optimized for monitoring rather than editing.

---

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Database & Realtime:** Supabase
- **Styling:** Tailwind CSS
- **Deployment:** Vercel (recommended)

---

## Requirements

- Node.js 18+ (recommended)
- npm, pnpm or yarn
- A Supabase project (for database + realtime)

## Setup

1. Install dependencies:

```bash
npm install
```
2. Supabase Project Setup:
- Go to https://supabase.com and create a new project
- After the project is created
- Navigate to Project API
- Copy the `Project URL` and `Publishable API Key` for `.env.local`
- Create a table name `patients` for storing data 
- Enable Realtime for the table 

3. Create a `.env.local` file in the project root and add the required Supabase environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

These are used in lib/supabase.ts.

4. Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 to view the app.


## Bonus Features Implemented

- Realtime updates: Staff dashboard reacts to new form submissions via Supabase Realtime.
- Staff dashboard: separate UI for staff to review submissions.
- Client-side form validation using `utils/validation.ts`.
- Accessible UI primitives: `components/ui/*` (Input, Button, Label, Toast, etc.).


## Next steps

- Configure your Supabase DB schema and enable Realtime on relevant tables.
- (Optional) Add authentication to protect the staff dashboard.