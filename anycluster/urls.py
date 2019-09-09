from django.conf import settings
from django.conf.urls import url
from django.urls import include, path
from . import views


urlpatterns = [
    path('grid/<int:zoom>/<int:grid_size>/', views.GridCluster.as_view(), name='grid_cluster'),
    path('kmeans/<int:zoom>/<int:grid_size>/', views.KmeansCluster.as_view(), name='kmeans_cluster'),
    path('getClusterContent/<int:zoom>/<int:grid_size>/', views.GetClusterContent.as_view(),
         name='get_cluster_content'),
    path('getAreaContent/<int:zoom>/<int:grid_size>/', views.GetAreaContent.as_view(), name='get_area_content'),
]
