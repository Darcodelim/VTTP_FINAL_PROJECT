package vttp.finalProject.Model.CountriesRegionCity;

import java.util.List;

public class CountriesRegionCities {
    String country;
    List<Regions> regions;
    
    public CountriesRegionCities(String country, List<Regions> regions) {
        this.country = country;
        this.regions = regions;
    }
    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
    }
    public List<Regions> getRegions() {
        return regions;
    }
    public void setRegions(List<Regions> regions) {
        this.regions = regions;
    }
    @Override
    public String toString() {
        return "CountriesRegionCities [country=" + country + ", regions=" + regions + "]";
    }
    
}
