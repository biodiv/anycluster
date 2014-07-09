Installation and Configuration
==============================

Prequisities
------------

* Django 1.4.x - 1.6.x (others might work, but are untested)
* Geodjango
* PostGis 2.0 (1.5 might work, it is untested)
* (for kmeans clustering, recommended) kmeans PostgreSQL extension: https://github.com/umitanuki/kmeans-postgresql


Installation and Configuration
------------------------------

**Installing the kmeans PostgreSQL extension (optional, needed for kmeans clustering)**

1. Download and unzip https://github.com/umitanuki/kmeans-postgresql on your server.
2. make sure you have the development packages for you postgresql server package installed

3. In your unzipped kmeans folder run the following (e.g. on ubuntu)

   .. code-block:: bash

      make
      sudo make install
      psql -f /usr/share/postgresql/9.3/extension/kmeans.sql -d YOURGEODJANGODATABASE

   The latter needs to be processed as a postgresql superuser, e.g. the user postgres. You now have access to the kmeans functions which are necessary for the pin-based clustering.


**Install anycluster with your Django installation**

1. unzip the folder anycluster into your project directory
2. add 'anycluster' to your INSTALLED_APPS
3. required SETTINGS (settings.py)

   .. code-block:: python

     ANYCLUSTER_GEODJANGO_MODEL = "yourapp.your_geodjango_model" 
     ANYCLUSTER_COORDINATES_COLUMN = "your_geometric_column"

4. add the following to your STATICFILES_DIRS (settings.py)

   .. code-block:: python

     '/PATH_TO_YOUR_PROJECT_FOLDER/anycluster/static'


5. urls.py

   .. code-block:: python

      url(r'anycluster/', include('anycluster.urls')),


**Load the needed javascript modules and css styles**

1. Load google maps api. Add the following inside the <head> tag of your website:


   .. code-block:: html

      <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?&key=YOURKEY&sensor=false"></script>


   Replace YOURKEY with the key you obtained from google.


2. Load anycluster modules. Add the following inside the <head> tag of your website:


   .. code-block:: html

      <script type="text/javascript" src="{% static 'anycluster/anycluster.js' %}"></script>
      <script type="text/javascript" src="{% static 'anycluster/django_ajax_csrf.js' %}"></script>
      <script type="text/javascript" src="{% static 'anycluster/anycluster_marker.js' %}"></script>
      <link rel="stylesheet" href="{% static 'anycluster/anycluster.css' %}">


That's it! you are now ready to cluster your map markers!
