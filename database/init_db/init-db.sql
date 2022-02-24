create schema if not exists imageGuesser;
set search_path to imageGuesser, public, postgis;

create table player (
  id SERIAL,
  username varchar(20) unique,
  password varchar(100),
  primary key(id)
);

create table game (
  id SERIAL,
  cities int[], -- references city (id),
  winner int, -- references user (id)
  active boolean, -- game closed or open
  primary key(id)
);

create table city (
    id SERIAL,
    name varchar(100),
    image bytea,
    centroid geometry,
    primary key (id)
);

create table player_in_game (
    player_id int ,
    game_id int,
    primary key (player_id, game_id),
    foreign key (player_id) references player(id),
    foreign key (game_id) references game(id)
);

