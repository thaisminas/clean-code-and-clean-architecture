drop table ccca.passenger;
drop schema ccca;
create schema ccca;

create table ccca.passenger (
	passenger_id uuid primary key,
	name text,
	email text,
	document text
);

create table ccca.driver (
	driver_id uuid primary key,
	name text,
	email text,
	document text,
	car_plate text
);
