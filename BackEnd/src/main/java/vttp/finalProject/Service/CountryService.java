package vttp.finalProject.Service;

import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vttp.finalProject.Model.CountriesRegionCity.CountriesRegionCities;
import vttp.finalProject.Repository.CountryRepo;

@Service
public class CountryService {
    @Autowired
    CountryRepo countryRepo;


    public List<CountriesRegionCities> getAllCountryData()
    {
        return countryRepo.getAllCountryData();
    }

}
