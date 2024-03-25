package vttp.finalProject.Model.CountriesRegionCity;

import java.util.List;

public class ListOfCountries {
    
    List<CountriesRegionCities> countriesRegionCitiesList;

    

    public ListOfCountries(List<CountriesRegionCities> countriesRegionCitiesList) {
        this.countriesRegionCitiesList = countriesRegionCitiesList;
    }

    public List<CountriesRegionCities> getCountriesRegionCitiesList() {
        return countriesRegionCitiesList;
    }

    public void setCountriesRegionCitiesList(List<CountriesRegionCities> countriesRegionCitiesList) {
        this.countriesRegionCitiesList = countriesRegionCitiesList;
    }

    
}
