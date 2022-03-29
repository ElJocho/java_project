# Conceptual
- [x] Cities
- [mapillary](https://www.mapillary.com/developer/api-documentation) works propably
- need a pool of cities (20+?) with manual bboxes in them
- 3 pictures/locations inside of bbox

- [x] Multiplayer and Singleplayer
- how can we sync games? -> __turnbased__ not realtime but with manual refresh

- [x] point calculation system -> [gdal for java](https://gdal.org/api/java/index.html)
- based on distance -> full points in bb, decreasing with distance away from bb
- IDW?

# Technical
- [ ] calculation of distance between location and guess
- JAVA: **function** calculate_score(guess, bbox) -> full points for inside, less/decreasing for outside
- [x] Login completion
- JS: call to backend
- JAVA: confirm existing/correct username/passwort
- [x] Overview page over current and past games
- JS: Games View -> Open Lobbies, active Games, old Games
- [x] game creation
- JS: open game button
- JS: Lobby -> host + other players, players can join, host can start. Host can determine the number of rounds (up to 20?).
- JS: **function** update data -> get all games, compare if player already made a guess for newest city, if no, show guess view.
- JAVA: get all games with player x
- JAVA: **endpoint** add player to game -
- JAVA: **endpoint** create game -> save game to db
- JAVA: **endpoint** start game -> get_new_city
- JAVA: **function** get_new_city - request random city not in the game, and query imageIds from mapillary, save to db
- JAVA: **endpoint** commit_guess - compare guess with city boundaries/distance and return points -> get_new_city (hat der letzte den guess commited)
