-- ==========================================
-- DEPARTMENTS
-- ==========================================
INSERT INTO departments (id, code, name, description, deleted, created_at, updated_at)
VALUES
(1, 'ENG', 'Engineering', 'Handles product development', FALSE, NOW(), NOW()),
(2, 'HR', 'Human Resources', 'Responsible for employee relations, hiring, and payroll', FALSE, NOW(), NOW()),
(3, 'MKT', 'Marketing', 'Manages branding, advertising, and customer engagement', FALSE, NOW(), NOW()),
(4, 'PM', 'Product Management', 'Oversees product planning, strategy, and feature delivery', FALSE, NOW(), NOW()),
(5, 'DES', 'Design', 'Focuses on UI/UX and product aesthetics', FALSE, NOW(), NOW());

-- ==========================================
-- EMPLOYEES
-- ==========================================

-- Top-level CEO
INSERT INTO employees (
    id, employee_number, first_name, last_name, email,
    join_date, status, contract_type, job_title, salary,
    department_id, manager_id, deleted, created_at, updated_at
) VALUES (
    1, 'EMP001', 'Alice', 'Johnson', 'alice.johnson@company.com',
    '2020-01-10', 'ACTIVE', 'FULL_TIME', 'Chief Executive Officer', 200000,
    4, NULL, FALSE, NOW(), NOW()
);

-- Engineering Team
INSERT INTO employees (
    id, employee_number, first_name, last_name, email,
    join_date, status, contract_type, job_title, salary,
    department_id, manager_id, deleted, created_at, updated_at
) VALUES
(2, 'EMP002', 'John', 'Doe', 'john.doe@company.com',
 '2021-03-15', 'ACTIVE', 'FULL_TIME', 'Software Engineer', 85000,
 1, 1, FALSE, NOW(), NOW()),
(3, 'EMP003', 'Sara', 'Williams', 'sara.williams@company.com',
 '2022-06-20', 'ACTIVE', 'FULL_TIME', 'Backend Developer', 78000,
 1, 2, FALSE, NOW(), NOW()),
(4, 'EMP004', 'David', 'Kim', 'david.kim@company.com',
 '2023-02-10', 'ON_LEAVE', 'FULL_TIME', 'Frontend Developer', 76000,
 1, 2, FALSE, NOW(), NOW());

-- Design Team
INSERT INTO employees (
    id, employee_number, first_name, last_name, email,
    join_date, status, contract_type, job_title, salary,
    department_id, manager_id, deleted, created_at, updated_at
) VALUES
(5, 'EMP005', 'Lily', 'Brown', 'lily.brown@company.com',
 '2021-08-05', 'ACTIVE', 'FULL_TIME', 'UI/UX Designer', 72000,
 5, 1, FALSE, NOW(), NOW()),
(6, 'EMP006', 'Mark', 'Lopez', 'mark.lopez@company.com',
 '2022-04-12', 'ACTIVE', 'CONTRACT', 'Graphic Designer', 65000,
 5, 5, FALSE, NOW(), NOW());

-- HR Team
INSERT INTO employees (
    id, employee_number, first_name, last_name, email,
    join_date, status, contract_type, job_title, salary,
    department_id, manager_id, deleted, created_at, updated_at
) VALUES
(7, 'EMP007', 'Emma', 'Watson', 'emma.watson@company.com',
 '2021-01-25', 'ACTIVE', 'FULL_TIME', 'HR Manager', 90000,
 2, 1, FALSE, NOW(), NOW()),
(8, 'EMP008', 'Tom', 'Evans', 'tom.evans@company.com',
 '2023-03-18', 'ACTIVE', 'INTERN', 'HR Intern', 30000,
 2, 7, FALSE, NOW(), NOW());

-- Marketing Team
INSERT INTO employees (
    id, employee_number, first_name, last_name, email,
    join_date, status, contract_type, job_title, salary,
    department_id, manager_id, deleted, created_at, updated_at
) VALUES
(9, 'EMP009', 'Sophia', 'Green', 'sophia.green@company.com',
 '2021-09-14', 'ACTIVE', 'FULL_TIME', 'Marketing Specialist', 70000,
 3, 1, FALSE, NOW(), NOW()),
(10, 'EMP010', 'James', 'White', 'james.white@company.com',
 '2024-01-12', 'ON_SITE', 'CONTRACT', 'Digital Marketing Associate', 65000,
 3, 9, FALSE, NOW(), NOW());

-- Product Management Team
INSERT INTO employees (
    id, employee_number, first_name, last_name, email,
    join_date, status, contract_type, job_title, salary,
    department_id, manager_id, deleted, created_at, updated_at
) VALUES
(11, 'EMP011', 'Olivia', 'Moore', 'olivia.moore@company.com',
 '2020-11-22', 'ACTIVE', 'FULL_TIME', 'Product Manager', 95000,
 4, 1, FALSE, NOW(), NOW()),
(12, 'EMP012', 'Lucas', 'Brown', 'lucas.brown@company.com',
 '2022-05-30', 'INACTIVE', 'PART_TIME', 'Associate Product Manager', 50000,
 4, 11, FALSE, NOW(), NOW());

-- Reset employee ID sequence to the next available value
SELECT setval('employees_id_seq', (SELECT MAX(id) FROM employees) + 1);
