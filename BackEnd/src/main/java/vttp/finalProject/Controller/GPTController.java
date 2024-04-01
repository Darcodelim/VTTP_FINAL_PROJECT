package vttp.finalProject.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

import vttp.finalProject.Service.GPTservice;
import vttp.finalProject.Service.ItineraryService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class GPTController {

    @Autowired
    GPTservice gpTservice;

    @Autowired
    ItineraryService itinerarySvc;

    Optional<String> ResponseOpt;


    @GetMapping("GPT/insertPrompt")
    public ResponseEntity<String> chat(@RequestParam("prompt") String prompt)
    {   System.out.println(prompt);
        String response = "";
        
        try {   
            ResponseOpt=Optional.of(gpTservice.chatOutput(prompt));
            if(response.isEmpty())
            {
                 
                 response = ResponseOpt.get();
                
            }
            
             
        } catch (Exception e) {
            e.printStackTrace();
            JsonObject errorJson = Json.createObjectBuilder().add("error",e.getMessage()).build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorJson.toString());
        }
        
        
        return ResponseEntity.ok(response);
        // JsonObject errorJson1 = Json.createObjectBuilder().add("error","Testing error").build();
        // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorJson1.toString());
    }

    
}
