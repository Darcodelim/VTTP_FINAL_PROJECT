package vttp.finalProject.Controller;

import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import vttp.finalProject.Model.CountriesRegionCity.CountriesRegionCities;
import vttp.finalProject.Service.CountryService;
import vttp.finalProject.Utils.utils;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CountryController {
    
    @Autowired
    CountryService countrySvc;

    @GetMapping("getAll")
    public ResponseEntity<String> getAllCountryInfo()
    {

        List<CountriesRegionCities> countryList = countrySvc.getAllCountryData();

        JsonArrayBuilder allCountriesArray = Json.createArrayBuilder();

		countryList.stream().forEach(country-> allCountriesArray.add(utils.toJsonCountries(country)));

        System.out.println("Calling Country API");

        return ResponseEntity.ok(allCountriesArray.build().toString());

    }
}
