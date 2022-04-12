package javaintro.ws21.geoguesser.utils;

import org.gdal.ogr.Geometry;
import org.gdal.osr.SpatialReference;


public class PointCalculator {
    public static float calculate(float x, float y, String bbox) {
        SpatialReference sr = new SpatialReference();
        sr.SetWellKnownGeogCS("EPSG:3857");
        Geometry polygon = Geometry.CreateFromJson("{ \"type\": \"Feature\",\"properties\": {},\"geometry\": {\"type\": \"Polygon\",\"coordinates\": [[[8.672847747802734,49.40248419041755],[8.692073822021484,49.40248419041755],[8.692073822021484,49.41521715392556],[8.672847747802734,49.41521715392556],[8.672847747802734,49.40248419041755]]]}}");
        Geometry point = Geometry.CreateFromWkt(String.format("Point(%f %f)",x, y));
        point.TransformTo(sr);
        polygon.TransformTo(sr);
        if (polygon.Contains(point)){
            return 10f;
        }
        else {
            float distance = (float)point.Distance(polygon)/1000;
            if (distance > 500){
                return 0;
            }
            else{
                return 5 - distance%100;
            }
        }
    }
}