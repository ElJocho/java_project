package javaintro.ws21.geoguesser.service;

import javaintro.ws21.geoguesser.model.Player;
import javaintro.ws21.geoguesser.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository repository;

    public Iterable<Player> findAll(){
        return repository.findAll();
    }

    public Player signUpPerson(Player player) {
        if (repository.existsByUsername(player.getUsername())){
            return null;
        }
        else {
            return repository.save(player);
        }
    }

    public Player loginPerson(Player request_player){
        Player player = repository.findByUsername(request_player.getUsername());
        if (request_player.getPassword().equals( player.getPassword() )){
            return player;
        }
        else {
            return null;
        }
    }
}
