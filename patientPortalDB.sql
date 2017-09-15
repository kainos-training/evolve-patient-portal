DROP DATABASE IF EXISTS patientPortal;

CREATE DATABASE IF NOT EXISTS patientPortal;

USE patientPortal;

CREATE TABLE IF NOT EXISTS GP (
    gpID int auto_increment not null,
    gpFullName varchar(150) not null,
    gpPracticeName varchar(150) not null,
    gpPracticeAddress varchar(300) not null,
    primary key (gpID)
);

CREATE TABLE IF NOT EXISTS `User` (
    userID int auto_increment not null unique, 
    username varchar(100) not null unique,
    `password` varchar(256) not null,
    dateOfBirth date not null,
    gender enum('Male', 'Female') not null,
    MRIN char(9) not null,
    firstName varchar(60) not null,
    lastName varchar(60) not null,
    phoneNumber varchar(20) not null,
    title enum('Mr', 'Mrs', 'Miss', 'Ms', 'Dr') not null,
    address varchar(150) not null,
    email varchar(100) not null,
    deceased enum('Yes', 'No') default 'No',
    dateOfDeath datetime,
    gpID int,
    active bool default false,
    foreign key (gpID) references GP(gpID),
    primary key (userID)
);

CREATE TABLE IF NOT EXISTS `Condition`(
    conditionID int auto_increment not null,
    conditionName varchar(60) not null,
    conditionLink varchar(256) not null,
    primary key (conditionID)
);

CREATE TABLE IF NOT EXISTS UserCondition(
    userConditionID int auto_increment not null,
    userID int not null,
    conditionID int not null,
    startDate date not null,
    endDate date,
    primary key (userConditionID),
    foreign key (userID) references `User`(userID),
    foreign key (conditionID) references `Condition`(conditionID)
);

CREATE TABLE IF NOT EXISTS MedicationType (
    medicationTypeID int auto_increment not null,
    medicationType varchar(20),
    primary key (medicationTypeID)
);

CREATE TABLE IF NOT EXISTS Medication (
    medicationID int auto_increment not null,
    medicationName varchar(60) not null,
    medicationTypeID int not null,
    resourceURL varchar(200),
    primary key (medicationID),
    foreign key (medicationTypeID) references MedicationType (medicationTypeID)
);

CREATE TABLE IF NOT EXISTS Task (
    taskID int auto_increment not null,
    taskName varchar(60) not null,
    userID int not null,
    taskSummary varchar(100) not null,
    recievedDate datetime not null,
    dueDate datetime not null,
    primary key (taskID),
    foreign key (userID) references User (userID)
);

CREATE TABLE IF NOT EXISTS TaskQuestionnaire (
    questionnaireID int auto_increment not null,
    taskID int not null,
    answer varchar(5000) not null,
    answered bool not null,
    dateSubmitted datetime not null,
    primary key (questionnaireID),
    foreign key (taskID) references Task (taskID)
);

CREATE TABLE IF NOT EXISTS MedicationUser (
	medicationUserID int auto_increment not null,
	userID int not null, 
	medicationID int not null,
	startDate date not null,
	endDate date,
	dosage varchar(60) not null,
	instructions varchar(60) not null,
	prescribedDate date not null,
	repeated bool not null,
	primary key (medicationUserID),
	foreign key (userID) references `User` (userID),
	foreign key (medicationID) references Medication (medicationID)
);

CREATE TABLE IF NOT EXISTS MedicationUserComment (
    medicationUserCommentID int auto_increment not null, 
    medicationUserID int not null,
    commentText text not null,
    `timeStamp` timeStamp not null,
    deleted boolean default false not null,
    primary key (medicationUserCommentID),
    foreign key (medicationUserID) references MedicationUser (medicationUserID)
);

CREATE TABLE IF NOT EXISTS Clinician (
    clinicianID int auto_increment not null,
    title enum('Mr', 'Mrs', 'Miss', 'Ms', 'Dr'),
    firstName varchar(60) not null,
    lastName varchar(60) not null,
    jobTitle varchar(30) not null,
    email varchar(100) not null,
    primary key (clinicianID)
);

CREATE TABLE IF NOT EXISTS UserClinician (
    userClinicianID int auto_increment not null,
    userID int not null,
    clinicianID int not null,
    primary key (userClinicianID),
    foreign key (userID) references `User` (userID),
    foreign key (clinicianID) references Clinician(clinicianID)
);

CREATE TABLE IF NOT EXISTS Location (
    locationID int not null auto_increment,
    locationAddress varchar(200) not null,
    primary key (locationID)
);

CREATE TABLE IF NOT EXISTS Department (
    departmentID int not null auto_increment,
    departmentName varchar(200) not null,
    primary key (departmentID)
);

CREATE TABLE IF NOT EXISTS LocationDepartment (
    locationDepartmentID int auto_increment not null,
    locationID int not null,
    departmentID int not null,
    primary key (locationDepartmentID),
    foreign key (locationID) references Location (locationID),
    foreign key (departmentID) references Department (departmentID)
);

CREATE TABLE IF NOT EXISTS AppointmentType(
    appointmentTypeID int auto_increment not null,
    `type` varchar(60) not null,
    primary key (appointmentTypeID)
);

CREATE TABLE IF NOT EXISTS Appointment(
    appointmentID int auto_increment not null,
    userID int not null,
    locationDepartmentID int not null,
    clinicianID int not null,
    dateOfAppointment datetime not null,
    `comment` text,
    appointmentTypeID int not null,
    primary key (appointmentID),
    foreign key (userID) references User(userID),
    foreign key (locationDepartmentID) references LocationDepartment(locationDepartmentID),
    foreign key (clinicianID) references Clinician(clinicianID),
    foreign key (appointmentTypeID) references AppointmentType (appointmentTypeID)
);

CREATE TABLE IF NOT EXISTS UserDependant(
    userID int not null,
    dependantID int not null,
    primary key(userID, dependantID),
    foreign key (userID) references User(userID),
    foreign key (dependantID) references User(userID)
);

CREATE TABLE IF NOT EXISTS UserSideEffect(
	userSideEffectID int auto_increment not null,
	userID int not null,
	sideEffectText text not null,
	`timeStamp` timeStamp not null DEFAULT CURRENT_TIMESTAMP,
	deleted boolean not null,
	primary key(userSideEffectID),
	foreign key (userID) references User(userID)
);

CREATE TABLE IF NOT EXISTS AppointmentQuery (
	appointmentQueryID int auto_increment not null,
	appointmentID int not null,
	clinicianID int not null,
	querySubject varchar(100) not null,
	queryText varchar(350) not null,
	primary key (appointmentQueryID),
	foreign key (appointmentID) references Appointment(appointmentID),
	foreign key (clinicianID) references Clinician(clinicianID)
);

INSERT INTO GP (gpFullName, gpPracticeName, gpPracticeAddress)
VALUES ('Dr. A Cheyne', 'Ormeau Park Surgery', '281 Ormeau Rd, Belfast BT7 3GG, UK'),
('Dr. E Glass', 'The Surgery', '1 Church St, Newtownards BT23 4FH'),
('Dr. R Kane', 'Springvale Medical Practice', '463 Springfield Rd, Belfast BT12 7DP, UK');

INSERT INTO `User` (username, `password`, dateOfBirth, gender, MRIN, firstName, lastName, phoneNumber, title, address, email, deceased, gpID, active)
VALUES ('jsmith', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee', '1960-01-01', 'Female', '123456789', 'Jane', 'Smith', '07712345678', 'Mrs', '32 Orby Walk, Belfast', 'a.weir@kainos.com', 'No', 1, true),
('smurray', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee', '1997-08-08', 'Female', '123456890', 'Shannon', 'Murray', '07912345678', 'Mrs', '23 Grace Avenue, Belfast', 's.dorrian@kainos.com', 'No', 2, true),
('asmith', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee', '2005-03-01', 'Male', '123458289', 'Andrew', 'Smith', '07856748927', 'Mr', '32 Orby Walk, Belfast', 's.dorrian@kainos.com', 'No', 1, false),
('ksmith', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee', '2012-03-01', 'Female', '803409789', 'Kate', 'Smith', '07856799927', 'Miss', '32 Orby Walk, Belfast', 's.dorrian@kainos.com', 'No', 1, false),
('csmith', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee', '2005-03-01', 'Female', '803409789', 'Chloe', 'Smith', '07856799927', 'Ms', '32 Orby Walk, Belfast', 's.dorrian@kainos.com', 'No', 1, false),
('jdaniels', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee',  '1989-11-09', 'Male', '098765432', 'Jack', 'Daniels', '07745678921', 'Mr', '91 Bangor Road, Newtownards',  's.dorrian@kainos.com', 'No', 3, true),
('ajackson', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee',  '1995-12-25', 'Male', '543028796', 'Andrew', 'Jackson', '07899137817', 'Dr', '66 Church Street, Antrim',  's.dorrian@kainos.com', 'No', 3, true),
('bsmith', '$2a$10$YqV/YtnOUd62xFSai8gRseO4nU5otTdyDTD7yWwaVquZfo02O2Uee',  '1928-08-04', 'Male', '065756297', 'Bill', 'Smith', '07767584930', 'Mr', '33 Orby Walk, Belfast',  's.dorrian@kainos.com', 'No', 1, false);

INSERT INTO UserDependant (userID, dependantID)
VALUES(1, 3), (1, 4), (1, 8);

INSERT INTO MedicationType(medicationType)
VALUES ('Antibiotics'), ('Mood Stabilizers'), ('Analgesics'), ('Antipyretics');

INSERT INTO Medication(medicationName, medicationTypeID, resourceURL)
VALUES('Penicillin', 1, 'https://en.wikipedia.org/wiki/Penicillin'),
('Amoxicillin', 1, 'https://en.wikipedia.org/wiki/Amoxicillin'),
('Lithium', 2, 'https://en.wikipedia.org/wiki/Lithium_(medication)'),
('Olanzapine', 2, 'https://en.wikipedia.org/wiki/Olanzapine'),
('Paracetamol', 3, 'https://en.wikipedia.org/wiki/Paracetamol'),
('Morphine', 3, 'https://en.wikipedia.org/wiki/Morphine'),
('Ibuprofen', 4, 'https://en.wikipedia.org/wiki/Ibuprofen'),
('Ketoprofen', 4, 'https://en.wikipedia.org/wiki/Ketoprofen'),
('Xylometazoline', 1, 'https://en.wikipedia.org/wiki/Xylometazoline');

INSERT INTO MedicationUser(userID, medicationID, startDate, endDate, dosage, instructions,prescribedDate,repeated)
VALUES (1, 3, '2017-06-01', '2019-08-10', '10mg', 'Take one tablet twice a day, after meals','2017-09-01',TRUE),
(1, 3, '2016-06-01', '2017-06-01', '5mg', 'Take two tablets twice a day', '2017-09-01',TRUE),
(1, 3, '2015-06-01', '2016-06-01', '20mg', 'Take two tablets twice a day', '2017-04-01',TRUE),
(1, 4, '2016-06-01', '2019-08-10', '5mg', 'Take two tablets twice a day','2016-04-01',TRUE),
(2, 1, '2017-02-09', '2019-02-27', '15mg', 'Take one tablet twice a day','2017-09-01',FALSE), 
(3, 2, '2016-09-29', '2018-10-10', '10mg', 'Take one tablet twice a day','2017-09-01',TRUE);

INSERT INTO MedicationUserComment(medicationUserID, commentText, deleted)
VALUES (1, 'Not feeling the benefit after two weeks', false), (2, 'Helping to minimise pain but still exists', false),
(3, 'Not helping with pain, possibly need stronger medication', false), (4, 'Feeling better mentally', false), 
(5, 'Hearing not improving', false),
(6, 'Ear pain easing', false), 
(6, 'Eye pain gone', true);

INSERT INTO Clinician (title, firstName, lastName, jobTitle, email)
VALUES ('Dr', 'Alex', 'Hyndman', 'Consultant', 'a.weir@kainos.com'), 
('Dr', 'John', 'Adams', 'Oncologist', 'j.adams@hospital.com'), 
('Dr', 'Karen', 'Reid', 'Obstetrician', 'k.reid@hospital.com'),
('Dr', 'Sally', 'Jones', 'Consultant', 's.jones@hospital.com'),
('Dr', 'Ian', 'Stokes', 'Clinical Nurse Specialist', 'i.stokes@hospital.com'),
(NULL, 'Clinic', 'Administration', 'Admin team', 'c.administration@hospital.com');

INSERT INTO UserClinician (userID, clinicianID)
VALUES (1, 4), (1, 5), (1,6);

INSERT INTO Location (locationAddress)
VALUES ('Royal Victoria Hospital, 274 Grosvenor Rd, Belfast, BT12 6BA'),
('Mater Hospital, 45-54 Crumlin Rd, Belfast, BT14 6AB'),
('Belfast City Hospital, Lisburn Rd, Belfast, BT9 7AB');

INSERT INTO Department (DepartmentName)
VALUES ('A&E'), ('Maternity'), ('Oncology'), ('GP');

INSERT INTO LocationDepartment (locationID, departmentID)
VALUES (1, 1), (2, 1), (2, 2), (3, 3);

INSERT INTO AppointmentType (`type`)
VALUES ('Pre-Op Assessment'), ('Emergency Surgery'), ('GP Appointment'), ('Check-up');

INSERT INTO Appointment (userID, locationDepartmentID, clinicianID, dateOfAppointment, `comment`, appointmentTypeID)
VALUES(1, 3, 3, '2017-07-07', 'Ultrasound performed, pregnancy progressing normally.', 4),
(1, 3, 3, (NOW() + INTERVAL 2 DAY), 'Ultrasound to be performed to ensure pregnancy is progressing normally.', 4),
(3, 4, 2, (NOW() + INTERVAL 12 DAY), null, 1),
(3, 3, 3, (NOW() - INTERVAL 2 DAY), 'Ultrasound to be performed to ensure pregnancy is progressing normally.', 4),
(3, 4, 2, (NOW() - INTERVAL 322 DAY), 'null', 1),
(1, 3, 3, (NOW() - INTERVAL 20 DAY), '
Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pulvinar sapien suscipit neque vehicula, quis facilisis dolor tempor. Etiam nunc erat, sodales ac eleifend a, placerat vel sapien. Aenean aliquet lacus ac finibus cursus. Vivamus eu tortor pulvinar, finibus urna eget, cursus ipsum. Vivamus vestibulum neque vitae arcu laoreet ullamcorper. Sed mollis pulvinar ante ut auctor. Donec erat nisl, ornare vitae diam a, tristique euismod risus. Nullam aliquet elit augue, in mollis ipsum vehicula eu. Aenean ut lectus quis sem vulputate rhoncus.
Quisque odio ligula, dictum vel blandit ac, ornare convallis quam. Maecenas in ligula vel neque consequat pharetra vitae ut nulla. Vestibulum rutrum, nunc eget lobortis auctor, elit dolor faucibus enim, ac elementum dolor orci eu odio. Etiam eu euismod ex, et consectetur turpis. Proin quam purus, blandit sed sapien nec, sagittis consequat purus. Ut erat ante, posuere vel sapien sit amet, efficitur pellentesque lectus. Nullam congue volutpat ex, vitae tristique tellus blandit molestie. Morbi pellentesque a dui nec sodales. Suspendisse pellentesque sapien ac tellus vestibulum, quis pharetra felis iaculis. Donec ultrices ultricies sapien, et vulputate risus feugiat et. Maecenas purus diam, finibus vel elementum congue, tincidunt nec neque. Suspendisse at leo et sem tincidunt commodo vitae et nisi. Proin sodales metus vitae tortor volutpat, vestibulum lobortis dui eleifend.
Morbi consequat erat in nunc laoreet blandit. Morbi sodales sollicitudin velit vel dictum. Quisque lectus nisi, volutpat id risus vel, pretium accumsan purus. Ut at varius magna, id sollicitudin metus. Donec quis porta tellus.', 4),
(1, 1, 1, '2017-11-10 15:00:00', 'INSTRUCTIONS: Do not eat any food 24 hours before surgery.', 3),
(1, 3, 2, (NOW() + INTERVAL 30 DAY), 'Checkup after Ultrasound,', 4),
(1, 1, 1, (NOW() - INTERVAL 4 DAY), 'INSTRUCTIONS: Do not eat any food 24 hours before surgery.', 1),
(1, 2, 1, (NOW() + INTERVAL 4 DAY), 'Foot complaints.', 3),
(1, 3, 1, (NOW() - INTERVAL 62 DAY), 'Other food complaints .', 3),
(4, 2, 1, (NOW() + INTERVAL 12 DAY), 'Eye check-up', 4),
(4, 2, 1, (NOW() - INTERVAL 12 DAY), 'Eye check-up', 4),
(7, 3, 1, (NOW() - INTERVAL 62 DAY), 'Routine checkup.', 3),
(7, 3, 1, (NOW() - INTERVAL 62 DAY), 'Routine checkup.', 3),
(8, 3, 2, (NOW() + INTERVAL 17 DAY), 'Ear complaints.', 4),
(8, 2, 1, (NOW() + INTERVAL 22 DAY), 'Further investigation required for persistent ear complaints', 3),
(8, 2, 1, (NOW() - INTERVAL 22 DAY), 'Further investigation required for persistent ear complaints', 3),
(1, 3, 2, (NOW() + INTERVAL 60 DAY), 'Other food complaints .', 3),
(1, 3, 2, (NOW() + INTERVAL 125 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() + INTERVAL 151 DAY), 'Other food complaints .', 3),
(1, 3, 2, (NOW() + INTERVAL 152 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() + INTERVAL 400 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() + INTERVAL 420 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() + INTERVAL 430 DAY), 'Other food complaints .', 3),
(1, 3, 2, (NOW() + INTERVAL 500 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() + INTERVAL 600 DAY), 'Other food complaints .', 3),
(1, 2, 1, (NOW() - INTERVAL 14 DAY), 'Foot complaints.', 3),
(1, 3, 2, (NOW() - INTERVAL 125 DAY), 'Other food complaints .', 3),
(1, 3, 2, (NOW() - INTERVAL 160 DAY), 'Other food complaints .', 3),
(1, 3, 2, (NOW() - INTERVAL 185 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() - INTERVAL 181 DAY), 'Other food complaints .', 3),
(1, 3, 2, (NOW() - INTERVAL 192 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() - INTERVAL 183 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() - INTERVAL 204 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() - INTERVAL 206 DAY), 'Other food complaints .', 3),
(1, 3, 2, (NOW() - INTERVAL 300 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() - INTERVAL 320 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() - INTERVAL 340 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() - INTERVAL 490 DAY), 'Other food complaints .', 3),
(1, 3, 2, (NOW() - INTERVAL 500 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() - INTERVAL 890 DAY), 'Other food complaints .', 3),
(1, 3, 2, (NOW() - INTERVAL 900 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() - INTERVAL 950 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() + INTERVAL 340 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() + INTERVAL 350 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() + INTERVAL 360 DAY), 'Other food complaints .', 3),
(1, 3, 2, (NOW() + INTERVAL 390 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() + INTERVAL 400 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() + INTERVAL 450 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() + INTERVAL 490 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() + INTERVAL 840 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() + INTERVAL 890 DAY), 'Other food complaints .', 3),
(1, 3, 2, (NOW() + INTERVAL 900 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() - INTERVAL 400 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() - INTERVAL 450 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() - INTERVAL 490 DAY), 'Other food complaints .', 3),
(1, 3, 2, (NOW() - INTERVAL 500 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() - INTERVAL 700 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() - INTERVAL 800 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() - INTERVAL 840 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() - INTERVAL 890 DAY), 'Other food complaints .', 3),
(1, 3, 2, (NOW() - INTERVAL 900 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() - INTERVAL 901 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() - INTERVAL 950 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() - INTERVAL 952 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() - INTERVAL 1000 DAY), 'Other food complaints .', 3),
(1, 3, 3, (NOW() - INTERVAL 1001 DAY), 'Other food complaints .', 3),
(1, 3, 2, (NOW() - INTERVAL 1029 DAY), 'Other food complaints .', 3),
(1, 3, 1, (NOW() - INTERVAL 1080 DAY), 'Other food complaints .', 3);

INSERT INTO `Condition` (conditionName, conditionLink)
VALUES ("Hip Replacement", "http://www.nhs.uk/Conditions/Hip-replacement/Pages/Introduction.aspx"),
("Diabetes", "http://www.nhs.uk/Conditions/Diabetes/Pages/Diabetes.aspx"),
("Conjunctivitis", "http:/g/www.nhs.uk/Conditions/Conjunctivitis-infective/Pages/Treatment.aspx"),
("Back Pain", "http://www.nhs.uk/conditions/back-pain/Pages/Introduction.aspx");

INSERT INTO UserCondition (userID, conditionID, startDate, endDate) 
VALUES (1, 4, '2017-01-10', '2017-07-15'),
(1, 3, '2016-11-10', '2017-07-20'),
(1, 2, '1998-04-03', null),
(1, 4, '2017-08-03', null),
(4, 3, '2017-09-09', '2017-09-27'),
(7, 1, '2017-09-09', null),
(7, 4, '2017-08-11', '2017-09-01');

INSERT INTO UserSideEffect (userID, sideEffectText, deleted)
VALUES (1, 'I get a sore head after I take my meds in the morning', false),
(1, 'I feel drowsy since I started lithium', false);

INSERT INTO Task(taskName, userID, taskSummary, recievedDate, dueDate)
VALUES('Pre-op questionnaire', 1, 'Questionnaire to be filled out before surgery. Includes allergies and general health questions.', (NOW() - INTERVAL 4 DAY), (NOW() + INTERVAL 18 DAY)),
('Pre-op Assessment: Olanzapine', 1, 'Form used to assess your suitibility for Olanzapine which will be used post surgery.', (NOW() - INTERVAL 12 DAY), (NOW() - INTERVAL 2 DAY)),
('Pre-op Assessment: Paracetamol', 1, 'Form used to assess your suitibility for Paracetamol which will be used post surgery.', NOW(), (NOW() + INTERVAL 12 DAY));

INSERT INTO AppointmentQuery(appointmentID, clinicianID, querySubject, queryText)
VALUES (1, 1, 'Pre-appointment instructions', 'Do I need to fast before coming to this appointment?');
