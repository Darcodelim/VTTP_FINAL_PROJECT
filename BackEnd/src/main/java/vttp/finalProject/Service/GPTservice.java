package vttp.finalProject.Service;

import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import vttp.finalProject.Model.GPT.GPTRequest;
import vttp.finalProject.Model.GPT.GPTResponse;
import vttp.finalProject.Model.GPT.Message;

@Service
public class GPTservice {

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String url;

    @Value("${openai.api.key}")
    private String apiKey;

    public String chatOutput(String prompt) throws Exception
    {
        //Message
        Message sysMessage = new Message("system","You will be asked to create a tour itinerary of any country and cities around the world or edit existing itinerary. The result output would be in this JSON format: \"Country\":\"Name of the country\",\"Region\":\"Name of the region\",\"Municipal\":\"Name of the Municipal or City if it is mentioned in the prompt\",\"Duration\":\"Number of Days,Put in this format:number Days\",\"Start_Date\":\"DD-MM-YY\",\"End _Date\":\"DD-MM-YY\",\"Actitivies\":[{\"Day\":\"which day\", \"Date\":\"the date of the day\",\"Location\":\"location of highlights, if the municipal/city and region is the same the name of location MUST differ from the municipal/city and region\",\"Highlights\":[\"description of highlights\"]}]");
        
        
        
        Message userMessage = new Message("user", prompt);
        List<Message> messages = new ArrayList<>();
        messages.add(sysMessage);
        messages.add(userMessage);

        RestTemplate aiTemplate = new RestTemplate();

        JsonObject response_format = Json.createObjectBuilder().add("type", "json_object").build();

        GPTRequest GPTRequest = new GPTRequest(model,response_format ,messages);

        JsonArrayBuilder messageArrayBuilder = Json.createArrayBuilder();

        for(Message message : GPTRequest.getMessages())
        {
            messageArrayBuilder.add(Json.createObjectBuilder().add("role",message.getRole()).add("content",message.getContent()).build());
        }

        JsonObject jsonBody = Json.createObjectBuilder()
        .add("model",GPTRequest.getModel())
        .add("response_format",GPTRequest.getResponse_format())
        .add("messages",messageArrayBuilder.build())
        .add("temperature",GPTRequest.getTemperature())
        .add("max_tokens",GPTRequest.getMax_tokens())
        .add("top_p",GPTRequest.getTop_p())
        .add("frequency_penalty",GPTRequest.getFrequency_penalty())
        .add("presence_penalty",GPTRequest.getPresence_penalty()).build();

        RequestEntity<String> req = RequestEntity.post(url).header("Content-Type","application/json").header("Authorization", "Bearer " + apiKey).body(jsonBody.toString());
        
        ResponseEntity<GPTResponse> gptRespEntity = null;


        gptRespEntity = aiTemplate.exchange(req,GPTResponse.class);

     
        
        GPTResponse gptResp = gptRespEntity.getBody();

        String choiceMessage = gptResp.getChoices().get(0).getMessage().getContent();

        String reconstructedJsonStringWithImg = webScrapAndRecontruction(choiceMessage);


        return reconstructedJsonStringWithImg;


    }


    public String webScrapAndRecontruction(String choiceMessage)throws IOException
    {

		JsonReader reader = Json.createReader(new StringReader(choiceMessage));
		JsonObject json = reader.readObject();
		JsonArray Activities= json.getJsonArray("Activities");
		
		List<String> locationList = new LinkedList<>();
		for(JsonObject Activity: Activities.getValuesAs(JsonObject.class))
		{
			String Location = Activity.getString("Location");
			// Activity.

			locationList.add(Location);
			// System.out.println(Location);
		}

		String url ="https://www.istockphoto.com/search/2/image";
		Map<String,String> location_img_Dict = new LinkedHashMap<>(); ////I want the keys stored in the order of insertion
		for(String l:locationList)
		{
            //Set up the URI 
			UriComponents urlCom = UriComponentsBuilder.fromUriString(url)
			.queryParam("phrase", l).queryParam("orientations","horizontal").build();

            //WebScrapping and get IMG 
			Document document = Jsoup.connect(urlCom.toString()).get();
			String cssQuery = "div.WXSgPCrWm85uRYvZAi6U> div.CJsXfu_p4CMCWrH12oB7 > div.QKgHc9ny6wUmRahY5UQL > div.DE6jTiCmOG8IPNVbM7pJ > div.ABVClgVJTdOPXmIa63fN > article.dQVdoWXU4Ax_WWfLo48w > a.Up7tj_EQVFh6e6sV17Ud > figure.DW8dMUa97kDDTC1CKQwe > picture > img.yGh0CfFS4AMLWjEE9W7v";
			Element imageTag = document.select(cssQuery).first();//only get the first photo
			String src = imageTag.attr("src");

			location_img_Dict.put(l,src);

		}
		
		// String location_img = location_img_Dict.toString();
		// System.out.println(location_img);

		List<JsonObject> updatedActivities =  new ArrayList<>();

		for(JsonObject Activity: Activities.getValuesAs(JsonObject.class))
		{
			String Location = Activity.getString("Location");
			String locationImg = location_img_Dict.get(Location);

            //Creating Object Builder with existing Json Object Activity
			Activity = Json.createObjectBuilder(Activity).add("Image", locationImg).build();
			updatedActivities.add(Activity);

			// System.out.println(Activity);
	

		}

		JsonArray updatedActivitiesArray = Json.createArrayBuilder(updatedActivities).build();

		JsonObject jsonUpdatedWithImg = Json.createObjectBuilder(json).remove("Activities").add("Activities",updatedActivitiesArray).build();

		System.out.println(jsonUpdatedWithImg.toString());

        return jsonUpdatedWithImg.toString();
    }

}
