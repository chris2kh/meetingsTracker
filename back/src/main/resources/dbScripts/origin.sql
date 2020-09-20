create table meetings (
	id serial primary key,
	title varchar(50),
	fk_project_id int not null,
	my_date date not null default current_date,
	my_minute varchar
);


create table projects (
	id serial primary key,
	my_name varchar(50) not null
);

create table persons (
	id serial primary key,
	my_name varchar(50) not null
);

create table attendees (
	fk_meeting_id int not null,
	fk_person_id int not null
);

create table tasks (
	id serial primary key,
	fk_meeting_id int not null,
	fk_person_id int not null,
	due_date date not null,
	description varchar(255) not null
);

---
alter table meetings
add constraint fk_project
foreign key (fk_project_id)
references projects(id);


alter table attendees
add constraint fk_meeting
foreign key (fk_meeting_id)
references meetings(id) on delete cascade,
add constraint fk_person
foreign key (fk_person_id)
references persons(id);

alter table attendees add primary key (fk_meeting_id, fk_person_id);

alter table tasks
add constraint fk_meeting
foreign key (fk_meeting_id)
references meetings(id) on delete cascade,
add constraint fk_person
foreign key (fk_person_id)
references persons(id);

--
insert into projects(my_name) values('Angular evolution'),('Custom made compiler'),('Functional programming training'),
('AWS migration'),('Google maps integration'),('API design'),('Calendar software');

insert into persons(my_name) values ('Linus Torvalds'),('Dennis Ritchie'),('Alan Turing'),('Alan Kay'),('Guido van Rossum'),('Ken Thompson'),('James Gosling'),
('John McCarthy'),('Brian Keith Harvey'),('Bill Gates'),('Steve Jobs'),('Steve Wozniak');