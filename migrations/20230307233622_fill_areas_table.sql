-- +goose Up
-- +goose StatementBegin
INSERT INTO
  areas(name, perimeter)
VALUES
  (
    'dz_west',
    ST_PolygonFromText(
      'POLYGON((-1.8127441 35.1199086,-1.7358398 34.1618182,-0.7250977 33.3213485,1.1645508 33.8156663,1.1425781 35.3532161,0.7031250 36.2265501,-0.6372070 35.6215819,-1.8127441 35.1199086))'
    )
  ),
  (
    'dz_center',
    ST_PolygonFromText(
      'POLYGON((1.8017578 36.5317088,1.6040039 34.6603224,2.9003906 33.9752535,5.1031494 34.3479715,4.9438477 36.7828921,1.8017578 36.5317088))'
    )
  ),
  ( 
    'oran',
    ST_PolygonFromText(
      'POLYGON((-0.733 35.711,-0.727 35.714,-0.717 35.716,-0.712 35.712,-0.703 35.711,-0.701 35.705,-0.697 35.702,-0.692 35.702,-0.685 35.707,-0.679 35.707,-0.675 35.711,-0.666 35.713,-0.659 35.718,-0.646 35.717,-0.634 35.721,-0.63 35.724,-0.625 35.724,-0.622 35.719,-0.61 35.724,-0.604 35.729,-0.604 35.731,-0.597 35.735,-0.587 35.745,-0.585 35.749,-0.58 35.752,-0.578 35.758,-0.575 35.759,-0.57 35.764,-0.564 35.773,-0.556 35.773,-0.55 35.77,-0.551 35.762,-0.548 35.761,-0.547 35.759,-0.548 35.749,-0.569 35.735,-0.576 35.732,-0.581 35.727,-0.579 35.719,-0.582 35.716,-0.592 35.713,-0.591 35.708,-0.592 35.7,-0.59 35.7,-0.589 35.695,-0.591 35.686,-0.59 35.682,-0.593 35.674,-0.595 35.672,-0.6 35.672,-0.608 35.678,-0.61 35.678,-0.615 35.673,-0.64 35.663,-0.642 35.654,-0.655 35.655,-0.668 35.652,-0.676 35.653,-0.684 35.649,-0.694 35.65,-0.699 35.646,-0.7 35.643,-0.706 35.641,-0.717 35.649,-0.718 35.672,-0.712 35.683,-0.716 35.684,-0.718 35.688,-0.729 35.695,-0.733 35.701,-0.734 35.708,-0.733	35.711))'
    )
  );
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DELETE FROM
  areas;
-- +goose StatementEnd