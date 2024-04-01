
drop database if exists Itinerary;

create database Itinerary;

use Itinerary;

create table ItineraryUser (
   Email varchar(254) not null,
   Password varchar(30) not null,

   primary key(Email)
);

create table ItineraryUserData (
      -- from mongodb
   ItineraryID varchar(128) not null, 
   Email varchar(254) not null,
   ItineraryTitle varchar(254) not null,
   startDate date not null,
   endDate date not null,


   dateCreated datetime DEFAULT now(),

   primary key(ItineraryID),
   constraint fk_po_id foreign key(Email) references ItineraryUser(Email)
);

grant all privileges on Itinerary.* to fred@'%';

flush privileges;