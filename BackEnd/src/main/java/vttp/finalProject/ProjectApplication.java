package vttp.finalProject;

import java.io.StringReader;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;


import javax.swing.plaf.synth.Region;

import org.bson.Document;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.JsonValue;
import vttp.finalProject.Model.Itinerary.ItinerarySql;
import vttp.finalProject.Repository.CountryRepo;
import vttp.finalProject.Repository.ItineraryRepo;
import vttp.finalProject.Service.GPTservice;
import vttp.finalProject.Service.googleCalendarService;
import vttp.finalProject.Utils.utils;

@Component
@PropertySource("classpath:application.properties")
@SpringBootApplication
public class ProjectApplication implements CommandLineRunner {

	@Autowired
	CountryRepo countryRepo;

	@Autowired
	MongoTemplate template;

	@Autowired
	ItineraryRepo itineraryRepo;

	@Autowired
	GPTservice gptSvc;

	@Autowired
	googleCalendarService gcSvc;



	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {

		// List<ItinerarySql> itinerarySqls = itineraryRepo.getItineraries("darien@gmail.com");

		// for(ItinerarySql i : itinerarySqls)
		// {
		// 	System.out.println(i.toString());
		// }

		// String objectId = "660e6b094fae265aea0031b8";

		// String itinerary = itineraryRepo.getItineraryMongo(objectId);
		
		// // System.out.println(itinerary);

		// JsonReader reader = Json.createReader(new StringReader(itinerary));
		
		// JsonObject json = reader.readObject();

		// JsonArray Activities= json.getJsonArray("Activities");
		
		// List<String> locationList = new LinkedList<>();
		// for(JsonObject Activity: Activities.getValuesAs(JsonObject.class))
		// {
		// 	String Location = Activity.getString("Location");
		// 	// Activity.

		// 	locationList.add(Location);
		// 	// System.out.println(Location);
		// }

		// String url ="https://www.istockphoto.com/search/2/image";

		// Map<String,String> location_img_Dict = new LinkedHashMap<>(); ////I want the keys stored in the order of insertion

		// for(String l:locationList)
		// {

		// 	UriComponents urlCom = UriComponentsBuilder.fromUriString(url)
		// 	.queryParam("phrase", l).queryParam("orientations","horizontal").build();


		// 	org.jsoup.nodes.Document document = Jsoup.connect(urlCom.toString()).get();
		// 	String cssQuery = "div.WXSgPCrWm85uRYvZAi6U> div.CJsXfu_p4CMCWrH12oB7 > div.QKgHc9ny6wUmRahY5UQL > div.DE6jTiCmOG8IPNVbM7pJ > div.ABVClgVJTdOPXmIa63fN > article.dQVdoWXU4Ax_WWfLo48w > a.Up7tj_EQVFh6e6sV17Ud > figure.DW8dMUa97kDDTC1CKQwe > picture > img.yGh0CfFS4AMLWjEE9W7v";
		// 	Element imageTag = document.select(cssQuery).first();//only get the first photo
		// 	String src = imageTag.attr("src");

		// 	location_img_Dict.put(l,src);

		// }
		
		// String location_img = location_img_Dict.toString();
		// System.out.println(location_img);

		// List<JsonObject> updatedActivities =  new ArrayList<>();

		// for(JsonObject Activity: Activities.getValuesAs(JsonObject.class))
		// {
		// 	String Location = Activity.getString("Location");
		// 	String locationImg = location_img_Dict.get(Location);

		// 	// JsonObject locationObject = Json.createObjectBuilder().add("Image", locationImg).build();
		// 	// JsonValue locationImgJson = locationObject.getString("Image");

		// 	Activity = Json.createObjectBuilder(Activity).add("Image", locationImg).build();

		// 	updatedActivities.add(Activity);
		// 	System.out.println(Activity);
	

		// }

		// JsonArray updatedActivitiesArray = Json.createArrayBuilder(updatedActivities).build();

		// JsonObject jsonUpdatedWithImg = Json.createObjectBuilder(json).remove("Activities").add("Activities",updatedActivitiesArray).build();

		// System.out.println(jsonUpdatedWithImg.toString());


		

		
	
		
		




	}

}
