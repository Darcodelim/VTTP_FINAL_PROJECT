package vttp.finalProject.Model.GPT;

import java.util.List;

import jakarta.json.JsonObject;

public class GPTRequest {

    private String model;
    private JsonObject response_format;
    private List<Message> messages;
    private double temperature = 0.9;
    private int max_tokens=4000;
    private double top_p=1;
    private double frequency_penalty=0;
    private double presence_penalty=0;

    public GPTRequest(String model, JsonObject response_format, List<Message> messages) {
        this.model = model;
        this.response_format = response_format;
        this.messages = messages;
    }

    public GPTRequest(String model, List<Message> messages) {
        this.model = model;
        this.messages = messages;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public JsonObject getResponse_format() {
        return response_format;
    }

    public void setResponse_format(JsonObject response_format) {
        this.response_format = response_format;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
    

    public double getTemperature() {
        return temperature;
    }

    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }

    public int getMax_tokens() {
        return max_tokens;
    }

    public void setMax_tokens(int max_tokens) {
        this.max_tokens = max_tokens;
    }

    public double getTop_p() {
        return top_p;
    }

    public void setTop_p(double top_p) {
        this.top_p = top_p;
    }

    public double getFrequency_penalty() {
        return frequency_penalty;
    }

    public void setFrequency_penalty(double frequency_penalty) {
        this.frequency_penalty = frequency_penalty;
    }

    public double getPresence_penalty() {
        return presence_penalty;
    }

    public void setPresence_penalty(double presence_penalty) {
        this.presence_penalty = presence_penalty;
    }

    @Override
    public String toString() {
        return "GPTRequest [model=" + model + ", response_format=" + response_format + ", messages=" + messages + "]";
    }

    
    
}
