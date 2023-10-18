from anycluster.definitions import GEOMETRY_TYPE_VIEWPORT, GEOMETRY_TYPE_AREA

RECTANGLE_COORDINATES = [
    [8.900979883514395, 50.53615067761834],
    [8.900979883514395, 47.23323316666901],
    [14.012606569434269, 47.23323316666901],
    [14.012606569434269, 50.53615067761834],
    [8.900979883514395, 50.53615067761834]
]

POLYGON_COORDINATES = [
    [9.045396058817317,49.39788777447578],
    [9.574300366200248,49.67175757306501],
    [10.272003920618346,48.782550732179544],
    [9.833125878322306,48.47015416585609],
    [9.911898860273112,47.80933120641882],
    [9.501154025817556,47.5479357011904],
    [9.754352896372836,47.300495151134356],
    [10.592722489988205,47.231767473780934],
    [13.11908455397301,47.4110354067804],
    [13.113457912406176,48.01675231007874],
    [14.019347204836066,48.73804102821833],
    [12.708339719517483,49.92960800280375],
    [11.8024504270862,50.552150890098176],
    [10.035684974767292,50.63430490643958],
    [8.910356661188132,50.14643995762955],
    [9.045396058817317,49.39788777447578]
]

GEOJSON_RECTANGLE = {
    'type': 'Feature',
    'properties': {},
    'geometry': {
        'crs': {
            'type': 'name',
            'properties': {
                'name': 'EPSG:4326'
            }
        },
        'type': 'Polygon',
        'coordinates': [
            RECTANGLE_COORDINATES
        ]
    }
}

GEOJSON_POLYGON = {
    "type": "Feature",
    "properties": {},
    "geometry": {
        'crs': {
            'type': 'name',
            'properties': {
                'name': 'EPSG:4326'
            }
        },
        "coordinates": [
            POLYGON_COORDINATES
        ],
        "type": "Polygon"
    }
}

GEOJSON_MULTIPOLYGON = {
    "type": "Feature",
    "properties": {},
    "geometry": {
        'crs': {
            'type': 'name',
            'properties': {
                'name': 'EPSG:4326'
            }
        },
        "coordinates": [
            POLYGON_COORDINATES, RECTANGLE_COORDINATES
        ],
        "type": "MultiPolygon"
    }
}

GEOJSON_FEATURECOLLECTION =  {
    "type": "FeatureCollection",
    "features": [GEOJSON_MULTIPOLYGON, GEOJSON_RECTANGLE, GEOJSON_POLYGON]
}

VALID_VIEWPORT_REQUEST = {
    'geojson': GEOJSON_RECTANGLE,
    'filters': [],
    'geometry_type': GEOMETRY_TYPE_VIEWPORT
}

VALID_POLYGON_REQUEST = {
    'geojson': GEOJSON_POLYGON,
    'filters': [],
    'geometry_type': GEOMETRY_TYPE_AREA
}

VALID_FILTERS = [
    {
        'column': 'style',
        'value': 'flower',
        'operator': '=',
    }
]

VALID_FILTERS_LEFT_JOIN_ONLY = [
    {
        'column': 'owner__name',
        'value': 'Joe',
        'operator': '=',
    },
]

VALID_FILTERS_WITH_LEFT_JOIN = [
    {
        'column': 'style',
        'value': 'flower',
        'operator': '=',
    },
    {
        'column': 'owner__name',
        'value': 'Joe',
        'operator': '=',
    },
]
