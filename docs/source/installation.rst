Installation and Configuration
==============================

Prerequisites
-------------

* Django 2.x, 3.x or 4.x
* python3
* Geodjango
* PostGis 2.x
* (for kmeans clustering, recommended) kmeans PostgreSQL extension: https://github.com/umitanuki/kmeans-postgresql


kmeans postgis exension
-----------------------

**Installing the kmeans PostgreSQL extension (optional, needed for kmeans clustering)**

1. Download and unzip https://github.com/umitanuki/kmeans-postgresql on your server.
2. make sure you have the development packages for you postgresql server package installed (e.g. sudo apt-get install libpq-dev postgresql-server-dev-10)

3. In your unzipped kmeans folder run the following (e.g. on ubuntu)

   .. code-block:: bash

      make
      sudo make install
      psql -f /usr/share/postgresql/14/extension/kmeans.sql -d YOURGEODJANGODATABASE

   The latter needs to be processed as a postgresql superuser, e.g. the user postgres. You now have access to the kmeans functions which are necessary for the pin-based clustering.

on opensuse, the psql command would be

.. code-block:: bash

   psql -f /usr/share/postgresql15/extension/kmeans.sql -d YOURGEODJANGODATABASE

The number *14* or *15* depends on the postgresql versoin you are using.

django configuration
--------------------

**Install anycluster with your Django installation**

1. use ``pip install anycluster`` OR unzip the folder anycluster into your project directory
2. add 'anycluster' to your INSTALLED_APPS
3. required SETTINGS (settings.py)

   .. code-block:: python

     ANYCLUSTER_GEODJANGO_MODEL = "yourapp.models.your_geodjango_model" 
     ANYCLUSTER_COORDINATES_COLUMN = "your_geometric_column"


4. urls.py

   .. code-block:: python

      path('anycluster/', include('anycluster.urls')),




