insert into itineraryuser(Email,Password) values("darien@gmail.com","1234");

select * from itineraryuser;

select count(*) from itineraryuser where Email = "darien1@gmail.com";

insert into itineraryuserdata(Email,ItineraryID) values("darien@gmail.com","J1234");
insert into itineraryuserdata(Email,ItineraryID) values("darien@gmail.com","J0998");

select ItineraryID from itineraryuserdata where Email = "darien@gmail.com";

SELECT   ItineraryNo, 
    Email, 
    ItineraryTitle, 
    DATE_FORMAT(startDate, '%d-%m-%Y') AS startDate,
    DATE_FORMAT(endDate, '%d-%m-%Y') AS endDate,
    ItineraryID,
    DATE_FORMAT(dateCreated, '%d-%m-%Y') AS dateCreated FROM itineraryuserdata WHERE Email = "darien@gmail.com" order by dateCreated ASC;

select * from itineraryuserdata ;

-- DELETE from itineraryuserdata ;

UPDATE itineraryuserdata SET ItineraryTitle = "Japan2" where ItineraryID="660a921d39aa7413b5114538";
