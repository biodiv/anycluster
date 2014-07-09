Cusotmization
=============

Single Pin Images
^^^^^^^^^^^^^^^^^

The pin of markers with count 1 can be customized according to the value of a database column. To enable this you have to add the following to your settings.py:

**settings.py**

.. code-block:: python

   ANYCLUSTER_PINCOLUMN = "db_column"

with db_column being the column that determines the image for pins with count 1.


**anyclusterSettings**

.. code-block:: javascript

   var anyclusterSettings = {
		mapType : "google",
		singlePinImages: {
			'db_value1':'/static/path/to/pin_value1.png',
			'db_value2':'/static/path/to/pin_value2.png',
		}
   }

Example:

.. code-block:: python

   ANYCLUSTER_PINCOLUMN = "color"

.. code-block:: javascript

   var anyclusterSettings = {
		mapType : "google",
		singlePinImages: {
			'blue':'/static/path/to/pin_blue.png',
			'red':'/static/path/to/pin_red.png',
		}
   }

In this example, the database column that determines the pin images for single pins is "color". If the column has the value "blue" for the pin, the image will be "/static/path/to/pin_blue.png"
