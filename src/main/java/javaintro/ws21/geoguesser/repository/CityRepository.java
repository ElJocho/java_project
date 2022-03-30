package javaintro.ws21.geoguesser.repository;

import javaintro.ws21.geoguesser.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {
    @Query("SELECT * FROM imageGuesser.city ORDER BY random() limit 1")
    City randomCity();
}
