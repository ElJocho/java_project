package javaintro.ws21.geoguesser.controller;

import javaintro.ws21.geoguesser.model.Game;
import javaintro.ws21.geoguesser.model.Player;
import javaintro.ws21.geoguesser.service.GameService;
import javaintro.ws21.geoguesser.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class GeoGuesserController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private GameService gameService;

    @PostMapping(value="/create_player", produces= MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.APPLICATION_JSON_VALUE)
    public Player createPlayer(@RequestBody Player player){
        return playerService.signUpPerson(player);
    }

    @PostMapping(value="/login_player", produces= MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.APPLICATION_JSON_VALUE)
    public Player loginPlayer(@RequestBody Player player){
        return playerService.loginPerson(player);
    }

    @PostMapping(value="/create_game", produces= MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.APPLICATION_JSON_VALUE)
    public Game createGame(@RequestBody Game game){
        return gameService.createGame(game);
    }

    @GetMapping(value="/get_games", produces=MediaType.APPLICATION_JSON_VALUE)
    public List<Game> getGames(@RequestBody Player player){
        return gameService.getGames(player);
    }

    @GetMapping(value="/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Player> listPlayers(){
        return playerService.findAll();
    }
}
