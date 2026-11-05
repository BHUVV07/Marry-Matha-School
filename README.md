# Mary Matha School — Digital Ecosystem

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-amber?style=flat-square)](#)

> **Official Public Website & Integrated School Management System** for **Mary Matha School, Ripponpet** (ಮೇರಿ ಮಾತಾ ಪ್ರೌಢಶಾಲೆ), an English-medium co-educational Day & Boarding institution established in 1999 under the Karnataka State Board (KSEAB).

---

## 🏛️ School Information (Verified Records)

* **School Name:** Mary Matha School (Mary Matha High School / Mary Matha Primary School)
* **Local Name (Kannada):** ಮೇರಿ ಮಾತಾ ಪ್ರೌಢಶಾಲೆ
* **Year of Establishment:** 1999 *(27+ years of educational service)*
* **School / UDISE Code:** `29150224207`
* **Affiliation & Curriculum:** Karnataka State Board (KSEAB) — English Medium
* **School Levels:** Primary & Secondary (High School)
* **Student Gender Type:** Co-educational (Boys & Girls)
* **Student-Teacher Ratio:** 15:1 *(Individualized student care & close mentoring)*
* **Campus Facilities:** 4 Core Academic Classrooms, Open Tree-Shaded Morning Assembly & Sports Ground, Boarding & Residential Facilities
* **School Type:** Co-ed Day & Boarding School
* **Management:** Private Unaided
* **Head of Institution / Principal:** Sister Gracelin
* **Campus Address:** Barve, Thirthahalli Road, Ripponpet, Shimoga - 577426, Karnataka, India

---

## 🚀 Key Modules & Ecosystem Architecture

The application is structured into two seamlessly integrated sections:

### 1. Public-Facing School Website
* **Home Page (`/`)**: Hero section featuring authentic campus imagery, introduction, key statistics (Est. 1999, UDISE: 29150224207, 15:1 ratio), curriculum wings preview, facilities, activities, testimonials, and contact overview.
* **About Page (`/about`)**: Institutional history, Sister Gracelin's welcome address, core values, leadership team, and campus culture.
* **Academics (`/academics`)**: Karnataka State Board (KSEAB) curriculum, primary & secondary wings, academic schedule, grading system, and assessment methodology.
* **Facilities (`/facilities`)**: 4 Core Academic Classrooms, Open Assembly & Sports Grounds, Boarding & Residential facilities, Science labs, and Library with category filtering and interactive modals.
* **Faculty (`/faculty`)**: Searchable and department-filtered directory of faculty members.
* **Gallery (`/gallery`)**: High-resolution gallery with category tabs and lightbox modal, featuring real campus assembly, building, and classroom photos.
* **Events (`/events`)**: School calendar, upcoming celebrations, academic milestones, and event detail modals.
* **Admissions (`/admissions`)**: Multi-step interactive admission enquiry form with instant validation, step-by-step guidance, document checklist, and FAQs.
* **Contact (`/contact`)**: Official office hours, Sister Gracelin's desk details, phone/email directory, interactive embedded Google Maps locator for Barve, Ripponpet, and direct message transmission.

### 2. School Management System Portals
A centralized, reactive role-based management suite powered by `PortalDataContext`:

1. **Parent Portal (`/parent`)**: Monitor enrolled wards (Rohan & Ananya Patel), view real-time daily attendance, timetable, homework, fee invoices, fee receipts, examination report cards, and submit leave applications.
2. **Student Portal (`/student`)**: Timetable, subject assignments, exam schedule, published marks, and learning resources for enrolled learners.
3. **Teacher / Faculty Portal (`/teacher`)**: Class register attendance marking (with instant real-time sync across parent and admin dashboards), homework assignment dispatch, examination marks entry, and student directories.
4. **Admin Portal (`/admin`)**: Institutional management suite with student directory, student admissions pipeline, class/section assignments, teacher directory, fee structure management, system audit, and institutional settings.
5. **Principal Desk (`/principal`)**: Executive leadership dashboard tracking institutional KPIs, overall student attendance rates, fee collection velocity, faculty roster, and official school announcements.
6. **Accountant Portal (`/accountant`)**: Student fee ledgers, offline fee payment recording, fee status tracking, and printable fee receipts.

---

## 🔐 Demonstration Credentials & Test Accounts

You can log in at [`/login`](http://localhost:3000/login) using either the **One-Click Quick Role Switcher** cards or by typing the credentials below:

> **Universal Demo Password:** `demo123`

| Role | Portal Route | Demo Email | Password | Persona & Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Parent** | [`/parent`](http://localhost:3000/parent) | `parent@marymata.edu` | `demo123` | **Mr. Vikram Patel** (Father of Rohan Patel, Class 4-A & Ananya Patel, Grade 1) |
| **Student** | [`/student`](http://localhost:3000/student) | `student@marymata.edu` | `demo123` | **Rohan Patel** (Class 4-A, Roll #12, St. Gabriel House) |
| **Class Teacher** | [`/teacher`](http://localhost:3000/teacher) | `classteacher@marymata.edu` | `demo123` | **Mrs. Sunita Sharma** (Class Teacher 4-A & Senior Mathematics Faculty) |
| **Subject Teacher** | [`/teacher`](http://localhost:3000/teacher) | `teacher@marymata.edu` | `demo123` | **Mr. Rajesh Verma** (Physical Science & ICT Faculty) |
| **Admin** | [`/admin`](http://localhost:3000/admin) | `admin@marymata.edu` | `demo123` | **Sister Agnes D'Souza** (Administrative Director) |
| **Principal** | [`/principal`](http://localhost:3000/principal) | `principal@marymata.edu` | `demo123` | **Rev. Fr. Mathew Thomas / Sister Gracelin** (Head of Institution) |
| **Accountant** | [`/accountant`](http://localhost:3000/accountant) | `accountant@marymata.edu` | `demo123` | **Mr. John Fernandes** (Bursar & Chief Accounts Officer) |
| **Super Admin** | [`/admin`](http://localhost:3000/admin) | `superadmin@marymata.edu` | `demo123` | **Dr. Anthony Rao** (CTO & IT Infrastructure Governance) |

---

## ⚡ Interactive POC Workflows

The management portals are connected through a shared data layer (`PortalDataContext`) enabling full end-to-end simulation:

* **Workflow 1: Attendance Marking & Parent Sync**
  1. Log into `/teacher` as Mrs. Sunita Sharma.
  2. Select Class 4-A in **Attendance Register**.
  3. Toggle Rohan Patel or any student to *Present / Absent / Late* and save.
  4. Log into `/parent`: Rohan's attendance card updates immediately, and attendance percentage recalculates in real-time.
  5. Log into `/admin`: Institutional attendance metrics reflect the update.

* **Workflow 2: Student Admission & Parent Association**
  1. Log into `/admin` and navigate to **Student Management** (`/admin/students`).
  2. Register a new student and associate them with a class (e.g. Class 4-A) and guardian.
  3. The record is instantly added to the teacher's class register and the parent's ward list.

* **Workflow 3: Fee Invoicing & Payment Collection**
  1. Log into `/accountant` to view unpaid fee ledgers across classes.
  2. Record a fee payment (Cash, UPI, or Demand Draft).
  3. Generate and preview an official fee receipt with receipt number and date.
  4. The parent portal (`/parent/fees`) reflects the cleared balance and displays the receipt for download.

* **Workflow 4: Homework & Exam Marks Publishing**
  1. Teacher posts an assignment or grades a term exam under `/teacher/marks`.
  2. The student (`/student/homework`, `/student/results`) and parent (`/parent/homework`, `/parent/results`) immediately view the published scores and teacher feedback.

---

## 🛠️ Technology Stack

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router, React Server Components & Client Components)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict type-safety across all 75 routes)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) with school custom palette (School Blue `#0f2d59`, Sky Blue `#0284c7`, Warm Amber `#f59e0b`)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Animations & Effects:** [Framer Motion](https://www.framer.com/motion/) & [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
* **Database & Production Backend Readiness:** Ready for PostgreSQL and Supabase. Complete SQL schema is included in `supabase/schema.sql`.

---

## 📦 Getting Started (Local Development)

### 1. Prerequisites
* Node.js 18.18+ or Node.js 20+
* npm, pnpm, or yarn

### 2. Clone the Repository
```bash
git clone https://github.com/BHUVV07/Marry-Matha-School.git
cd Marry-Matha-School
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Start
```bash
npm run build
npm run start
```

---

## 📁 Repository Structure

```
.
├── public/
│   └── images/
│       └── school/
│           ├── campus-building.jpg     # Authentic building & Sister Gracelin
│           ├── morning-assembly.jpg    # Authentic outdoor morning pledge
│           └── classroom-teaching.jpg  # Authentic classroom instruction
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Public Homepage
│   │   ├── about/                      # About School & Principal Desk
│   │   ├── academics/                  # KSEAB Board & Curriculum
│   │   ├── facilities/                 # 4 Classrooms, Grounds & Boarding
│   │   ├── faculty/                    # Staff Directory & Filters
│   │   ├── gallery/                    # Authentic Photo Lightbox Gallery
│   │   ├── events/                     # Events & Annual Calendar
│   │   ├── admissions/                 # Enrolment Process & Online Form
│   │   ├── contact/                    # Address, Sister Gracelin & Google Map
│   │   ├── login/                      # Multi-role Demo Authentication
│   │   ├── parent/                     # Parent Portal (Attendance, Fees, etc.)
│   │   ├── student/                    # Student Portal (Timetable, Homework)
│   │   ├── teacher/                    # Teacher Portal (Register, Marks)
│   │   ├── admin/                      # Administration Suite & Master Controls
│   │   ├── principal/                  # Executive Principal Dashboard
│   │   ├── accountant/                 # Bursar, Fee Collection & Receipts
│   │   ├── sitemap.ts                  # SEO Sitemap
│   │   └── robots.ts                   # Robots Rules
│   ├── components/
│   │   ├── common/                     # Reusable UI components & Badges
│   │   ├── home/                       # Hero, Intro, Why Choose Us, etc.
│   │   ├── layout/                     # Navbar, Portal Topbar, Sidebar, Footer
│   │   └── portals/                    # Shared Portal UI widgets
│   ├── config/
│   │   ├── schoolInfo.ts               # Verified institutional metadata
│   │   └── navigation.ts               # Public & portal route definitions
│   ├── context/
│   │   ├── AuthContext.tsx             # Demo session & role state
│   │   └── PortalDataContext.tsx       # Centralized reactive POC data store
│   ├── data/                           # Mock institutional datasets
│   └── lib/
│       ├── types.ts                    # Public website TypeScript types
│       ├── portalTypes.ts              # Management portals TypeScript types
│       └── utils.ts                    # Styling & format utilities
├── supabase/
│   └── schema.sql                      # Production PostgreSQL / Supabase schema
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 📜 Database Schema (Supabase / PostgreSQL)

For production deployment with Supabase, run the SQL script located at [`supabase/schema.sql`](./supabase/schema.sql) which sets up:
* `profiles` (Row-level security enabled users with roles)
* `students`, `parents`, `classes`, and `sections`
* `attendance_records` (daily session registers)
* `timetables` and `periods`
* `homework_assignments` and `homework_submissions`
* `fee_structures`, `student_fees`, and `fee_payments`
* `examinations` and `student_marks`
* `leave_applications`
* `announcements` and `events`

---

## 📄 License & Attribution

* **Institution:** Mary Matha School, Ripponpet, Shimoga - 577426, Karnataka.
* **UDISE Code:** 29150224207
* **All Rights Reserved.** Built for the Mary Matha School Digital Ecosystem.
