-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS areas (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  perimeter POLYGON NOT NULL,
  PRIMARY KEY (id)
);
-- +goose StatementEnd


-- +goose Down
-- +goose StatementBegin
DROP TABLE areas
-- +goose StatementEnd