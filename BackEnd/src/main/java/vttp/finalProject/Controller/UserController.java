package vttp.finalProject.Controller;

import java.io.StringReader;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp.finalProject.Model.Itinerary.User;
import vttp.finalProject.Service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userSvc;


    @PostMapping(path="/createUser",consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createUser(@RequestBody String payload)
    {
        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject json = reader.readObject();
        String email = json.getString("email");
        String password = json.getString("password");

        System.out.printf("email:%s,password:%s",email,password);

        User user = new User(email, password);

        try {
            userSvc.createUser(user);
        } catch (Exception e) {
            e.printStackTrace();
            JsonObject ErrorJson = Json.createObjectBuilder().add("Error","Sign up fail, user exist").build();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ErrorJson.toString());
        }

        //createResponseBody
        JsonObject status = Json.createObjectBuilder().add("loginStatus",true).add("username",email).build();

        return ResponseEntity.ok(status.toString());

    }

    //for login purpose
    @PostMapping(path="/validateUser",consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> validateUser(@RequestBody String payload)
    {

        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject json = reader.readObject();
        String email = json.getString("email");
        String password = json.getString("password");

        User user = new User(email, password);
        
        Boolean userExist=userSvc.validateUser(user);
        
        if(userExist)
        {
            JsonObject status = Json.createObjectBuilder().add("loginStatus",true).add("username",email).build();
            return ResponseEntity.ok().body(status.toString());

        }

        else{

            JsonObject ErrorJson = Json.createObjectBuilder().add("Error","Login unsuccessfully, register an account or check password/username").build();
            return ResponseEntity.status(HttpStatus.CONFLICT).body(ErrorJson.toString());

        }


    }
    
}
