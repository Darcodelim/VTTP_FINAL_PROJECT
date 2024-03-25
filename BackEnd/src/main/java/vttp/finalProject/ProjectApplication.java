package vttp.finalProject;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.swing.plaf.synth.Region;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.MongoTemplate;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import vttp.finalProject.Model.CountriesRegionCity.Cities;
import vttp.finalProject.Model.CountriesRegionCity.CountriesRegionCities;
import vttp.finalProject.Model.CountriesRegionCity.Regions;
import vttp.finalProject.Repository.CountryRepo;
import vttp.finalProject.Utils.utils;

@SpringBootApplication
public class ProjectApplication implements CommandLineRunner {

	@Autowired
	CountryRepo countryRepo;

	@Autowired
	MongoTemplate template;
	public static void main(String[] args) {
		SpringApplication.run(ProjectApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// List<CountriesRegionCities> countryList = countryRepo.getAllCountryData();


		// // System.out.println(countryList);

		// JsonArrayBuilder allCountriesArray = Json.createArrayBuilder();

		// countryList.stream().forEach(country-> allCountriesArray.add(utils.toJsonCountries(country)));

	
		// System.out.println(allCountriesArray.build().toString() );
	}

}
