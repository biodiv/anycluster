from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    path('', views.APIHome.as_view(), name='anycluster_api_home'),
    path('grid/<int:zoom>/<int:grid_size>/', views.GridCluster.as_view(), name='grid_cluster'),
    path('kmeans/<int:zoom>/<int:grid_size>/', views.KmeansCluster.as_view(), name='kmeans_cluster'),
    path('get-kmeans-cluster-content/<int:zoom>/<int:grid_size>/', views.GetClusterContent.as_view(),
        name='get_kmeans_cluster_content'),
    path('get-area-content/<int:zoom>/<int:grid_size>/', views.GetAreaContent.as_view(),
        name='get_area_content'),
    path('get-dataset-content/<int:zoom>/<int:grid_size>/<int:dataset_id>/', views.GetDatasetContent.as_view(),
        name='get_dataset_content'),
    path('get-map-content-count/<int:zoom>/<int:grid_size>/', views.GetMapContentCount.as_view(),
        name='get_map_content_count'),
    path('get-grouped-map-contents/<int:zoom>/<int:grid_size>/', views.GetGroupedMapContents.as_view(),
        name='get_grouped_map_contents'),
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json'])