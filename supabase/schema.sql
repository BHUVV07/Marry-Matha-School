-- ==============================================================================
-- MARY MATA ENGLISH SCHOOL — DIGITAL ECOSYSTEM DATABASE SCHEMA
-- PostgreSQL & Supabase Production Migration Script
-- Version: 2.0.0
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. ENUMS & DOMAINS
-- ------------------------------------------------------------------------------
CREATE TYPE app_role AS ENUM ('parent', 'student', 'teacher', 'admin', 'principal', 'accountant');
CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'excused');
CREATE TYPE homework_status AS ENUM ('Active', 'Completed', 'Graded');
CREATE TYPE submission_status AS ENUM ('Pending', 'Submitted', 'Reviewed');
CREATE TYPE invoice_status AS ENUM ('Paid', 'Partial', 'Overdue', 'Unpaid');
CREATE TYPE payment_method AS ENUM ('Cash', 'Cheque', 'Bank Transfer (NEFT/RTGS)', 'Demand Draft (DD)', 'UPI');
CREATE TYPE admission_stage AS ENUM ('New', 'Contacted', 'Document Review', 'Assessment & Interview', 'Approved', 'Enrolled', 'Rejected');
CREATE TYPE leave_status AS ENUM ('Pending', 'Approved', 'Rejected');

-- ------------------------------------------------------------------------------
-- 2. CORE USERS & PROFILES
-- ------------------------------------------------------------------------------
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role app_role NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, role)
);

-- ------------------------------------------------------------------------------
-- 3. ACADEMIC STRUCTURE (Years, Classes, Sections, Subjects)
-- ------------------------------------------------------------------------------
CREATE TABLE academic_years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE, -- e.g. "2026-2027"
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL, -- e.g. "Class 4"
    wing TEXT NOT NULL, -- "Pre-Primary", "Primary", "Middle School"
    display_order INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_name TEXT NOT NULL, -- "A", "B", etc.
    room_number TEXT NOT NULL,
    capacity INT DEFAULT 40,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (class_id, section_name, academic_year_id)
);

CREATE TABLE teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    employee_id TEXT UNIQUE NOT NULL, -- e.g. "MM-FAC-0108"
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL,
    designation TEXT NOT NULL,
    department TEXT NOT NULL,
    qualification TEXT NOT NULL,
    experience_years INT DEFAULT 0,
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Link class teacher to section
ALTER TABLE sections ADD COLUMN class_teacher_id UUID REFERENCES teachers(id) ON DELETE SET NULL;

-- ------------------------------------------------------------------------------
-- 4. STUDENTS & PARENTS
-- ------------------------------------------------------------------------------
CREATE TABLE parents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    father_name TEXT NOT NULL,
    mother_name TEXT NOT NULL,
    primary_email TEXT NOT NULL,
    primary_phone TEXT NOT NULL,
    secondary_phone TEXT,
    occupation TEXT,
    residential_address TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT 'Nagpur',
    postal_code TEXT NOT NULL DEFAULT '440015',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    admission_no TEXT UNIQUE NOT NULL,
    roll_no TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    full_name TEXT NOT NULL,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE RESTRICT,
    parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE RESTRICT,
    date_of_birth DATE NOT NULL,
    gender TEXT NOT NULL,
    blood_group TEXT NOT NULL,
    house TEXT NOT NULL, -- e.g. "St. Gabriel (Blue)"
    emergency_contact TEXT NOT NULL,
    bus_route TEXT,
    attendance_percentage NUMERIC(5,2) DEFAULT 100.00,
    status TEXT DEFAULT 'Active',
    enrolled_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. TIMETABLE & CLASS SCHEDULES
-- ------------------------------------------------------------------------------
CREATE TABLE class_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    day_of_week TEXT NOT NULL, -- "Monday", "Tuesday", etc.
    period_number INT NOT NULL, -- 1 to 7
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    subject TEXT NOT NULL,
    teacher_id UUID REFERENCES teachers(id) ON DELETE SET NULL,
    room_number TEXT NOT NULL,
    is_break BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. ATTENDANCE SYSTEM
-- ------------------------------------------------------------------------------
CREATE TABLE attendance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status attendance_status NOT NULL DEFAULT 'present',
    marked_by UUID REFERENCES teachers(id),
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (student_id, date)
);

-- ------------------------------------------------------------------------------
-- 7. HOMEWORK & SUBMISSIONS
-- ------------------------------------------------------------------------------
CREATE TABLE homework (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE RESTRICT,
    subject TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    assigned_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    attachment_url TEXT,
    status homework_status DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE homework_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    homework_id UUID NOT NULL REFERENCES homework(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    submission_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status submission_status DEFAULT 'Submitted',
    student_notes TEXT,
    attachment_url TEXT,
    marks_awarded NUMERIC(5,2),
    max_marks NUMERIC(5,2),
    teacher_feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (homework_id, student_id)
);

-- ------------------------------------------------------------------------------
-- 8. EXAMINATIONS & MARKS
-- ------------------------------------------------------------------------------
CREATE TABLE examinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academic_year_id UUID NOT NULL REFERENCES academic_years(id),
    title TEXT NOT NULL,
    term TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status TEXT DEFAULT 'Upcoming',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE exam_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    examination_id UUID NOT NULL REFERENCES examinations(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    exam_date DATE NOT NULL,
    time_slot TEXT NOT NULL,
    max_marks NUMERIC(5,2) NOT NULL DEFAULT 100,
    pass_marks NUMERIC(5,2) NOT NULL DEFAULT 35,
    syllabus_portion TEXT,
    room_number TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE exam_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    examination_id UUID NOT NULL REFERENCES examinations(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    marks_obtained NUMERIC(5,2) NOT NULL,
    max_marks NUMERIC(5,2) NOT NULL DEFAULT 100,
    grade TEXT NOT NULL,
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (examination_id, student_id, subject)
);

-- ------------------------------------------------------------------------------
-- 9. FEES & BILLING
-- ------------------------------------------------------------------------------
CREATE TABLE fee_structures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id),
    tuition_fee NUMERIC(10,2) NOT NULL,
    computer_lab_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
    library_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
    sports_annual_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
    activity_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
    total_annual_fee NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (class_id, academic_year_id)
);

CREATE TABLE fee_invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_no TEXT UNIQUE NOT NULL,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    term_title TEXT NOT NULL,
    total_amount NUMERIC(10,2) NOT NULL,
    paid_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    balance_due NUMERIC(10,2) NOT NULL,
    due_date DATE NOT NULL,
    status invoice_status NOT NULL DEFAULT 'Unpaid',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fee_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    receipt_no TEXT UNIQUE NOT NULL,
    invoice_id UUID NOT NULL REFERENCES fee_invoices(id) ON DELETE RESTRICT,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE RESTRICT,
    amount_paid NUMERIC(10,2) NOT NULL,
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_method payment_method NOT NULL,
    transaction_ref TEXT NOT NULL,
    cashier_name TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 10. ADMISSIONS & INQUIRIES
-- ------------------------------------------------------------------------------
CREATE TABLE admission_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_no TEXT UNIQUE NOT NULL,
    applicant_name TEXT NOT NULL,
    applied_class TEXT NOT NULL,
    parent_name TEXT NOT NULL,
    parent_phone TEXT NOT NULL,
    parent_email TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    previous_school TEXT,
    address TEXT NOT NULL,
    status admission_stage NOT NULL DEFAULT 'New',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 11. ANNOUNCEMENTS & LEAVE APPLICATIONS
-- ------------------------------------------------------------------------------
CREATE TABLE announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    target_audience TEXT[] NOT NULL DEFAULT '{"all"}',
    author TEXT NOT NULL,
    priority TEXT DEFAULT 'Normal',
    published_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE leave_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    leave_type TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days_count INT NOT NULL,
    reason TEXT NOT NULL,
    status leave_status DEFAULT 'Pending',
    reviewed_by UUID REFERENCES teachers(id),
    review_remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 12. ROW-LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_applications ENABLE ROW LEVEL SECURITY;

-- Helper function to check role in Supabase auth
CREATE OR REPLACE FUNCTION auth_has_role(r app_role) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid() AND role = r
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Users can read and update their own profile; Admins can read all
CREATE POLICY "Users view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id OR auth_has_role('admin') OR auth_has_role('principal'));

-- Students & Parents: Parents only read their own wards
CREATE POLICY "Parents read own wards" ON students
    FOR SELECT USING (
        parent_id IN (SELECT id FROM parents WHERE profile_id = auth.uid())
        OR auth_has_role('admin')
        OR auth_has_role('principal')
        OR auth_has_role('teacher')
        OR auth_has_role('accountant')
    );

-- Invoices: Parents only see their children's invoices
CREATE POLICY "Parents view own invoices" ON fee_invoices
    FOR SELECT USING (
        student_id IN (
            SELECT id FROM students WHERE parent_id IN (
                SELECT id FROM parents WHERE profile_id = auth.uid()
            )
        )
        OR auth_has_role('accountant')
        OR auth_has_role('admin')
        OR auth_has_role('principal')
    );

-- Payments: Accountants can insert payments
CREATE POLICY "Accountants manage payments" ON fee_payments
    FOR ALL USING (auth_has_role('accountant') OR auth_has_role('admin'));

-- Attendance: Teachers can insert & update attendance
CREATE POLICY "Teachers mark attendance" ON attendance_records
    FOR ALL USING (auth_has_role('teacher') OR auth_has_role('admin'));

