package javaintro.ws21.geoguesser;

// Code from https://www.geodatasource.com/developers/java

import javaintro.ws21.geoguesser.model.Game;

import java.util.Arrays;

public class Points {
    private static Object LatLong;
    public static void main (String[] args) throws java.lang.Exception
    {
        double[] centroidCoordinates = centroid(31.9697, -96.8032, 29.4676, -98.5331);
        double DistanceofPoints = (distance(31.9697, -96.8032, centroidCoordinates[0], centroidCoordinates[1]));
        System.out.println("You have " + CalculatePointsofGame(DistanceofPoints) + " points");
    }
    private static int CalculatePointsofGame(double DistancetoCentroid) {
        int GamePoints = 0;
        if (DistancetoCentroid < 20){
            GamePoints = 100;
        }
        else if (DistancetoCentroid > 20 && DistancetoCentroid < 50){
            GamePoints = 50;
        }
        else if (DistancetoCentroid > 50 && DistancetoCentroid < 100){
            GamePoints = 25;
        }
        else if (DistancetoCentroid > 100 && DistancetoCentroid < 500){
            GamePoints = 10;
        }
        else if (DistancetoCentroid > 500){
            GamePoints = 0;
        }
        return GamePoints;
    }
    private static double distance(double lat1, double lon1, double lat2, double lon2) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            double theta = lon1 - lon2;
            double dist = Math.sin(Math.toRadians(lat1)) * Math.sin(Math.toRadians(lat2)) + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.cos(Math.toRadians(theta));
            dist = Math.acos(dist);
            dist = Math.toDegrees(dist);
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344;
            return (dist);
        }
    }
    private static double[] centroid (double lat1, double lon1, double lat2, double lon2) {
        double xmax = 0;
        double xmin = 0;
        double ymax = 0;
        double ymin = 0;
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return null;
        }
        else {
            if (lat1 > lat2){
                xmax = lat1;
                xmin = lat2;
            }
            else {
                xmax = lat2;
                xmin = lat1;
            }
            if (lon1 > lon2){
                ymax = lon1;
                ymin = lon2;
            }
            else {
                ymax = lon2;
                ymin = lon1;
            }
            double xcenter = (xmax + xmin)/2;
            double ycenter = (ymax + ymin)/2;
            double[] myList = {xcenter, ycenter};
            return myList;
        }
    }
}

