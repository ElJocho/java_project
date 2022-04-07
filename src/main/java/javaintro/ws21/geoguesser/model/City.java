package javaintro.ws21.geoguesser.model;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "city", schema = "imageguesser")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length=1000)
    private String geojsonBBox;

    private String name;

    @ManyToMany(mappedBy = "cities")
    private Set<Game> games = new HashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Game> getGames() {
        return games;
    }

    public void setGames(Set<Game> games) {
        this.games = games;
    }

    public String getGeojsonBBox() {
        return geojsonBBox;
    }

    public void setGeojsonBBox(String geojsonBBox) {
        this.geojsonBBox = geojsonBBox;
    }

    @Override
    public String toString() {
        return "City{" +
                "id=" + id +
                ", name='" + name + "'}";
    }

}
