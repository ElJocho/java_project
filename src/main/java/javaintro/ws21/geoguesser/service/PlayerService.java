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

    public Player saveUpdatePerson(Player player) {
        return repository.save(player);
    }
}
