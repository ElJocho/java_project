package javaintro.ws21.geoguesser.service;

import javaintro.ws21.geoguesser.model.City;
import javaintro.ws21.geoguesser.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CityService {

    @Autowired
    private CityRepository repository;

    public City randomCity(){
        return repository.randomCity();
    }

}
