anycluster
==========

anycluster provides Server-Side clustering of map markers for Geodjango. It is suitable for large amounts of markers. 
Depending on your server and personal feeling, it works very well with 200.000 to 500.000 markers.

ChangeLog
---------
- you now need to add {% csrf_token % } somewhere in your template
- started implementing GEOJSON
- added fetching all Markers on the viewport as list
- now also works with python3
- added demo application (currently without the filter feature)
- new javascript file
- added marker image for markers with count 1
- prepared anycluster.js for OSM
- now works without jQuery
- added example how to use exact counts (base.html)



Features
--------

This application offers 2 methods of clustering:
- grid-based clustering
- clustering based on geometric density of the points (needs PSQL extension)
- get all elements contained in a cluster

... and has a builtin caching mechanism: if the user pans a map, only the new areas are processed.

And lots of optional customization possibilities:
- works with google maps and OpenLayers
- define what happens if you click on a cluster
- use your own cluster graphics
- define gridsize and other cluster parameters
- apply filters to your clusters
- use different markers if count is 1


Requirements
------------

- Django 1.4.x - 1.6.x (others might work, but are untested)
- Geodjango
- PostGis 2.0 (1.5 might work, it is untested)
- (for kmeans clustering, recommended) kmeans PostgreSQL extension: https://github.com/umitanuki/kmeans-postgresql


Live Example
------------

There's a demo at http://www.anymals.org/nx/bigmap/
Note: This one shows the kmeans clustering. The underlying database contains 5.5 Million entries.


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
    
    if you are on Django 1.6 (maybe on 1.5, too) and you are not using SRID=4326 you have to add:
    
    ``ANYCLUSTER_COORDINATES_COLUMN_SRID = sridinteger``
    
    with sridinteger being your srid (e.g. 3785). Otherwise it will fall back to 4326

- (optional) if you want to add filters to your clustering you have to add those columns as a list

    ``ANYCLUSTER_FILTERS = ['column1','column2']``

- (optional) if you want to use custom markers if count of pin is 1

    ``ANYCLUSTER_PINCOLUMN = 'my_pincoumn'``

- in your urls.py add the following

    ``url(r'anycluster/', include('anycluster.urls')),``
    
- add anycluster to your ``STATICFILES_DIRS``

    ``'/PATH_TO_YOUR_PROJECT_FOLDER/anycluster/static'``


That's it! you are now ready to cluster your map markers.


Usage
-----
This example uses google maps.
In JavaScript, do the following when your DOM is ready.

    var anyclusterSettings = {
				mapType : "google",
				gridSize: 256,
				zoom: 3,
				center: [49,11],
				MapTypeId: "TERRAIN",
				clusterMethod : "kmeans",
				iconType: "exact",
				onFinalClick : function(entries){
					openPopup(entries);
				}
	
			}
	var googleMap = new Anycluster("gmap", anyclusterSettings);



If further documentation is required write me a message. I might contribute something on readthedocs then.


Using the Demo
--------------

To use the demo, follow these steps: 

- install ``Django 1.6`` correctly
- copy the demo folder to your system and include the anycluster folder as a django app.
- modify the database connection in ``settings.py`` according to your setup
- remember to create the kmeans function as described above
- from within the demo folder, run ``python manage.py syncdb``
- from within the demo folder, run ``python manage.py filldemodb 50000`` to fill the database with 50000 points
- be patient, as this process is not very effective
- from within the demo folder, run ``python manage.py runserver 8080``
- open your browser and enter ``localhost:8080``


Performance Tips
----------------

- index your GIS database columns correctly
- usage of a SSD can be 10-20 times faster compared to HDD
