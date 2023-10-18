from django.contrib.gis.db import models

from django.utils.translation import gettext_lazy as _

'''
    in this demo, the column "style" will be used as the pincolumn of anycluster

    the columns "rating","free_entrance" and "last_renewal" will be used to demonstrate filtering
'''

GARDEN_STYLES = (
    ('imperial', _('imperial')),
    ('japanese', _('japanese')),
    ('stone', _('stone')),
    ('flower', _('flower')),
    ('other', _('other')),
)

class Owner(models.Model):
    name = models.CharField(max_length=255)

class Gardens(models.Model):
    connection_name="default"
    name = models.CharField(max_length=255)
    style = models.CharField(max_length=20, choices=GARDEN_STYLES)
    rating = models.PositiveIntegerField()
    free_entrance = models.BooleanField(default=False)
    last_renewal = models.DateTimeField()
    coordinates = models.PointField(srid=3857)

    owner = models.ForeignKey(Owner, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return '{0} ({1})'.format(self.name, self.style)

    class Meta:
        ordering = ('pk',)
