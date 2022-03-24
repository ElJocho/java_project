package javaintro.ws21.geoguesser.repository;

import javaintro.ws21.geoguesser.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer> {
    Player findByUsername(String username);
    boolean existsByUsername(String username);

}
