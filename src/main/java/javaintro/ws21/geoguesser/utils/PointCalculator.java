package javaintro.ws21.geoguesser.utils;

import javaintro.ws21.geoguesser.model.Player;
import org.geotools.geojson.feature.FeatureJSON;
import org.geotools.geojson.geom.GeometryJSON;
import org.geotools.geometry.jts.JTSFactoryFinder;
import org.geotools.referencing.GeodeticCalculator;
import org.geotools.referencing.crs.DefaultGeographicCRS;
import org.locationtech.jts.geom.*;
import org.locationtech.jts.linearref.LinearLocation;
import org.locationtech.jts.linearref.LocationIndexedLine;
import org.opengis.feature.simple.SimpleFeature;
import java.io.IOException;
import java.io.Reader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;


public class PointCalculator {
    // holy shit, this can't be the best way :D
    public float calculate(float x, float y, String bbox) {
        GeometryFactory geometryFactory = JTSFactoryFinder.getGeometryFactory(null);
        // point arrives long/lat not lat/long
        Coordinate guess_coord = new Coordinate(y, x);
        Point guess_point = geometryFactory.createPoint(guess_coord);

        GeometryJSON geometryJson = new GeometryJSON(15);
        Polygon city_bbox = null;
        try{
            Reader stringReader = new StringReader(bbox);
            city_bbox = geometryJson.readPolygon(stringReader);
            stringReader.close();
        }
        catch (IOException e) {
            System.out.println(e.getMessage());
        }

        if(city_bbox.contains(guess_point)){
            return 10f;
        }

        LocationIndexedLine city_outerline = new LocationIndexedLine(city_bbox.getExteriorRing());
        LinearLocation closest_to_point_on_line = city_outerline.project(guess_coord);
        Coordinate closest_point = city_outerline.extractPoint(closest_to_point_on_line);

        DefaultGeographicCRS crs = DefaultGeographicCRS.WGS84;
        GeodeticCalculator geo_calc = new GeodeticCalculator(crs);
        geo_calc.setStartingGeographicPoint(closest_point.getX(), closest_point.getY());
        geo_calc.setDestinationGeographicPoint(guess_point.getX(), guess_point.getY());

        double distance_km = geo_calc.getOrthodromicDistance()/1000;
        if (distance_km > 1000){
            return 0;
        }
        return (float) (10 - distance_km/100);
    }

    public int calculateWinner(List<Float> points, List<Player> players, int num_players){
        // sum up points for each player
        List<Float> points_clone = new ArrayList<>(points);
        List<Float> sum_points = new ArrayList<>(Collections.nCopies(num_players, 0f));
        while(points_clone.size()!=0){
            for (int x = 0; x<players.size(); x++){
                sum_points.set(x, sum_points.get(x) + points_clone.remove(0));
            }
        }

        // find index of the highest sum
        int maxAt = 0;
        for (int i = 0; i < sum_points.size(); i++) {
            maxAt = sum_points.get(i) > sum_points.get(maxAt) ? i : maxAt;
        }
        // return player at index of the highest sum
        return players.get(maxAt).getPlayerId();
    }
}