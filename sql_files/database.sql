CREATE TABLE "users" (
	"id" serial primary key NOT NULL,
	"username" varchar(1000) NOT NULL,
	"password" varchar(1000) NOT NULL,
	"permissions" integer DEFAULT 1,
	"active" BOOLEAN DEFAULT true
);

CREATE TABLE "grade" (
	"id" serial primary key NOT NULL,
	"grade_level" varchar(1000) NOT NULL
);

CREATE TABLE "subjects" (
	"id" serial primary key NOT NULL,
	"subjects" varchar(1000) NOT NULL
);

CREATE TABLE "schools" (
	"id" serial primary key NOT NULL,
	"school_name" varchar(1000) NOT NULL
);

CREATE TABLE "location" (
	"id" serial primary key NOT NULL,
	"location_name" varchar(1000) NOT NULL,
	"location_address" varchar(1000) NOT NULL,
	"location_city" varchar(1000) NOT NULL,
	"location_state" varchar(1000) NOT NULL,
	"location_zipcode" integer NOT NULL,
	"location_phone" varchar(1000) NOT NULL
);

CREATE TABLE "applications" (
	"id" serial primary key NOT NULL,
	"date" DATE DEFAULT CURRENT_DATE NOT NULL,
	"applicant_first_name" varchar(1000) NOT NULL,
	"applicant_last_name" varchar(1000) NOT NULL,
	"applicant_address" varchar(1000) NOT NULL,
	"applicant_city" varchar(1000) NOT NULL,
	"applicant_state" varchar(1000) NOT NULL,
	"applicant_zipcode" integer NOT NULL,
	"applicant_cell_phone" varchar(1000) NOT NULL,
	"applicant_email" varchar(1000) NOT NULL,
	"applicant_qualifications" varchar(10000) NOT NULL,
	"applicant_experience" varchar(10000) NOT NULL,
	"applicant_age_group" varchar(10000) NOT NULL,
	"resume" varchar(10000) NOT NULL
);

CREATE TABLE "user_info" (
	"id" serial primary key NOT NULL,
	"user_id" INT REFERENCES "users" NOT NULL,
	"user_first_name" varchar(1000) NOT NULL,
	"user_last_name" varchar(1000) NOT NULL,
	"user_address" varchar(1000) NOT NULL,
	"user_city" varchar(1000) NOT NULL,
	"user_state" varchar(1000) NOT NULL,
	"user_zipcode" varchar NOT NULL,
	"user_cell_phone" varchar(1000) NOT NULL,
	"user_email" varchar(1000) NOT NULL,
	"user_qualifications" varchar(10000) NOT NULL,
	"user_experience" varchar(10000) NOT NULL,
	"user_age_group" varchar(10000) NOT NULL,
	"resume" varchar(10000) NOT NULL
);

CREATE TABLE "sessions" (
	"id" serial primary key NOT NULL,
	"user_id" INT REFERENCES "users" NOT NULL,
	"location_id" INT REFERENCES "location" NOT NULL,
	"session_date" DATE DEFAULT CURRENT_DATE NOT NULL,
	"student_name" varchar(1000) NOT NULL,
	"school_id" INT REFERENCES "schools" NOT NULL,
	"grade_id" INT REFERENCES "grade",
	"subjects_id" INT REFERENCES "subjects" NOT NULL,
	"topics" varchar(10000),
	"start_time" TIME DEFAULT CURRENT_TIME NOT NULL,
	"end_time" TIME NOT NULL
);

CREATE TABLE "applications_subjects" (
	"id" serial primary key NOT NULL,
	"applications_id" INT REFERENCES "applications" NOT NULL,
	"subjects_id" INT REFERENCES "subjects" NOT NULL
);

CREATE TABLE "user_info_subjects" (
	"id" serial primary key NOT NULL,
	"user_info_id" INT REFERENCES "user_info" NOT NULL,
	"subjects_id" INT REFERENCES "subjects" NOT NULL
);

CREATE TABLE "applications_location" (
	"id" serial primary key NOT NULL,
	"applications_id" INT REFERENCES "applications" NOT NULL,
	"location_id" INT REFERENCES "location" NOT NULL
);

CREATE TABLE "user_info_location" (
	"id" serial primary key NOT NULL,
	"user_info_id" INT REFERENCES "user_info" NOT NULL,
	"location_id" INT REFERENCES "location" NOT NULL
);

-- You will need to manually register users before inserting some of the data. See NOTES below.

INSERT INTO "grade" ("grade_level")
VALUES ('K'), ('1'), ('2'), ('3'), ('4'), ('5'), ('6'), ('7'), ('8'), ('9'), ('10'), ('11'), ('12'), ('College'), ('Other');

INSERT INTO "subjects" ("subjects")
VALUES ('Early Math'), ('Arithmetic'), ('Algebra'), ('Geometry'), ('Trigonometry'), ('Calculus'), ('Statistics & Probability'), ('College Topics');

INSERT INTO "schools" ("school_name")
VALUES ('Roosevelt'), ('Washburn'), ('Ubah Medical Academy'), ('Southwest'), ('Marcy Open School'), ('Lyndale'), ('Heritage'),
('Risen Christ'), ('St. Paul College'), ('Richfield Middle School'), ('Richfield High School'), ('Seward'), ('Upper Mississippi Academy'),
('Justice Page Middle School'), ('Clara Barton'), ('Normandale Community College'), ('Metro State University'), ('Edison'), ('South'), ('Green Cental'),
('Higher Ground Academy'), ('TIES'), ('Edina High School'), ('Hassan'), ('Minneapolis Communtiy & Technical College'), ('Rosemount'),
('Champlin Park High School'), ('Minneapolis Academy'), ('Emerson'), ('VOA High School'), ('Hope Academy'), ('Academy College'), 
('Isanti Middle School'), ('Internation (MIMS)'), ('Dugsi Academy'), ('St. Anthony Middle School'), ('International Education Center'),
('Field Community School'), ('Central Elementary School'), ('Sheridan'), ('New Visions Charter School'), ('Tiza Academy'), 
('Whittier International Elementary'), ('Jefferson Elementary'), ('Emily O. Goodridge'), ('Nova Classical Academy'), ('Hebrew Language Academy'),
('Connections Academy'), ('Adult Basic Education'), ('Central Park Elementary'), ('Eisenhower Elementary'), ('Lighthouse'), ('Armatage Elementary'),
('Richfield STEM School'), ('Hale Elementary'), ('Adelante College Prep'), ('Bancroft Elementary'), ('Hopkins Middle School'), ('Hopkins High School'),
('Step Academy'), ('Lehmann Center'), ('Muslim Charter School'), ('University of Minnesota'), ('Hennepin Technical College'), ('MTS Banaadir Academy'),
('Vessey Leadership Academy'), ('L.H. Tanglen Elementary'), ('Columbia Academy'), ('St. Cloud State University'), ('Anderson Elementary'), 
('Burroughs Elementary School'), ('Sanford'), ('Lincoln High School'), ('Anwatin'), ('Laura Ingalls Wilder School'), ('Hiawatha Elementary'),
('Wellstone High School'), ('Central Middle School'), ('Duke Academy'), ('Al-Amal'), ('Metro Schools College Prep'), ('Folwell'),
('Hennepin Elementary School'), ('St. Helena'), ('Countryside Elementary'), ('Fredrika Bremer Intermediate'), ('St. Louis Park Middle School'),
('St. Louis Park High School'), ('Hopkins West Junior High School'), ('MEPE'), ('Eden Prairie'), ('Sullivan'), ('Little Canada Elementary'), 
('Universal Academy'), ('Wayzata High School'), ('FAIR School Downtown'), ('Academy of Holy Angels'), ('Northeast Middle School'),
('Twin Cities International Elementary School'), ('Century College'), ('Mastery'), ('Williston High School'), ('Peter Hobart Elementary School'),
('Rasmussen College'), ('Northeast College Prep'), ('South View High School'), ('Our Lady of Peace'), ('Stonebridge World School');

INSERT INTO "location" ("location_name", "location_address", "location_city", "location_state", "location_zipcode", "location_phone")
VALUES ('Franklin Library', '1314 E Franklin Ave', 'Minneapolis', 'MN', '55404', '612-543-6925'), ('Hosmer Library', '347 E 36th St', 'Minneapolis', 'MN', '55408', '612-543-6400');

INSERT INTO "applications" ("date", "applicant_first_name", "applicant_last_name", "applicant_address", "applicant_city", "applicant_state", "applicant_zipcode", "applicant_cell_phone", "applicant_email", "applicant_qualifications", "applicant_experience", "applicant_age_group", "resume")
VALUES ('10/04/2018', 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user11@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
('10/04/2018', 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user12@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
('10/04/2018', 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user13@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
('10/04/2018', 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user14@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
('10/04/2018', 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user15@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
('10/04/2018', 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user16@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
('10/04/2018', 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user17@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
('10/04/2018', 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user18@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
('10/04/2018', 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user19@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
('10/04/2018', 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user20@email.com', 'qualifications', 'experience', 'kids', 'resume url');

-- NOTES: Manually register ten users using the emails listed below before inserting this info into its table.
INSERT INTO "user_info" ("user_id", "user_first_name", "user_last_name", "user_address", "user_city", "user_state", "user_zipcode", "user_cell_phone", "user_email", "user_qualifications", "user_experience", "user_age_group", "resume")
VALUES (1, 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user1@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
(2, 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user2@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
(3, 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user3@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
(4, 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user4@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
(5, 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user5@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
(6, 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user6@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
(7, 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user7@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
(8, 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user8@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
(9, 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user9@email.com', 'qualifications', 'experience', 'kids', 'resume url'),
(10, 'Jane', 'Smith', '123 Main Street', 'Minneapolis', 'MN', '55408', '612-555-5555', 'user10@email.com', 'qualifications', 'experience', 'kids', 'resume url');

