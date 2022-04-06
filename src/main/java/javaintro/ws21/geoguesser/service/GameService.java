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

    @Autowired
    private CityService cityService;

    private final RestClient restClient = new RestClient();

    public Game createGame(Game game){
        return repository.save(game);
    }

    public Game setupNewRound(Game game) {
        StringBuilder coordinateStringBuilder = new StringBuilder();
        City city = cityService.randomCity();

        JSONObject feature = new JSONObject(city.getGeojsonBBox());
        JSONArray coordinates = feature.getJSONObject("geometry").getJSONArray("coordinates").getJSONArray(0);
        for (int i = 0; i < coordinates.length(); ++i) {
            if (i == 0 | i == 2){
                JSONArray xy = coordinates.getJSONArray(i);
                for (int c=0; c<xy.length(); c++){
                    String element = String.valueOf(xy.getFloat(c));
                    coordinateStringBuilder.append(element).append(",");
                }
            }
        }
        coordinateStringBuilder.deleteCharAt(coordinateStringBuilder.length() - 1);;
        String coordinateString = coordinateStringBuilder.toString();
        JSONArray answer = new JSONObject(restClient.getIDs(coordinateString)).getJSONArray("data");

        List<Long> images = game.getImages();

        for (int i = 0; i< answer.length(); i++){
            long id = Long.parseLong(answer.getJSONObject(i).getString("id"));
            images.add(id);
        }
        game.setImages(images);
        Set<City> cities = game.getCities();
        cities.add(city);
        game.setCities(cities);
        repository.save(game);
        return game;
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
        game = setupNewRound(game);
        return game;
    }

}
