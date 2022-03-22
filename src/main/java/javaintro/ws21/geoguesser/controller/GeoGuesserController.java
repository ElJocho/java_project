package javaintro.ws21.geoguesser.controller;

import javaintro.ws21.geoguesser.model.Player;
import javaintro.ws21.geoguesser.repository.PlayerRepository;
import javaintro.ws21.geoguesser.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class GeoGuesserController {

    @Autowired
    private PlayerService playerService;

    @PostMapping(value="/create_player", produces= MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.APPLICATION_JSON_VALUE)
    public Player createPlayer(@RequestBody Player player){
        return playerService.signUpPerson(player);
    }

    @PostMapping(value="/login_player", produces= MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.APPLICATION_JSON_VALUE)
    public Player loginPlayer(@RequestBody Player player){
        return playerService.loginPerson(player);
    }


    @GetMapping(value="/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Player> listPlayers(){
        return playerService.findAll();
    }
}
