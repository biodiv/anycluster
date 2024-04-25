'''
    This script fills the datbase with random points
    It is slow and does not use optimized SQL, so let it run while you do something else
'''

from django.core.management.base import BaseCommand, CommandError

from anymap.models import Gardens, GARDEN_STYLES as G
from django.utils import timezone

from django.contrib.gis.geos import GEOSGeometry

import datetime, random

class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('marker_amount', type=int)


    def handle(self, *args, **options):

        markerAmount = options['marker_amount']

        print ("creating demo with %s markers" % markerAmount)

        for x in range(0, markerAmount):

            if x % 1000 == 0:
                print ("%s" % (markerAmount-x))

            lat = random.uniform(-84,84)
            lon = random.uniform(-179,179)
            coords = GEOSGeometry('POINT(%f %f)' % (lon,lat), srid=4326)
            coords.transform(3857)
            
            rating = random.randint(1,5)
            free_entrance = random.randint(0,1)
            name = "Garden %s" % x

            garden = Gardens (
               coordinates = coords,
               rating = rating,
               name = name,
               free_entrance = free_entrance,
               last_renewal = random_date(),
               style = random.choice(G)[0]
            )

            garden.save()

        print ("done. Remember to index your geometric column with a gist index - and to use btree_gist!")



def random_date():
    """
    This function will return a random datetime between two datetime 
    objects.
    """
    end = timezone.now()

    start = datetime.datetime.strptime('1/1/2008 1:30 PM', '%m/%d/%Y %I:%M %p').replace(tzinfo=datetime.timezone.utc)
    
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = random.randrange(int_delta)
    return start + datetime.timedelta(seconds=random_second)
