package javaintro.ws21.geoguesser.service;

import javaintro.ws21.geoguesser.utils.PointCalculator;
import javaintro.ws21.geoguesser.utils.RestClient;
import javaintro.ws21.geoguesser.model.City;
import javaintro.ws21.geoguesser.model.Game;
import javaintro.ws21.geoguesser.model.Player;
import javaintro.ws21.geoguesser.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.*;

@Service
public class GameService {

    @Autowired
    private GameRepository repository;

    @Autowired
    private CityService cityService;

    @Autowired
    private PlayerService playerService;

    private final RestClient restClient = new RestClient();

    private final PointCalculator pointCalculator = new PointCalculator();

    public Game createGame(Game game){
        return repository.save(game);
    }

    public Game setupNewRound(Game game) {
        StringBuilder coordinateStringBuilder = new StringBuilder();

        // get city and convert bbox to format mapillary requires
        Set<City> cities = game.getCities();
        List<Integer> alreadyUsedCityIds = new ArrayList<>();

        cities.forEach(city -> {alreadyUsedCityIds.add(city.getId());});

        // prevents bug where randomCity returns null when alreadyUsedCityIds is empty
        alreadyUsedCityIds.add(-1);

        City city = cityService.randomCity(alreadyUsedCityIds);
        JSONObject feature = new JSONObject(city.getGeojsonBBox());
        JSONArray coordinates = feature.getJSONArray("coordinates").getJSONArray(0);
        System.out.println(coordinates);
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

        // request image ids with bbox string and save them to game
        JSONArray answer = new JSONObject(restClient.getIDs(coordinateString)).getJSONArray("data");
        System.out.println(answer);

        List<Long> images = game.getImages();
        for (int i = 0; i< answer.length(); i++){
            long id = Long.parseLong(answer.getJSONObject(i).getString("id"));
            images.add(id);
        }
        game.setImages(images);

        // add city to cities list
        cities.add(city);
        game.setCities(cities);

        // setup point list for next round
        int num_player = game.getPlayers().size();
        List<Float> points = game.getPoints();
        for (int i = 0; i < num_player; i++){
            points.add(-1.f);
        }
        game.setPoints(points);

        // save changes to db and return updated game
        return repository.save(game);
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
            return repository.save(game);
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

    public Game commitGuess(Game game, int player_id, float x, float y){
        Player player = playerService.getById(player_id);
        int currentRound = game.getCities().size();

        // check for location of playerid in player list
        List<Player> players = new ArrayList<>(game.getPlayers());
        int num_players = players.size();
        int position_current_player = 0;
        for (int i = 0; i<num_players; i++){
            if (players.get(i).getPlayerId().equals(player.getPlayerId())){
                position_current_player = i;
            }
        }

        int index_of_current_player_and_round = (currentRound-1)*(num_players) + position_current_player;
        List<Float> points = game.getPoints();

        // instead of 2.5 call point function here with x,y and city bbox input
        // if clause prevents cheating/bugs/correcting guesses
        String bbox = new ArrayList<City>(game.getCities()).get(currentRound-1).getGeojsonBBox();
        if (points.get(index_of_current_player_and_round).equals(-1f)){
            points.set(index_of_current_player_and_round, pointCalculator.calculate(x,y, bbox));
        }
        game.setPoints(points);
        repository.save(game);

        if (! points.contains(-1.f) & currentRound != game.getRounds()){
            game = setupNewRound(game);
        }
        return game;
    }
}
