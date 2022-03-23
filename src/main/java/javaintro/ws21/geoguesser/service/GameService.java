package javaintro.ws21.geoguesser.service;

import javaintro.ws21.geoguesser.model.Game;
import javaintro.ws21.geoguesser.model.Player;
import javaintro.ws21.geoguesser.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository repository;

    public Game createGame(Game game){
        return repository.save(game);
    }

    public List<Game> getGames(Player player){
        return repository.findByPlayersOrIsActive(player,false);
    }


    public List<Game> findAll(){
        return repository.findAll();
    }

}
