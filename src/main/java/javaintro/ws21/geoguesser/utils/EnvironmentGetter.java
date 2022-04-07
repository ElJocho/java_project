package javaintro.ws21.geoguesser.utils;

import io.github.cdimascio.dotenv.Dotenv;

public class EnvironmentGetter {
    public String getToken() {
        Dotenv dotenv = Dotenv.load();
        return dotenv.get("TOKEN");
    }
}
