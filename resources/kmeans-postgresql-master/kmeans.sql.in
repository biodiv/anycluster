CREATE FUNCTION kmeans(float[], int) RETURNS int
AS '$libdir/kmeans'
LANGUAGE c VOLATILE STRICT WINDOW;

CREATE FUNCTION kmeans(float[], int, float[]) RETURNS int
AS '$libdir/kmeans', 'kmeans_with_init'
LANGUAGE C IMMUTABLE STRICT WINDOW;

