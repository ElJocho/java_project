package javaintro.ws21.geoguesser.repository;

import javaintro.ws21.geoguesser.model.Game;
import javaintro.ws21.geoguesser.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game,Long> {
    public List<Game> findByPlayersOrIsActive(Player player, boolean isActive);
    //public List<Game> findByIsActive();
}
