from django.conf.urls import patterns, url
from anycluster import views
from django.conf import settings

urlpatterns = patterns('',
    url(r'^grid/(\d+)/(\d+)/$', views.getGrid, name='getGrid'),
    url(r'^kmeans/(\d+)/(\d+)/$', views.getPins, name='getPins'),
    url(r'^getClusterContent/(\d+)/(\d+)/$', views.getClusterContent, name='getClusterContent'),
    url(r'^getAreaContent/(\d+)/(\d+)/$', views.getAreaContent, name='getAreaContent'),
)
