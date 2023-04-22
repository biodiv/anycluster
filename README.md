anycluster (POSTGIS version)
============================

[https://anycluster.org](https://anycluster.org)

anycluster provides Server-Side clustering of map markers for Geodjango. It is suitable for large amounts of markers. 
Depending on your server and personal feeling, it works very well with 200.000 to 500.000 markers.

The postgis version is recommended. There is a mysql version with limited functionality: https://github.com/biodiv/anycluster-mysql


Documentation
-------------

http://anycluster.readthedocs.org/en/latest/


ChangeLog
---------
- [22.04.2023] anycluster 2.0 (breaking changes, see docs), npm, Django 4.x, updated docs
- [09.09.2019] support for Django 2.x and above (python 3), added leaflet support
- [08.10.2015] major code improvements
- you now need to add {% csrf_token % } somewhere in your template


Features
--------

This application offers 2 methods of clustering:
- grid-based clustering
- clustering based on geometric density of the points (needs PSQL extension)
- cluster contents of any geographic area defined as Polygon/Multipolygon
- get all elements contained in a cluster

... and has a builtin caching mechanism: if the user pans a map, only the new areas are processed.

And lots of optional customization possibilities:
- works with OpenLayers, google maps and Leaflet
- define what happens if you click on a cluster
- use your own cluster graphics
- define gridsize and other cluster parameters
- apply filters to your clusters
- use specialized markers/pins if count is 1


Performance Tips
----------------

- index your GIS database columns correctly
- usage of a SSD can be 10-20 times faster compared to HDD
