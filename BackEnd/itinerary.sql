
drop database if exists Itinerary;

create database Itinerary;

use Itinerary;

create table ItineraryUser (
   Email varchar(254) not null,
   Passsword varchar(30) not null,

   primary key(Email)
);

create table ItineraryUserData (
   ItineraryNo int NOT NULL AUTO_INCREMENT,
   Email varchar(254) not null,
   -- from mongodb
   ItineraryID varchar(128) not null, 

   primary key(ItineraryNo),
   constraint fk_po_id foreign key(Email) references ItineraryUser(Email)
);

grant all privileges on Itinerary.* to fred@'%';

flush privileges;