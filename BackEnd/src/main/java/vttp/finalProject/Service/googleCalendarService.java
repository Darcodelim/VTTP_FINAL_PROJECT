package vttp.finalProject.Service;

import java.net.URI;
import java.text.DateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;

import java.awt.Desktop;
import java.net.URI;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.google.api.client.auth.oauth2.AuthorizationCodeRequestUrl;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets.Details;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarRequestInitializer;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import vttp.finalProject.Model.GPT.GPTRequest;
import vttp.finalProject.Model.GPT.GPTResponse;


@Service
public class googleCalendarService {
    @Value("${google.client.id}")
    private String clientId;

    @Value("${google.client.secret}")
    private String clientSecret;

    @Value("${google.client.redirectUri}")
    private String redirectURI;

    @Value("${google.client.API.KEY}")
    private String API_KEY;

    @Value("${Base.URL}")
    private String baseURL;

    RestTemplate restTemplate = new RestTemplate();

    private final static Log logger = LogFactory.getLog(googleCalendarService.class);
	private static final String APPLICATION_NAME = "Final Project Google Calendar";
	private static HttpTransport httpTransport;
	private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
	private static Calendar client;

	GoogleClientSecrets clientSecrets;
	GoogleAuthorizationCodeFlow flow;
	Credential credential;



    public String authorize() throws Exception {
		AuthorizationCodeRequestUrl authorizationUrl;
		if (flow == null) {
			Details web = new Details();
			web.setClientId(clientId);
			web.setClientSecret(clientSecret);
			clientSecrets = new GoogleClientSecrets().setWeb(web);
			httpTransport = GoogleNetHttpTransport.newTrustedTransport();
			Collection<String> scopes =  new HashSet<>();
			scopes.add(CalendarScopes.CALENDAR);
			scopes.add(CalendarScopes.CALENDAR_EVENTS);
			flow = new GoogleAuthorizationCodeFlow.Builder(httpTransport, JSON_FACTORY, clientSecrets,
					scopes).build();
		}
		authorizationUrl = flow.newAuthorizationUrl().setRedirectUri(redirectURI);
		// System.out.println("cal authorizationUrl->" + authorizationUrl);
		return authorizationUrl.build();
	}


    public boolean getToken(String code,String username){

        String message;

        System.out.printf("Username:%s",username);
    try {
        TokenResponse response = flow.newTokenRequest(code).setRedirectUri(redirectURI).execute();
        
        System.out.println(response);
        //The userID can be stated by you, maybe use the email username as the ID
        credential = flow.createAndStoreCredential(response,username);

        
        client = new Calendar.Builder(httpTransport, JSON_FACTORY, credential)
            .setApplicationName(APPLICATION_NAME).build();

           
        
        System.out.printf("client:%s",client.toString());
        
        return true;

    } catch (Exception e) {
        logger.warn("Unable to retrieve token successfully (" + e.getMessage() + ").");


            return false;
        }



    }

    public void setCalendarEvent(String title, String StartDate, String EndDate)throws Exception
    {


        DateTimeFormatter inputFormatter= DateTimeFormatter.ofPattern("dd-MM-yyyy");

        LocalDate inputStartDateFormatted = LocalDate.parse(StartDate,inputFormatter);
           
        LocalDate inputEndDateFormatted = LocalDate.parse(EndDate,inputFormatter);
  
        // Convert formatted dates to milliseconds since Unix epoch
        Instant startInstant = inputStartDateFormatted.atStartOfDay(ZoneOffset.ofHours(8)).toInstant();
        long startMillis = startInstant.toEpochMilli();

        Instant endInstant = inputEndDateFormatted.atStartOfDay(ZoneOffset.ofHours(8)).plusDays(1).minusSeconds(1).toInstant();
        long endMillis = endInstant.toEpochMilli();


        DateTime startDate= new DateTime(startMillis);
        EventDateTime start = new EventDateTime().setDateTime(startDate);//Need to set as "2024-04-20T03:12:18.000+08:00"

        DateTime endDate= new DateTime(endMillis);
        EventDateTime end = new EventDateTime().setDateTime(endDate);//Need to set as "2024-04-20T03:12:18.000+08:00"



        Event event = new Event();
        event.setSummary(title);
        event.setStart(start);
        event.setEnd(end);

  
        client.events().insert("primary", event).execute();
          

    }

    public String getVerifyPassUrl() {
        // Get the base URL from a configuration or environment variable
        
        if (baseURL == null) {
            baseURL = "http://localhost:8080"; // Default to localhost if no base URL is provided
        }
        return baseURL + "/api/oauth2/verifyPass";
    }
    
    public String getVerifyFailUrl() {
        // Get the base URL from a configuration or environment variable
        
        if (baseURL == null) {
            baseURL = "http://localhost:8080"; // Default to localhost if no base URL is provided
        }
        return baseURL + "/api/oauth2/verifyFail";
    }

    public boolean revokeAccessToken()
    {   
        String url ="https://oauth2.googleapis.com/revoke";
        UriComponents urlCom = UriComponentsBuilder.fromUriString(url)
        .queryParam("token", credential.getAccessToken()).build();
        


        RequestEntity<Void> req = RequestEntity.post(urlCom.toString()).header("Content-Type","application/x-www-form-urlencoded").build();
        
        ResponseEntity<String> revokeEntity = null;


        revokeEntity= restTemplate.exchange(req,String.class);

        if (revokeEntity.getStatusCode() ==HttpStatus.OK)
        {    credential = null;
            return true;
           
        }

        else
        {
            return false;
        }

        
    }






}   




