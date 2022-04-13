package javaintro.ws21.geoguesser.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "player", schema = "imageguesser")
@JsonIgnoreProperties(value={"hibernateLazyInitializer", "handler"})
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer playerId;

    @Column(unique=true)
    private String username;
    private String password;

    @ManyToMany(mappedBy = "players")
    @JsonIgnoreProperties({"players", "images", "cities"})
    private Set<Game> games = new HashSet<>();

    public Integer getPlayerId() {
        return playerId;
    }

    public void setPlayerId(Integer playerId) {
        this.playerId = playerId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public Set<Game> getGames() {
        return games;
    }

    public void setGames(Set<Game> games) {
        this.games = games;
    }
    @Override
    public String toString() {
        return "Player{" +
                "id=" + playerId +
                ", name='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
