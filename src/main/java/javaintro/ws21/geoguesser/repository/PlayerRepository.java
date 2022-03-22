package javaintro.ws21.geoguesser.repository;

import javaintro.ws21.geoguesser.model.Player;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends CrudRepository<Player,Long> {
    Player findByUsername(String username);
    boolean existsByUsername(String username);

}
