# Decormart Studio — Internal Business Platform

## 1. Product Vision
A custom internal business-management platform for an interior design and execution company. This platform serves as a complete internal operating system, bringing multiple business operations—from lead generation to final site handover—into one unified system.

## 2. Business Workflow
The core workflow this platform supports is:
NEW LEAD → LEAD FOLLOW-UP → SITE VISIT → PROJECT CREATED → PROJECT MANAGER ASSIGNED → DESIGNER ASSIGNED → DESIGN CREATED → CLIENT REVIEWS DESIGN → CLIENT APPROVES / REQUESTS CHANGES → MATERIALS SELECTED → MATERIALS ORDERED → SITE EXECUTION → DAILY SITE UPDATES → PAYMENTS → SNAGS / ISSUES → FINAL HANDOVER → PROJECT COMPLETED

## 3. User Roles & Responsibilities
The platform supports six main employee roles via a single unified application with role-based access:
* **Admin / Owner**: Visibility into the entire company (projects, revenue, team workload, project health, delays).
* **Designer**: Responsible for rooms, designs, versions, moodboards, client feedback, and approvals.
* **Project Manager**: Responsible for timelines, tasks, employee assignments, progress, client coordination, and deadlines.
* **Site Manager**: Responsible for daily updates, site photos/videos, labour, material arrivals, and snagging.
* **Accounts**: Responsible for BOQ, invoices, expenses, vendor payments, and profitability.
* **Sales**: Responsible for new enquiries, follow-ups, and lead conversion.

## 4. Planned Modules
* **Authentication**: Login, session management, role-based access.
* **Command Center**: High-level dashboard, notifications, and project health.
* **CRM / Leads**: Lead tracking and conversion.
* **Project Management**: Detailed project details, timelines, team, and budget.
* **Design Studio & Client Approval**: 3D designs, versions, client feedback, and approval flow.
* **Site Management**: Daily site updates, labour, and progress tracking.
* **Materials / Procurement**: POs, material status, and suppliers.
* **Finance**: Invoices, payments, and BOQ.
* **Team & Vendors**: Employee workload, vendor profiles, and orders.
* **Documents & Communication**: Project chat, design files, and contracts.
* **Analytics**: Business insights.

## 5. Technical Stack
* **Frontend Framework**: React 18+
* **Language**: TypeScript
* **Build Tool**: Vite
* **Styling**: Tailwind CSS v4
* **Routing**: React Router v7
* **Icons**: Lucide React
* **Utility Libraries**: `clsx`, `tailwind-merge`

## 6. Folder Architecture
The codebase is structured to keep UI, logic, and data models separate:
```
/src
  /assets         # Static images, fonts, etc.
  /components     # Reusable UI components
    /ui           # Base design system components (buttons, inputs)
  /layouts        # Layout components (MainLayout, AuthLayout)
  /pages          # Full page views (Dashboard, Projects)
  /lib            # Utility functions (cn, etc.)
  /types          # TypeScript interfaces/types for data models
```

## 7. Design System
The visual direction is **Dark Luxury**. The UI is premium, architectural, sophisticated, and calm.
Tokens are centralized in `src/index.css` via Tailwind v4 `@theme` configuration:
* **Primary background**: `#111111`
* **Sidebar**: `#0B0B0B`
* **Surface**: `#181818`
* **Elevated surface**: `#222222`
* **Border**: `#2D2D2D`
* **Primary text**: `#F2EFE9`
* **Secondary text**: `#A8A39A`
* **Muted text**: `#77736C`
* **Primary accent**: `#B59A72`
* **Accent hover**: `#C4AA82`

Typography primarily uses Inter or Geist. Icons are from Lucide React.

## 8. Routing Strategy
Routing is handled by React Router with a centralized layout structure.
Currently scaffolded routes (Placeholders):
* `/login` (Auth)
* `/dashboard` (Command Center)
* `/projects`, `/projects/:id` (Project Management)
* `/leads` (CRM)
* `/design-studio` (Design Studio)
* `/site-management` (Site Management)
* `/materials` (Procurement)
* `/finance` (Finance)

## 9. Data Architecture & Future Backend Strategy
We use TypeScript interfaces to strictly type all future API responses and entities.
During development, mock data will be decoupled from components and stored cleanly.
The architecture is designed so a real backend (e.g., Supabase, Firebase, or a custom REST/GraphQL API) can be plugged in without requiring UI rewrites. Real authentication and security are deferred to later phases.

## 10. Development Phases
* **Phase 0**: Project initialization and architecture (Current)
* **Phase 1**: Design system + authentication + application shell
* **Phase 2**: Admin Command Center
* **Phase 3-10**: Core Modules (Leads, Projects, Design Studio, Site, Materials, Finance, Team, Documents)
* **Phase 11**: Role-specific dashboards + permissions
* **Phase 12**: Backend + database integration
* **Phase 13-15**: Integrations, Testing, Deployment

## Current Scope
Phase 0 is complete. The workspace is initialized cleanly without unnecessary dependencies. The architecture is ready for Phase 1. Do not proceed to subsequent modules without explicit instruction.
