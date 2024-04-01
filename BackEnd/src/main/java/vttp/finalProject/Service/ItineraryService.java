package vttp.finalProject.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.f4b6a3.ulid.UlidCreator;

import vttp.finalProject.Exceptions.UserException;
import vttp.finalProject.Model.Itinerary.ItinerarySql;
import vttp.finalProject.Model.Itinerary.User;
import vttp.finalProject.Repository.ItineraryRepo;

@Service
public class ItineraryService {
    
    @Autowired
    private ItineraryRepo itinRepo;


    //SQL
    @Transactional(rollbackFor = UserException.class)
    public void insertItineraryId_andData(String email,String itineraryTitle,String startDate,String endDate, String itinerary ) throws UserException
    {       

        ObjectId itineraryObjectId = new ObjectId();

        //Insert ItineraryId into SQL
        itinRepo.insertItinerary(email,itineraryTitle,startDate ,endDate ,itineraryObjectId.toString());
        itinRepo.insertItineraryMongo(itinerary,itineraryObjectId);

        //Insert ItineraryId into MongoDb and the rest of the payload with

    }

    public List<ItinerarySql> getItinerariesSql(String email)
    {
        return itinRepo.getItineraries(email);
    }

    @Transactional(rollbackFor = DataAccessException.class)
    public boolean deleteItinerary(String itineraryID)
    {   
        boolean monogoDelete = itinRepo.deleteItineraryMongo(itineraryID);

        boolean sqlDelete = itinRepo.deleteSQLItinerary(itineraryID);

        System.out.printf("MonogoDelete:%s\n",monogoDelete?"true":"false");
        System.out.printf("sqlDelete:%s",sqlDelete?"true":"false");
        

        if(sqlDelete && monogoDelete)
        {
            return true;
        }
        else{
            return false;
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public boolean editItineraryTitle(String itineraryID, String title) throws Exception
    {
        boolean sqlEdit = itinRepo.editTitleSQLItinerary(title, itineraryID);

        return sqlEdit;
    }

    

    //MONGO
    public String insertItineraryMongo(String itinerary,ObjectId itineraryID)
    {

       String objectId= itinRepo.insertItineraryMongo(itinerary,itineraryID);

       return objectId;
    }

    public String getItineraryMongo(String objectId)
    {

       return itinRepo.getItineraryMongo(objectId);
    }

    public boolean deleteItineraryMongo(String ObjectId)
    {
        return itinRepo.deleteItineraryMongo(ObjectId);
    }
}

