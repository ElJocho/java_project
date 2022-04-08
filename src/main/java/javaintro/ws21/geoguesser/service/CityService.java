package javaintro.ws21.geoguesser.service;

import javaintro.ws21.geoguesser.model.City;
import javaintro.ws21.geoguesser.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CityService {

    @Autowired
    private CityRepository repository;

    public City randomCity(List<Integer> alreadyUsedCityIds){
        return repository.randomCity(alreadyUsedCityIds);
    }

}
