package vttp.finalProject.Controller;


import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.view.RedirectView;


import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import jakarta.servlet.http.HttpServletRequest;
import vttp.finalProject.Service.googleCalendarService;

@Controller

@CrossOrigin
@RequestMapping("/api")
public class googleCalendarController {

    @Autowired
    googleCalendarService gcSvc;

    String Code;

    @GetMapping(value = "/oauth2/authorize")
    @ResponseBody
	public ResponseEntity<String> googleConnectionStatus() throws Exception {

            String authorizationURLSvc = gcSvc.authorize();

            JsonObject authorizationURL = Json.createObjectBuilder().add("authorizationURL" ,authorizationURLSvc).build();

            // return new RedirectView(gcSvc.authorize());
            System.out.println(authorizationURLSvc);
             return ResponseEntity.ok(authorizationURL.toString());

        }
    

        //Getting Authorization Code from the redirectURI ///// (14/4/24) IF AFTER PUTTING THE URL TO ANOTHER CONTROLLER DOESNT WORK FOR RAILWAY, TRY TO PUT THIS ENTIRE ENDPOINT TO A NON-RESTCONTROLLER
	@GetMapping(value = "/callback")
	public RedirectView oauth2Callback(@RequestParam Map<String,String> param) {

    /*Sample of the returned response: http://localhost:8080/oauth2/callback/google?code=4/0AeaYSHCKrCmvAkSB9oZ-NrwntnLX4DFF4VmL55JO8uJ9EcnAiqulPKbYFdioB7ANPi3-nQ
        &scope=https://www.googleapis.com/auth/calendar.events%20https://www.googleapis.com/auth/calendar*/
        
        String Code = param.get("code");
        System.out.println(Code);
        String error =  param.get("\n error");




        if(!Code.isBlank())
        {   System.out.printf("within the if statement: %s",Code);
            gcSvc.setCode(Code);
            String passURL = gcSvc.getVerifyPassUrl();
           return new RedirectView(passURL);
        }

        else
        {   String failURL = gcSvc.getVerifyFailUrl();
            return new RedirectView(failURL);
        }


	}



    
    @GetMapping("/insertCalendarEvent")
    @ResponseBody
        public ResponseEntity<String> insertCalendar(@RequestParam Map<String,String> param)
        {
            // String username = param.get("username");
            String itineraryTitle = param.get("title");
            String startDate = param.get("startDate");
            String endDate = param.get("endDate");

            System.out.println(startDate);
            System.out.println(endDate);


            Boolean addStatus = gcSvc.setCalendarEvent(itineraryTitle, startDate, endDate);
            
            if(addStatus)
            {
                JsonObject status = Json.createObjectBuilder().add("Status","Event Added Successfully").build();
                return ResponseEntity.ok().body(status.toString());
            }
            else{
                JsonObject ErrorJson = Json.createObjectBuilder().add("Error","Unable To Add Event").build();
                return ResponseEntity.status(HttpStatus.CONFLICT).body(ErrorJson.toString());

            }
                

            

        }

        @GetMapping(value = "/oauth2/verifyFail")
        public String verifyFail()
        {
            return "verifyFail";
        }
    
        @GetMapping(value = "/oauth2/verifyPass")
        public String verifyPass()
        {
            return "verifyPass";
        }


    @GetMapping(value = "/oauth2/verify")
    @ResponseBody
	public ResponseEntity<String> oauth2Callback(@RequestParam("username") String username) {

    /*Sample of the returned response: http://localhost:8080/oauth2/callback/google?code=4/0AeaYSHCKrCmvAkSB9oZ-NrwntnLX4DFF4VmL55JO8uJ9EcnAiqulPKbYFdioB7ANPi3-nQ
        &scope=https://www.googleapis.com/auth/calendar.events%20https://www.googleapis.com/auth/calendar*/
       String googleCode =  gcSvc.getCode();

        if(googleCode != null)
        {
            JsonObject authorizationStatus= Json.createObjectBuilder().add("authorizationStatus" ,true).build();

            Boolean tokenStatus = gcSvc.getToken(googleCode, username);
            System.out.println(tokenStatus);

            return ResponseEntity.ok().body(authorizationStatus.toString());
        }

        else{
            JsonObject authorizationStatus= Json.createObjectBuilder().add("authorizationStatus" ,false).build();
            return ResponseEntity.badRequest().body(authorizationStatus.toString());
        }

        // return new RedirectView("http://localhost:4200/#/calendar");
		// System.out.println("cal message:" + message);
		// return  ResponseEntity.ok().body("authorized");
	}


    @GetMapping("/oauth2/revokeToken")
    @ResponseBody
    public ResponseEntity<String> revokeToken()
    {
       boolean revokeStatus= gcSvc.revokeAccessToken();

       if(revokeStatus)
       {
        Code=null;
        System.out.println("revoke Successfully");
        JsonObject status =  Json.createObjectBuilder().add("status","revoke successfully").build();
        return ResponseEntity.ok(status.toString());
       }

       else{
        System.out.println("revoke unsuccessfully");
        JsonObject status =  Json.createObjectBuilder().add("status","revoke fail").build();
        return ResponseEntity.internalServerError().body(status.toString());

       }
    }
    
}
