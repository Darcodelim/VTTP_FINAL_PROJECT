package vttp.finalProject.Model.CountriesRegionCity;

public class Cities {
    
    String city;
    String Iata;
    
    public Cities(String city, String iata) {
        this.city = city;
        Iata = iata;
    }
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
    public String getIata() {
        return Iata;
    }
    public void setIata(String iata) {
        Iata = iata;
    }
    @Override
    public String toString() {
        return "Cities [city=" + city + ", Iata=" + Iata + "]";
    }
}
