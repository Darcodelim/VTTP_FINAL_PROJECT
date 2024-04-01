insert into itineraryuser(Email,Password) values("darien@gmail.com","1234");

select * from itineraryuser;

select count(*) from itineraryuser where Email = "darien1@gmail.com";

insert into itineraryuserdata(Email,ItineraryID) values("darien@gmail.com","J1234");
insert into itineraryuserdata(Email,ItineraryID) values("darien@gmail.com","J0998");

select ItineraryID from itineraryuserdata where Email = "darien@gmail.com";

SELECT * FROM itineraryuserdata WHERE Email = "darien@gmail.com";

select * from itineraryuserdata ;