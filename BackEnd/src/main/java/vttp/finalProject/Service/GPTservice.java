package vttp.finalProject.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
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
        Message sysMessage = new Message("system","You will be asked to create a tour itinerary of any country and cities around the world or edit existing itinerary. The result output would be in this JSON format: \"Country\":\"Name of the country\",\"Region\":\"Name of the region\",\"Duration\":\"Number of Days,Put in this format:number Days\",\"Start_Date\":\"DD-MM-YY\",\"End _Date\":\"DD-MM-YY\",\"Actitivies\":[{\"Day\":\"which day\", \"Date\":\"the date of the day\",\"Location\":\"location of highlights\",\"Highlights\":[\"description of highlights\"]}]");
        
        
        
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


        return choiceMessage;


    }
}
