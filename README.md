anycluster
==========

anycluster provides Server-Side clustering of map markers for Geodjango. It is suitable for large amounts of markers. 
Depending on your server and personal feeling, it works very well with 200.000 to 500.000 markers.

Features
--------

This application offers 2 methods of clustering:
- grid-based clustering
- clustering based on geometric density of the points (needs PSQL extension)

... and has a builtin caching mechanism: if the user pans a map, only the new areas are processed.

And lots of optional customization possibilities:
- works with google maps and OpenLayers
- define what happens if you click on a cluster
- use your own cluster graphics
- define gridsize and other cluster parameters
- apply filters to your clusters


Requirements
------------

- Django 1.4.x (others might work, but are untested)
- Geodjango
- PostGis 2.0 (1.5 might work, it is untested)
- (for kmeans clustering, recommended) kmeans PostgreSQL extension: https://github.com/umitanuki/kmeans-postgresql

If you want to use the shipped javascript files you also need JQuery.


Demo
----

There's a demo at http://www.anymals.org/nx/bigmap/
Note: This one shows the kmeans clustering.


Installation and configuration
------------------------------
__Install the kmeans PostgreSQL extension (optional, needed for kmeans clustering)__
- Download and unzip https://github.com/umitanuki/kmeans-postgresql on your server.
- make sure you have the development packages for you postgresql server package installed

In your unzipped kmeans folder run the following (e.g. on ubuntu)

    $ make
    $ sudo make install
    $ psql -f /usr/share/postgresql/9.1/extension/kmeans.sql -d YOURGEODJANGODATABASE

The latter needs to be processed as a postgresql superuser, e.g. the user postgres.
You now have access to the kmeans functions which are necessary for the nicer pin-based clustering.


__Install anycluster with your Django installation__
- unzip the folder anycluster into your project directory
- add 'anycluster' to your INSTALLED_APPS
- in ``settings.py`` you have to define which model and column the clusterer has to use:

    ``ANYCLUSTER_GEODJANGO_MODEL = "yourapp.your_geodjango_model"``
    ``ANYCLUSTER_COORDINATES_COLUMN = "your_geometric_column"``

- (optional) if you want to add filters to your clustering you have to add those columns as a list

    ``ANYCLUSTER_FILTERS = ['column1','column2']``


- in your urls.py add the following

    ``url(r'anycluster/', include('anycluster.urls')),``
    
- add anycluster to your ``STATICFILES_DIRS``

    ``'/PATH_TO_YOUR_PROJECT_FOLDER/anycluster/static'``


That's it! you are now ready to cluster your map markers.


Usage
-----
This example uses jquery and google maps.
In JavaScript, do the following when your DOM is ready.

You first have to initialize the clusterer class ``Gmap``.
  
    googleMap = new Gmap('YOUR_MAP_DIV');
    
You can then cluster your map with

    googleMap.cluster();
    
As the default cluster is a grid, you can change the clustering method:

    googleMap.method = 'kmeans';
    googleMap.cluster();    
    

The clusterer accepts ``GRIDSIZE`` as an integer, e.g. ``googleMap.cluster(256);``. Play around with gridsizes to optimize the clustering for your dataset.


Full Example
------------

This example reclusters the map on panning/zooming as the Gmap class receives the clustercommand in the callback function.

    $(document).ready(function() {

        googleMap = new Gmap('bigMapDiv', function(){
            
            googleMap.cluster();
            
        });
        
        googleMap.method = 'kmeans';
        
        googleMap.markerFinalClickFunction = function(marker) {
                alert('you clicked the final marker');
        };
        
        
        
    });
