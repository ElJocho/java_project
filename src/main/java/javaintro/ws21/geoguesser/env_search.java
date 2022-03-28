package javaintro.ws21.geoguesser;

import io.github.cdimascio.dotenv.Dotenv;
import io.github.cdimascio.dotenv.DotenvException;

public class env_search {
    public static void main(String[] args) {
        Dotenv dotenv = null;
        dotenv = Dotenv.configure().load();
        System.out.println(String.format(
                "Hello World. Shell is: %s. Name is: %s",
                System.getenv("SHELL"),
                dotenv.get("NAME")
        ));
    }
}
