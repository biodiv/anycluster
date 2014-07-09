Filters
=======

filterObject
^^^^^^^^^^^^

A filterObject looks like this:

.. code-block:: javascript

   var filterObj = { 
      "db_column_name" : { "values": value, "operator": operator_string } 
   }


**value**
  *list* or *string*

**operator_string**
  *string* that determines the database query

Example:

.. code-block:: javascript

   var filters = { 
      "color": {"values" : "red", "operator":"!=" }
	  "number": {"values": [2,3], "operator": "either_="}
   }
   
   anyclusterInstance.filter(filters);


This will result in the following query:

.. code-block:: sql

   WHERE color != red AND (number=2 OR number=3)

.. note::
   
   filterObjects are ANDed together. For OR lookups use the either\_ operator.


Operators
^^^^^^^^^

- = (default)
- !=
- >=
- <=
- >
- <
- contains
- startswith
- either_[operator]

If the value is a list, the operator can be prefixed with "either\_" to apply to each item of the list.
