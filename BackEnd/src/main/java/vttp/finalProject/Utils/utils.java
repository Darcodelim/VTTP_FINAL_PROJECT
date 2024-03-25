package vttp.finalProject.Utils;

import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import vttp.finalProject.Model.CountriesRegionCity.Cities;
import vttp.finalProject.Model.CountriesRegionCity.CountriesRegionCities;
import vttp.finalProject.Model.CountriesRegionCity.Regions;

public class utils {
    
    
	public static JsonObject toJsonCountries(CountriesRegionCities cRc) {
        
        JsonObjectBuilder countryBuilder = Json.createObjectBuilder();
    
        // Create an array builder for regions
        JsonArrayBuilder regionsArrayBuilder = Json.createArrayBuilder();


       
        



        for(Regions r : cRc.getRegions())
        {   JsonObjectBuilder regionBuilder = Json.createObjectBuilder();
            regionBuilder.add("region",r.getRegion());
                
            JsonArrayBuilder municipalitiesArrayBuilder = Json.createArrayBuilder();
            for(Cities c: r.getCities())
            {   JsonObject municipality = Json.createObjectBuilder().add("municipal", c.getCity()).add("Iata",c.getIata()).build();
                municipalitiesArrayBuilder.add(municipality);
        }

        regionBuilder.add("municipalities", municipalitiesArrayBuilder);
        regionsArrayBuilder.add(regionBuilder);

        } 

        JsonObject singleCountry = Json.createObjectBuilder()
        .add("country", cRc.getCountry())
        .add("regions", regionsArrayBuilder)
        .build();


        return singleCountry;

	}
}
