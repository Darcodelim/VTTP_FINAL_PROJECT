package vttp.finalProject.Model.Itinerary;

import java.util.Arrays;

public class UserItinerary {
    private String Email;
    private String ItineraryID[];

    
    public UserItinerary(String email, String[] itineraryID) {
        Email = email;
        ItineraryID = itineraryID;
    }
    
    public String getEmail() {
        return Email;
    }
    public void setEmail(String email) {
        Email = email;
    }
    public String[] getItineraryID() {
        return ItineraryID;
    }
    public void setItineraryID(String[] itineraryID) {
        ItineraryID = itineraryID;
    }

    @Override
    public String toString() {
        return "UserItinerary [Email=" + Email + ", ItineraryID=" + Arrays.toString(ItineraryID) + "]";
    }

    
}
