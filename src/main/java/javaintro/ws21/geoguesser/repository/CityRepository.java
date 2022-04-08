package javaintro.ws21.geoguesser.repository;

import javaintro.ws21.geoguesser.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {
    @Query(nativeQuery = true, value="SELECT id, geojsonBBox, name FROM imageGuesser.city where id not in (:alreadyUsedCityIds) ORDER BY random() limit 1")
    City randomCity(List<Integer> alreadyUsedCityIds);
}
