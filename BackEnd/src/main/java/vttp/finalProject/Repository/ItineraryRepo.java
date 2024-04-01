package vttp.finalProject.Repository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import com.mongodb.client.result.DeleteResult;

import vttp.finalProject.Exceptions.UserException;
import vttp.finalProject.Model.Itinerary.ItinerarySql;
import vttp.finalProject.Model.Itinerary.User;
import vttp.finalProject.Model.Itinerary.UserItinerary;

@Repository
public class ItineraryRepo {

    @Autowired
    private JdbcTemplate template;

    @Autowired
    private MongoTemplate monogoTemplate;

    
    private static final String SQL_INSERT_Itinerary = "insert into itineraryuserdata(Email,ItineraryTitle,startDate,endDate,ItineraryID) values(?,?,?,?,?)";
    private static final String SQL_GET_ITINERARIES = "SELECT ItineraryTitle, DATE_FORMAT(startDate, '%d-%m-%Y') AS startDate, DATE_FORMAT(endDate, '%d-%m-%Y') AS endDate,ItineraryID,DATE_FORMAT(dateCreated, '%d-%m-%Y') AS dateCreated FROM itineraryuserdata WHERE Email=? ORDER BY dateCreated ASC" ;
    private static final String SQL_DELETE_ITINERARIES ="DELETE from itineraryuserdata WHERE ItineraryID = ?";
    private static final String SQL_EDIT_TITLE = "UPDATE itineraryuserdata SET ItineraryTitle = ? where ItineraryID= ?";


    private static final String Itinerary_Collection ="Itinerary";


   
    
    public void insertItinerary(String Email,String itineraryTitle,String startDate, String endDate, String itineraryID ) throws UserException
    {

            DateTimeFormatter inputFormatter= DateTimeFormatter.ofPattern("dd-MM-yyyy");
            DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
   

            LocalDate inputStartDateFormatted = LocalDate.parse(startDate,inputFormatter);
            String outputStartDateFormatted = inputStartDateFormatted.format(outputFormatter);

            LocalDate inputEndDateFormatted = LocalDate.parse(endDate,inputFormatter);
            String outputEndDateFormatted = inputEndDateFormatted.format(outputFormatter);
        
            int num = template.update(SQL_INSERT_Itinerary,Email,itineraryTitle,outputStartDateFormatted,outputEndDateFormatted,itineraryID);

            if(num!=1)
            {
                throw new UserException("User Itinerary Exist");
            }
        
    
    }
    public boolean editTitleSQLItinerary(String title,String itineraryID) throws Exception
    {
        int num = template.update(SQL_EDIT_TITLE,title,itineraryID);

        if(num!=1)
        {   
            throw new Exception("unable to edit title");
            
        }
        else{
           return true;
        }
    }

        
    public boolean deleteSQLItinerary(String itineraryID )
    {
            int num = template.update(SQL_DELETE_ITINERARIES,itineraryID);
            if(num >= 1)
            {
                return true;
            }
            else{
                return false;
            }

        
    
    }

    public List<ItinerarySql> getItineraries(String Email)
    {

       SqlRowSet rs =  template.queryForRowSet(SQL_GET_ITINERARIES,Email);

       List<ItinerarySql> itinerarySqlList = new ArrayList<>(); 

       while(rs.next())
       {
        String ItineraryTitle = rs.getString("ItineraryTitle");
        String startDate = rs.getString("startDate");
        String endDate = rs.getString("endDate");
        String itineraryId = rs.getString("itineraryId");
        String dateCreated =  rs.getString("dateCreated");

        ItinerarySql itinerarySql = new ItinerarySql(ItineraryTitle, startDate, endDate, itineraryId, dateCreated);
        itinerarySqlList.add(itinerarySql);
       }

       return itinerarySqlList;

    }


    public String insertItineraryMongo(String itinerary,ObjectId itineraryId)
    
    {
        Document itineraryDoc =  Document.parse(itinerary);
        

        itineraryDoc.put("_id", itineraryId);

        //Returns inserted object
        Document doc = monogoTemplate.insert(itineraryDoc,Itinerary_Collection);

        ObjectId objectId = doc.getObjectId("_id");

        String objectIdStr = objectId.toString();

    
        System.out.println(objectIdStr);
        
        return objectIdStr;
    }


    public String getItineraryMongo(String ObjectIdStr)
    {
        ObjectId objectId = new ObjectId(ObjectIdStr);

        Document doc = monogoTemplate.findById(objectId, Document.class, Itinerary_Collection);
        doc.remove("_id");
        System.out.println(doc.toJson());
        return doc.toJson();
    }

    public boolean deleteItineraryMongo(String ObjectIdStr)
    {
        ObjectId objectId = new ObjectId(ObjectIdStr);

        Query query = Query.query(Criteria.where("_id").is(objectId));

        DeleteResult docDelete = monogoTemplate.remove( query, Itinerary_Collection);
        
        if(docDelete.getDeletedCount() == 1)
        {
            return true;
        }
        else{
            return false;
        }
    }
}
