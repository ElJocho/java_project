package javaintro.ws21.geoguesser.controller;

import javaintro.ws21.geoguesser.model.Player;
import javaintro.ws21.geoguesser.repository.PlayerRepository;
import javaintro.ws21.geoguesser.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GeoGuesserController {

    @Autowired
    private PlayerService playerService;

    @PostMapping(value="/create_player", produces= MediaType.APPLICATION_JSON_VALUE, consumes=MediaType.APPLICATION_JSON_VALUE)
    public Player createPlayer(@RequestBody Player player){
        return playerService.saveUpdatePerson(player);
    }

    @GetMapping(value="/list", produces = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Player> listPlayers(){
        return playerService.findAll();
    }
}
