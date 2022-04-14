package javaintro.ws21.geoguesser.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "player", schema = "imageguesser")
@JsonIgnoreProperties(value={"hibernateLazyInitializer", "handler"})
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer playerId;

    @Column(unique=true)
    private String name;
    private String password;

    @ManyToMany(mappedBy = "players")
    @JsonIgnoreProperties({"players", "images", "cities"})
    private List<Game> games = new ArrayList<>();

    public Integer getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public List<Game> getGames() {
        return games;
    }

    public void setGames(List<Game> games) {
        this.games = games;
    }
    @Override
    public String toString() {
        return "Player{" +
                "id=" + playerId +
                ", name='" + name + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
