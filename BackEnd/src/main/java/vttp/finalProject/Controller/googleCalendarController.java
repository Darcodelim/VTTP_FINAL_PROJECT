package vttp.finalProject.Controller;


import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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
@ResponseBody
@CrossOrigin
@RequestMapping("/api")
public class googleCalendarController {

    @Autowired
    googleCalendarService gcSvc;

    String Code;

    @GetMapping(value = "/oauth2/authorize")
	public ResponseEntity<String> googleConnectionStatus() throws Exception {

            String authorizationURLSvc = gcSvc.authorize();

            JsonObject authorizationURL = Json.createObjectBuilder().add("authorizationURL" ,authorizationURLSvc).build();
        
            // return new RedirectView(gcSvc.authorize());
            System.out.println(authorizationURLSvc);
             return ResponseEntity.ok(authorizationURL.toString());

        }
    
    // @GetMapping(value = "/oauth2/authorize")
	// public RedirectView googleConnectionStatus() throws Exception {

    //         JsonObject authorizationURL = Json.createObjectBuilder().add("authorizationURL" ,gcSvc.authorize()).build();
        
    //         return new RedirectView(gcSvc.authorize());

         

    //     }

    //Getting Authorization Code from the redirectURI
	@GetMapping(value = "/oauth2/callback/google")
	public RedirectView oauth2Callback(@RequestParam Map<String,String> param) {

    /*Sample of the returned response: http://localhost:8080/oauth2/callback/google?code=4/0AeaYSHCKrCmvAkSB9oZ-NrwntnLX4DFF4VmL55JO8uJ9EcnAiqulPKbYFdioB7ANPi3-nQ
        &scope=https://www.googleapis.com/auth/calendar.events%20https://www.googleapis.com/auth/calendar*/
        
        Code = param.get("code");
        System.out.println(Code);
        String error =  param.get("\n error");
        
        if(!Code.isBlank())
        {   String passURL = gcSvc.getVerifyPassUrl();
           return new RedirectView(passURL);
        }

        else
        {   String failURL = gcSvc.getVerifyFailUrl();
            return new RedirectView(failURL);
        }


		// System.out.println("cal message:" + message);
		// return  ResponseEntity.ok().body("authorized");
	}

    
        @GetMapping("/insertCalendarEvent")
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
    public ResponseEntity<String> verifyFail()
    {
        return ResponseEntity.ok().body("Fail Authentication, you may close this window and re-login");
    }

    @GetMapping(value = "/oauth2/verifyPass")
    public ResponseEntity<String> verifyPass()
    {
        return ResponseEntity.ok().body("Authentication Pass, you may close this window");
    }


    @GetMapping(value = "/oauth2/verify")
	public ResponseEntity<String> oauth2Callback(@RequestParam("username") String username) {

    /*Sample of the returned response: http://localhost:8080/oauth2/callback/google?code=4/0AeaYSHCKrCmvAkSB9oZ-NrwntnLX4DFF4VmL55JO8uJ9EcnAiqulPKbYFdioB7ANPi3-nQ
        &scope=https://www.googleapis.com/auth/calendar.events%20https://www.googleapis.com/auth/calendar*/
        
   
        if(Code != null)
        {
            JsonObject authorizationStatus= Json.createObjectBuilder().add("authorizationStatus" ,true).build();

            Boolean tokenStatus = gcSvc.getToken(Code, username);
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
