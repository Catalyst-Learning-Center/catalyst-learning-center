CREATE TABLE "users" (
	"id" serial primary key NOT NULL,
	"username" varchar(1000) NOT NULL,
	"password" varchar(10000) NOT NULL,
	"permissions" integer NOT NULL DEFAULT '1',
	"active" BOOLEAN NOT NULL DEFAULT 'TRUE'
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
	"location_phone" varchar(1000) NOT NULL,
	"active" BOOLEAN NOT NULL DEFAULT 'TRUE'
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
	"resume" varchar(10000),
	"active" BOOLEAN NOT NULL DEFAULT 'TRUE'
);

CREATE TABLE "user_info" (
	"id" serial primary key NOT NULL,
	"user_id" INT REFERENCES "users" NOT NULL,
	"user_first_name" varchar(1000) NOT NULL,
	"user_last_name" varchar(1000) NOT NULL,
	"user_address" varchar(1000) NOT NULL,
	"user_city" varchar(1000) NOT NULL,
	"user_state" varchar(1000) NOT NULL,
	"user_zipcode" integer NOT NULL,
	"user_cell_phone" varchar(1000) NOT NULL,
	"user_email" varchar(1000) NOT NULL,
	"user_qualifications" varchar(10000) NOT NULL,
	"user_experience" varchar(10000) NOT NULL,
	"user_age_group" varchar(10000) NOT NULL,
	"resume" varchar(10000),
	"password" varchar(10000) NOT NULL
);

CREATE TABLE "sessions" (
	"id" serial primary key NOT NULL,
	"user_id" INT REFERENCES "users" NOT NULL,
	"location_id" INT REFERENCES "location" NOT NULL,
	"session_date" DATE DEFAULT CURRENT_DATE NOT NULL,
	"student_name" varchar(1000) NOT NULL,
	"school_id" INT REFERENCES "schools" NOT NULL,
	"grade_id" INT REFERENCES "grade",
	"subjects_id" INT REFERENCES "subjects",
	"topics" varchar(10000),
	"start_time" TIME DEFAULT CURRENT_TIME NOT NULL,
	"end_time" TIME DEFAULT NULL
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