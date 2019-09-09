kmeans 1.1.0
============

Synopsis
--------

    SELECT kmeans(ARRAY[x, y, z], 10) OVER (), * FROM samples;
    SELECT kmeans(ARRAY[x, y, z], 2, ARRAY[0.5, 0.5, 1.0, 1.0]) OVER (), * FROM samples;
    SELECT kmeans(ARRAY[x, y, z], 2, ARRAY[ARRAY[0.5, 0.5], ARRAY[1.0, 1.0]]) OVER (PARTITION BY group_key), * FROM samples

Description
-----------

This module implements the K-means clustering algorithm as a
user-defined window function in PostgreSQL. K-means clustering
is a simple way to classify a data set by an N-dimensional vector.

It is known that the algorithm depends on how to define
initial mean vectors. So the module provides two signatures,
one for auto-initialization and the other for user-given
initial vectors.

The `kmeans` function calculates and returns a class number which starts from
0, by using input vectors. The first argument is the vector, represented
by an array of float8. You must give the same-length 1-dimensional array across
all the input rows. The second argument is the integer K in "K-means", the
number of class you want to partition. The third argument is optional,
an array of vectors which represents initial mean vectors. Since the
algorithm is sensitive with initial mean vectors, and although the function
calculates them by input vectors in the first form, you may sometimes want
to give fixed mean vectors. The vectors can be passed as a 1-d array or 2-d
array of float8. In the case of 1-d, its length must match k * lengthof(vector).

If the third argument, initial centroids, is not given, it scans
all the input vectors and stores min/max for each element of the vector.
Then it decides initial hypothetical vector elements by the next formula:

    init = (max - min) * (i + 1) / (k + 1) + min

where `i` varies from 0 to k-1. This means that the vector of elements
are decided as the linear interpolation from min to max divided by k.
Then one of the input vectors nearest to this hypothetical vector
is picked up as the centroid. Note that input vector is not picked
more than twice as far as possible, to gain a good result.

See input/kmeans.source as an example for how to call the function.

History
-------

### v1.1.0 (2011-07-22)
  * Fix NULL input case, thanks to the report from Mike Toews
  * Improve initialization of centroids

### v1.0.0 (2011-05-20)
  * Initial version

Support
-------

This library is stored in an open [GitHub
repository](http://github.com/umitanuki/kmeans-postgresql).
Feel free to fork and contribute! Please file bug reports
via [GitHub Issues](http://github.com/umitanuki/kmeans-postgresql/issues/).

Author
------

[Hitoshi Harada](mailto:umi.tanuki@gmail.com)

Copyright and License
---------------------

Copyright (c) Hitoshi Harada

This module is free software; you can redistribute it and/or modify it under
the [PostgreSQL License](http://www.opensource.org/licenses/postgresql).

Permission to use, copy, modify, and distribute this software and its 
documentation for any purpose, without fee, and without a written agreement is
hereby granted, provided that the above copyright notice and this paragraph
and the following two paragraphs appear in all copies.

In no event shall Hitoshi Harada be liable to any party for direct,
indirect, special, incidental, or consequential damages, including
lost profits, arising out of the use of this software and its documentation,
even if Hitoshi Harada has been advised of the possibility of such damage.

Hitoshi Harada specifically disclaim any warranties,
including, but not limited to, the implied warranties of merchantability and 
fitness for a particular purpose. The software provided hereunder is on an "as 
is" basis, and Hitoshi Harada has no obligations to provide maintenance,
support, updates, enhancements, or modifications.


