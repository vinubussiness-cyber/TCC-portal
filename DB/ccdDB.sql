create database tcc_employee_portal;

use tcc_employee_portal;

create table users(
	id int auto_increment primary key,
    name varchar(100) not null,
    username varchar(50) unique not null,
    email varchar(150) unique not null,
    password VARCHAR(30) not null,
    role ENUM('admin','employee') DEFAULT 'employee',
    department VARCHAR(100),
    designation VARCHAR(100),
    status ENUM ('active','inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

alter table users add column username varchar(50) null after name;

CREATE TABLE attendence(
	id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    login_time DATETIME,
    logout_time DATETIME,
    working_hours DECIMAL(5,2),
    attendence_date DATE,
    FOREIGN KEY (employee_id) REFERENCES users(id)
);


CREATE TABLE tasks(
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(250),
    description TEXT,
	assigned_by INT,
    assigned_to INT,
    priority ENUM('Low','Medium','High') DEFAULT 'Medium',
    due_date DATE,
	status ENUM('Pending','In Progress','Completed') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (assigned_by) REFERENCES users(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id)
);
alter table tasks 
add column assigned_to int,
add column status ENUM('Pending','In Progress','Completed') DEFAULT 'Pending',
rename column deadline to due_date;


CREATE TABLE task_assignments(
	id INT AUTO_INCREMENT PRIMARY KEY,
	task_id INT,
    employee_id INT,
    status ENUM ('Pending','In Progress','Completed') DEFAULT 'Pending',
    progress INT DEFAULT 0,
    remarks TEXT,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
	FOREIGN KEY (employee_id) REFERENCES users(id)
);

CREATE TABLE daily_reports(
	id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    work_done TEXT,
    hours_worked DECIMAL (4,2),
    challenges TEXT,
    tomorrow_plan TEXT,
    report_date DATE,
    FOREIGN KEY (employee_id) REFERENCES USERS(id)
);


CREATE TABLE leaves_table(
	id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    leave_type ENUM ('Casual','Sick','WFH','Half Day'),
    reason TEXT,
    start_date DATE,
    end_date DATE,
    status ENUM('Pending','Approved','Rejected') DEFAULT 'Pending',
    FOREIGN KEY (employee_id) REFERENCES USERS(id)
);

CREATE TABLE notifications (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(250),
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE work_updates (

    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    task_title VARCHAR(255),
	update_details TEXT,
    status ENUM(
        'In Progress',
        'Completed',
        'Blocked'
    ) DEFAULT 'In Progress',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(employee_id)
    REFERENCES users(id)

);

rename table attendence to attendance;
show tables;

INSERT INTO users (name,email,password,role)
values('Admin','123@gmail.com','12345','Admin'),('nik','nik@gmail.com','123456','employee'),('john','john@gmail.com','12345','employee');
INSERT INTO users (name,email,password,role) value ('john','john@gmail.com','12345','employee');
delete from users;

alter table attendance
rename column attendence_date to attendance_date;
alter table daily_reports
rename column work_done to task_completed;

select * from attendance;
select * from users;
select * from daily_reports;
select * from leaves_table;

select * from tasks;

select * from users;

describe attendance;



INSERT INTO users (name,email,password,role)
values('Joshua','Joshua', 'TCC2026Joshua','employee'),
('Sundar','Sundar', 'TCC2026Sundar','employee'),
('Lokesh','Lokesh', 'TCC2026Lokesh','employee'),
('Dhanesh','Dhanesh', 'TCC2026Dhanesh','employee');


UPDATE users
SET username = CONCAT(
	UPPER(LEFT(REPLACE(name, ' ',''),1)),
	SUBSTRING(REPLACE(name,'',' '),2)
)
WHERE username IS NULL;

-- modify to take username in table 
alter table users 
modify username varchar(50) not null,
add unique(username)

