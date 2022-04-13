package javaintro.ws21.geoguesser.utils;

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


public class PointCalculator {
    // holy shit, this can't be the best way :D
    public float calculate(float x, float y, String bbox) {
        GeometryFactory geometryFactory = JTSFactoryFinder.getGeometryFactory(null);
        // point arrives long/lat not lat/long
        Coordinate guess_coord = new Coordinate(y, x);
        Point guess_point = geometryFactory.createPoint(guess_coord);

        GeometryJSON geometryJson = new GeometryJSON(15);
        FeatureJSON featureJson = new FeatureJSON(geometryJson);
        SimpleFeature city_bbox = null;
        try{
            Reader stringReader = new StringReader(bbox);
            city_bbox = featureJson.readFeature(stringReader);
            stringReader.close();
        }
        catch (IOException e) {
            System.out.println(e.getMessage());
        }
        Polygon city_poly = (Polygon) city_bbox.getDefaultGeometry();
        if(city_poly.contains(guess_point)){
            return 10f;
        }

        LocationIndexedLine city_outerline = new LocationIndexedLine(city_poly.getExteriorRing());
        LinearLocation closest_to_point_on_line = city_outerline.project(guess_coord);
        Coordinate closest_point = city_outerline.extractPoint(closest_to_point_on_line);

        DefaultGeographicCRS crs = DefaultGeographicCRS.WGS84;
        GeodeticCalculator geo_calc = new GeodeticCalculator(crs);
        geo_calc.setStartingGeographicPoint(closest_point.getX(), closest_point.getY());
        geo_calc.setDestinationGeographicPoint(guess_point.getX(), guess_point.getY());

        double distance_km = geo_calc.getOrthodromicDistance()/1000;
        if (distance_km > 500){
            return 0;
        }
        return (float) (5 - distance_km/100);
    }
}