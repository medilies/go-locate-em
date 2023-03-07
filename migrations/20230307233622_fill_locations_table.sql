-- +goose Up
-- +goose StatementBegin
INSERT INTO tunisia_states (name, perimeter) VALUES
  ('Tunis', ST_PolygonFromText('POLYGON((10.1393 36.9028, 10.1393 37.3024, 10.5144 37.3024, 10.5144 36.9028, 10.1393 36.9028))')),
  ('Ariana', ST_PolygonFromText('POLYGON((10.1763 36.7543, 10.1763 36.9667, 10.3658 36.9667, 10.3658 36.7543, 10.1763 36.7543))')),
  ('Ben Arous', ST_PolygonFromText('POLYGON((10.2167 36.6575, 10.2167 36.8266, 10.3849 36.8266, 10.3849 36.6575, 10.2167 36.6575))')),
  ('Manouba', ST_PolygonFromText('POLYGON((9.9400 36.7365, 9.9400 36.8802, 10.1476 36.8802, 10.1476 36.7365, 9.9400 36.7365))')),
  ('Nabeul', ST_PolygonFromText('POLYGON((10.4552 36.5394, 10.4552 36.9154, 10.9142 36.9154, 10.9142 36.5394, 10.4552 36.5394))')),
  ('Zaghouan', ST_PolygonFromText('POLYGON((9.9696 36.2979, 9.9696 36.6262, 10.3191 36.6262, 10.3191 36.2979, 9.9696 36.2979))')),
  ('Bizerte', ST_PolygonFromText('POLYGON((9.8653 37.0238, 9.8653 37.4183, 10.1152 37.4183, 10.1152 37.0238, 9.8653 37.0238))')),
  ('Beja', ST_PolygonFromText('POLYGON((8.8236 36.7571, 8.8236 37.1102, 9.4648 37.1102, 9.4648 36.7571, 8.8236 36.7571))')),
  ('Jendouba', ST_PolygonFromText('POLYGON((8.3755 36.3953, 8.3755 36.9187, 9.1448 36.9187, 9.1448 36.3953, 8.3755 36.3953))')),
  ('Kef', ST_PolygonFromText('POLYGON((8.3134 35.9604, 8.3134 36.5634, 9.0471 36.5634, 9.0471 35.9604, 8.3134 35.9604))'));
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DELETE FROM tunisia_states;
-- +goose StatementEnd
