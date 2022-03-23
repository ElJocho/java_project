package javaintro.ws21.geoguesser.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "game", schema = "imageguesser")
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer gameId;

    private String name;
    private int rounds;
    private int maxPlayers;
    private int winner;
    private int ownerId;
    private boolean isActive;

    @ElementCollection
    private List<Integer> images;

    @ElementCollection
    private List<Float> Points;

    @ManyToMany
    @JoinTable(
            name = "game_city",
            schema = "imageguesser",
            joinColumns = @JoinColumn(name = "cityId"),
            inverseJoinColumns = @JoinColumn(name = "gameId"))
    private Set<City> cities = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "player_game",
            schema = "imageguesser",
            joinColumns = @JoinColumn(name = "gameId"),
            inverseJoinColumns = @JoinColumn(name = "playerId"))
    private Set<Player> players = new HashSet<>();

    public Integer getGameId() {
        return gameId;
    }

    public void setGameId(Integer gameId) {
        this.gameId = gameId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRounds() {
        return rounds;
    }

    public void setRounds(int rounds) {
        this.rounds = rounds;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public int getMaxPlayers() {
        return maxPlayers;
    }

    public void setMaxPlayers(int maxPlayers) {
        this.maxPlayers = maxPlayers;
    }

    public int getWinner() {
        return winner;
    }

    public void setWinner(int winner) {
        this.winner = winner;
    }

    public int getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(int ownerId) {
        this.ownerId = ownerId;
    }

    public List<Integer> getImages() {
        return images;
    }

    public void setImages(List<Integer> images) {
        this.images = images;
    }

    public Set<City> getCities() {
        return cities;
    }

    public void setCities(Set<City> cities) {
        this.cities = cities;
    }

    public List<Float> getPoints() {
        return Points;
    }

    public void setPoints(List<Float> points) {
        Points = points;
    }

    public Set<Player> getPlayers() {
        return players;
    }

    public void setPlayers(Set<Player> players) {
        this.players = players;
    }
}
