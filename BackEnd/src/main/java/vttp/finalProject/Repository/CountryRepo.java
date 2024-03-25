package vttp.finalProject.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import vttp.finalProject.Model.CountriesRegionCity.Cities;
import vttp.finalProject.Model.CountriesRegionCity.CountriesRegionCities;
import vttp.finalProject.Model.CountriesRegionCity.Regions;

@Repository
public class CountryRepo {
    
    @Autowired
    private MongoTemplate template;


    public List<CountriesRegionCities> getAllCountryData()
    {
       List<Document> allCountryData =  template.findAll(Document.class, "SortedCountryRegionCity");

      // Criteria criteria = Criteria.where("_id").is("Afghanistan");
      // Query query = Query.query(criteria);
      //  List<Document> allCountryData =  template.find(query,Document.class,"SortedCountryRegionCity");
       List<CountriesRegionCities> countriesList = new ArrayList<>();

       for(Document d: allCountryData)
       {
        String region;
        List<Document> municipalities;
        String municipality;
        String iata_code;
       
        List<Regions> regionList = new ArrayList<>();

         String country = d.getString("_id");
         List<Document> regions= d.getList("regions", Document.class);
         

         for(Document r: regions)
         {
            region =  r.get("region").toString();
            municipalities= r.getList("municipalities", Document.class);
            List<Cities> citiesList = new ArrayList<>();

            for(Document m : municipalities)
            {
                 municipality = m.get("municipality").toString();
                 iata_code = m.get("iata_codes").toString();
                 Cities cities = new Cities(municipality, iata_code);

                 citiesList.add(cities);
            }

          Regions regionsObj = new Regions(region, citiesList);
          regionList.add(regionsObj);

         }
         
         
         CountriesRegionCities countriesRegionCities = new CountriesRegionCities(country, regionList);
         countriesList.add(countriesRegionCities);


       }
       
       return countriesList;
    }

}
