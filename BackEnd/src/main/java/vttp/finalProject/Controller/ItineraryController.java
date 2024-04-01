package vttp.finalProject.Controller;

import java.io.StringReader;
import java.util.List;
import java.util.Map;

import org.apache.catalina.connector.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import jakarta.json.JsonReader;
import vttp.finalProject.Model.Itinerary.ItinerarySql;
import vttp.finalProject.Model.Itinerary.User;
import vttp.finalProject.Service.ItineraryService;
import vttp.finalProject.Service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ItineraryController {

        @Autowired
        ItineraryService itinerarySvc;

        @GetMapping("/getItineraryDetails")
        public ResponseEntity<String> getItineraryDetails(@RequestParam("itineraryID") String itineraryID )
        {
            String itinerary =  itinerarySvc.getItineraryMongo(itineraryID);

            return ResponseEntity.ok().body(itinerary);

        }
        
        

        @DeleteMapping("/deleteItinerary/{itineraryID}")
        public ResponseEntity<String> deleteItinerary(@PathVariable String itineraryID )
        {   
            System.out.println(itineraryID);
            boolean deleteStatus = itinerarySvc.deleteItinerary(itineraryID);
            JsonObject resultObject =  Json.createObjectBuilder().add("Deleted",Boolean.toString(deleteStatus)).add("itineraryID",itineraryID).build();
           
            if(deleteStatus)
            {
                return ResponseEntity.ok().body(resultObject.toString());

            }

            else{

                return ResponseEntity.status(HttpStatus.CONFLICT).body(resultObject.toString());
            }

        }

        @PatchMapping("/editItineraryTitle/{itineraryID}")
        public ResponseEntity<String> editItineraryTitle(@RequestBody String payload, @PathVariable String itineraryID )
        {
            try {
                JsonReader reader = Json.createReader(new StringReader(payload));
                JsonObject json = reader.readObject();
                String title = json.getString("title");
                itinerarySvc.editItineraryTitle(itineraryID, title);
                
                
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
                JsonObject Errorstatus = Json.createObjectBuilder().add("Status","Itinerary title edited unsuccessfully").build();
                return ResponseEntity.status(HttpStatus.CONFLICT).body(Errorstatus.toString());
            }
            JsonObject status = Json.createObjectBuilder().add("Status","Itinerary title edited successfully").build();
            return ResponseEntity.ok().body(status.toString());
        }


        @PostMapping("/insertItinerary")
        public ResponseEntity<String> insertItinerary(@RequestParam Map<String,String> param, @RequestBody String payload)
        {
            String username = param.get("username");
            String itineraryTitle = param.get("title");
            String startDate = param.get("startDate");
            String endDate = param.get("endDate");

            System.out.println(startDate);
            System.out.println(endDate);

            try {
                itinerarySvc.insertItineraryId_andData(username, itineraryTitle, startDate,endDate, payload);
            } catch (Exception e) {
                
                    e.printStackTrace();
                    JsonObject ErrorJson = Json.createObjectBuilder().add("Error","Unable to add new itinerary").build();
                    return ResponseEntity.status(HttpStatus.CONFLICT).body(ErrorJson.toString());

            }
            JsonObject status = Json.createObjectBuilder().add("Status","Itinerary added successfully").build();
            return ResponseEntity.ok().body(status.toString());
        }

        
        @GetMapping("/getItineraryInfo")
        public ResponseEntity<List<ItinerarySql>> getItineraryInfo(@RequestParam("email") String email )
        {
            List<ItinerarySql> itineraryList =  itinerarySvc.getItinerariesSql(email);

            return ResponseEntity.ok().body(itineraryList);

        }

        @GetMapping("/getItinerary/{itineraryID}")
        public ResponseEntity<String> getItinerary(@PathVariable String itineraryID )
        {   
            System.out.println(itineraryID);

            String mongoResponse = itinerarySvc.getItineraryMongo(itineraryID);
        
   
                return ResponseEntity.ok().body(mongoResponse);

            }



}

