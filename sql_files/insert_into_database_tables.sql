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

insert into user_info (user_id, user_first_name, user_last_name, user_address, user_city, user_state, user_zipcode, user_cell_phone, user_email, user_qualifications, user_experience, user_age_group, resume, password) values (7, 'Kirstin', 'Danilyak', '98 Ruskin Parkway', 'Minneapolis', 'MN', '55404', '612-242-9125', 'user1@email.com', 'teacher', 'tutor', 'college', 'https://rakuten.co.jp/dui/nec/nisi/volutpat/eleifend.xml', 'user1');
insert into user_info (user_id, user_first_name, user_last_name, user_address, user_city, user_state, user_zipcode, user_cell_phone, user_email, user_qualifications, user_experience, user_age_group, resume, password) values (1, 'Valeria', 'Cutress', '73 Surrey Center', 'Minneapolis', 'MN', '55407', '612-473-0189', 'user2@email.com', 'math teacher', 'tutor', 'college', 'http://illinois.edu/magna/vestibulum/aliquet/ultrices/erat/tortor.jpg', 'user2');
insert into user_info (user_id, user_first_name, user_last_name, user_address, user_city, user_state, user_zipcode, user_cell_phone, user_email, user_qualifications, user_experience, user_age_group, resume, password) values (8, 'Natale', 'Bake', '3 Clemons Lane', 'Minneapolis', 'MN', '55408', '612-687-4765', 'user3@email.com', 'teacher', 'teacher', 'college', 'http://apple.com/blandit.aspx', 'user3');
insert into user_info (user_id, user_first_name, user_last_name, user_address, user_city, user_state, user_zipcode, user_cell_phone, user_email, user_qualifications, user_experience, user_age_group, resume, password) values (10, 'Fawne', 'Absolon', '5 Sage Street', 'Minneapolis', 'MN', '55406', '612-941-9811', 'user4@email.com', 'scientist', 'teacher', 'any', 'https://seesaa.net/blandit/nam/nulla/integer/pede.jsp', 'user4');
insert into user_info (user_id, user_first_name, user_last_name, user_address, user_city, user_state, user_zipcode, user_cell_phone, user_email, user_qualifications, user_experience, user_age_group, resume, password) values (10, 'Ruth', 'Silcocks', '83 Warner Terrace', 'Minneapolis', 'MN', '55401', '612-765-2979', 'user5@email.com', 'mathematician', 'teacher', 'any', 'http://netlog.com/rutrum/nulla/nunc/purus/phasellus/in/felis.js', 'user5');
insert into user_info (user_id, user_first_name, user_last_name, user_address, user_city, user_state, user_zipcode, user_cell_phone, user_email, user_qualifications, user_experience, user_age_group, resume, password) values (10, 'Davidson', 'Wrotchford', '1 Bayside Court', 'Minneapolis', 'MN', '55404', '612-662-7406', 'user6@email.com', 'math teacher', 'teacher', 'any', 'http://hubpages.com/nam/nulla/integer/pede/justo/lacinia.json', 'user6');
insert into user_info (user_id, user_first_name, user_last_name, user_address, user_city, user_state, user_zipcode, user_cell_phone, user_email, user_qualifications, user_experience, user_age_group, resume, password) values (3, 'Sterne', 'Amthor', '24 Cordelia Street', 'Minneapolis', 'MN', '55407', '612-910-7935', 'user7@email.com', 'mathematician', 'teacher', 'high school', 'https://cloudflare.com/dui/luctus/rutrum/nulla/tellus/in/sagittis.jsp', 'user7');
insert into user_info (user_id, user_first_name, user_last_name, user_address, user_city, user_state, user_zipcode, user_cell_phone, user_email, user_qualifications, user_experience, user_age_group, resume, password) values (6, 'Ezekiel', 'Barti', '11 Basil Parkway', 'Minneapolis', 'MN', '55405', '612-679-5199', 'user8@email.com', 'teacher', 'tutor', 'any', 'http://alexa.com/nibh/quisque.jpg', 'user8');
insert into user_info (user_id, user_first_name, user_last_name, user_address, user_city, user_state, user_zipcode, user_cell_phone, user_email, user_qualifications, user_experience, user_age_group, resume, password) values (7, 'Mirelle', 'Heffernon', '34 Rusk Circle', 'Minneapolis', 'MN', '55403', '612-290-8056', 'user9@email.com', 'teacher', 'tutor', 'elementary', 'https://naver.com/velit/id/pretium/iaculis/diam/erat.jpg', 'user9');
insert into user_info (user_id, user_first_name, user_last_name, user_address, user_city, user_state, user_zipcode, user_cell_phone, user_email, user_qualifications, user_experience, user_age_group, resume, password) values (8, 'Giuseppe', 'Ray', '9832 Novick Place', 'Minneapolis', 'MN', '55401', '612-613-1419', 'user10@email.com', 'tutor', 'tutor', 'college', 'https://myspace.com/sapien/sapien/non/mi/integer.png', 'user10');

insert into user_info_subjects (user_info_id, subjects_id) values (6, 2);
insert into user_info_subjects (user_info_id, subjects_id) values (9, 7);
insert into user_info_subjects (user_info_id, subjects_id) values (4, 7);
insert into user_info_subjects (user_info_id, subjects_id) values (1, 2);
insert into user_info_subjects (user_info_id, subjects_id) values (4, 2);
insert into user_info_subjects (user_info_id, subjects_id) values (6, 5);
insert into user_info_subjects (user_info_id, subjects_id) values (7, 7);
insert into user_info_subjects (user_info_id, subjects_id) values (1, 3);
insert into user_info_subjects (user_info_id, subjects_id) values (5, 5);
insert into user_info_subjects (user_info_id, subjects_id) values (4, 1);
insert into user_info_subjects (user_info_id, subjects_id) values (1, 6);
insert into user_info_subjects (user_info_id, subjects_id) values (8, 4);
insert into user_info_subjects (user_info_id, subjects_id) values (5, 4);
insert into user_info_subjects (user_info_id, subjects_id) values (3, 7);
insert into user_info_subjects (user_info_id, subjects_id) values (5, 6);
insert into user_info_subjects (user_info_id, subjects_id) values (4, 2);
insert into user_info_subjects (user_info_id, subjects_id) values (7, 1);
insert into user_info_subjects (user_info_id, subjects_id) values (10, 2);
insert into user_info_subjects (user_info_id, subjects_id) values (7, 2);
insert into user_info_subjects (user_info_id, subjects_id) values (6, 5);

insert into user_info_location (user_info_id, location_id) values (3, 1);
insert into user_info_location (user_info_id, location_id) values (2, 1);
insert into user_info_location (user_info_id, location_id) values (3, 1);
insert into user_info_location (user_info_id, location_id) values (9, 1);
insert into user_info_location (user_info_id, location_id) values (3, 1);
insert into user_info_location (user_info_id, location_id) values (4, 2);
insert into user_info_location (user_info_id, location_id) values (8, 2);
insert into user_info_location (user_info_id, location_id) values (7, 2);
insert into user_info_location (user_info_id, location_id) values (4, 2);
insert into user_info_location (user_info_id, location_id) values (7, 1);

