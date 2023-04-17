CRS_SCHEMA = {
    "type": "object",
    "properties": {
        "type": {
            "type": "string",
            "enum": ["name"]
        },
        "properties": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "enum": ["EPSG:4326", "EPSG:3857"]
                }
            },
            "required": ["name"]
        }
    },
    "required": ["type", "properties"]
}

POLYGON_GEOMETRY_SCHEMA = {
    "type": "object",
    "properties": {
        "crs": CRS_SCHEMA,
        "type": {
            "type": "string",
            "enum": ["Polygon", "MultiPolygon"],
        },
        "coordinates": {
            "type": "array",
            "items": {
                "type": "array",
                "items": {
                    "type": "array",
                    "items": {
                        "type": "number",
                        "minContains": 2,
                        "maxContains": 2
                    }
                }
            }
        }
    },
    "required": ["crs", "type", "coordinates"]
}

GEOJSON_SCHEMA = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://localcosmos.org/geojson.schema.json",
    "title": "GeoJSON Field",
    "description": "A geojson field for a point or a polygon",
    "type": "object",
    "properties": {
        "type" : {
            "type": "string",
            "enum": ["Feature"]
        },
        "geometry": {
            "anyOf": [POLYGON_GEOMETRY_SCHEMA]
        }
    },
    "required": ["type", "geometry"]
}

FEATURECOLLECTION_SCHEMA = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://localcosmos.org/featurecollection.schema.json",
    "title": "GeoJSON Field",
    "description": "A geojson field for a point or a polygon",
    "type": "object",
    "properties": {
        "type" : {
            "type": "string",
            "enum": ["FeatureCollection"]
        },
        "features": {
            "type": "array",
            "items": GEOJSON_SCHEMA
        }
    },
    "required": ["type", "features"]
}

FEATURE_OR_FEATURECOLLECTION_SCHEMA = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://localcosmos.org/featurecollection.schema.json",
    "title": "GeoJSON Field",
    "description": "A geojson field for a point or a polygon",
    "type": "object",
    "anyOf": [FEATURECOLLECTION_SCHEMA, GEOJSON_SCHEMA]
}

ANYCLUSTER_REQUEST_SCHEMA = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://github.com/biodiv/anycluster",
    "title": "anycluster request",
    "description": "A request for the anycluster json rest api",
    "type": "object",
    "properties": {
        "geojson": {
            "type": "object",
            "anyOf": [GEOJSON_SCHEMA, FEATURECOLLECTION_SCHEMA]
        },
        "filters": {
            "type": "integer"
        },
        "geometry_type": {
            "type": "string",
            "enum": ["viewport", "area"]
        }
    },
    "required": [ "geojson", "geometry_type" ],

    "additionalProperties": False,
}