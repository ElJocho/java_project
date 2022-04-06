package javaintro.ws21.geoguesser.service;

import javaintro.ws21.geoguesser.RestClient;
import javaintro.ws21.geoguesser.model.City;
import javaintro.ws21.geoguesser.model.Game;
import javaintro.ws21.geoguesser.model.Player;
import javaintro.ws21.geoguesser.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.List;
import java.util.Set;

@Service
public class GameService {

    @Autowired
    private GameRepository repository;
    private CityService cityService;
    private RestClient restClient;

    public Game createGame(Game game){
        return repository.save(game);
    }

    public Game setupNewRound(Game game) {
        City city = cityService.randomCity();
        JSONArray IDs = new JSONArray(restClient.getIDs()); //JSONArray & JSONObject -->
        // wir brauchen coordinates von geojsonbbox von city
        // die Koordinaten liegen in geometry in der geojsonbbox
        final JSONObject obj = new JSONObject(city);
        final JSONArray geodata = obj.getJSONArray("geoboundingbox");
        final int n = IDs.length();
        for (int i = 0; i < n; ++i) {
            JSONObject person = geodata.getJSONObject(i);
            System.out.println(person.getJSONArray("geometry"));
            repository.save(game);
            return game;
        }
        return null;
    }

    public List<Game> getGames(Player player){
        return repository.findDistinctByPlayersOrIsActive(player,false);
    }

    public Game addPlayer(Player player, Integer id){
        Game game = repository.getById(id);
        Set<Player> players = game.getPlayers();
        if (players.size() < game.getMaxPlayers() & player != null){
            players.add(player);
            game.setPlayers(players);
            repository.save(game);
            return game;
        }
        return null;
    }
    public List<Game> findAll(){
        return repository.findAll();
    }

    public Game startGame(Game game){
        game.setActive(true);
        return repository.save(game);
    }

}
