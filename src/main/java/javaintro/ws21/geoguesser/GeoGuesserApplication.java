package javaintro.ws21.geoguesser;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableAutoConfiguration
public class GeoGuesserApplication {
	public static void main(String[] args) {
		SpringApplication.run(GeoGuesserApplication.class, args);
	}
}
