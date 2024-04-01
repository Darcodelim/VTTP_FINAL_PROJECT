package vttp.finalProject.Model.Itinerary;

public class ItinerarySql {

    private String ItineraryTitle;
    private String startDate;
    private String endDate;
    private String ItineraryID;
    private String dateCreated;
    
    public ItinerarySql(String itineraryTitle, String startDate, String endDate, String itineraryID,
            String dateCreated) {
        ItineraryTitle = itineraryTitle;
        this.startDate = startDate;
        this.endDate = endDate;
        ItineraryID = itineraryID;
        this.dateCreated = dateCreated;
    }
    
    @Override
    public String toString() {
        return "ItinerarySql [ItineraryTitle=" + ItineraryTitle + ", startDate=" + startDate + ", endDate=" + endDate
                + ", ItineraryID=" + ItineraryID + ", dateCreated=" + dateCreated + "]";
    }

    public String getItineraryTitle() {
        return ItineraryTitle;
    }
    public void setItineraryTitle(String itineraryTitle) {
        ItineraryTitle = itineraryTitle;
    }
    public String getStartDate() {
        return startDate;
    }
    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }
    public String getEndDate() {
        return endDate;
    }
    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
    public String getItineraryID() {
        return ItineraryID;
    }
    public void setItineraryID(String itineraryID) {
        ItineraryID = itineraryID;
    }
    public String getDateCreated() {
        return dateCreated;
    }
    public void setDateCreated(String dateCreated) {
        this.dateCreated = dateCreated;
    }
}
