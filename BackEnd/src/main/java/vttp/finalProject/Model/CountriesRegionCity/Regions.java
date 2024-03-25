package vttp.finalProject.Model.CountriesRegionCity;

import java.util.List;

public class Regions {
    String region;
    List<Cities> cities;

    
    public Regions(String region, List<Cities> cities) {
        this.region = region;
        this.cities = cities;
    }
    
    public String getRegion() {
        return region;
    }
    public void setRegion(String region) {
        this.region = region;
    }
    public List<Cities> getCities() {
        return cities;
    }
    public void setCities(List<Cities> cities) {
        this.cities = cities;
    }

    @Override
    public String toString() {
        return "Regions [region=" + region + ", cities=" + cities + "]";
    }

    
}
