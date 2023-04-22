from django.conf import settings
from django.shortcuts import render

def home(request):
    return render(request, 'base.html', {})

def leaflet(request):
    return render(request, 'leaflet.html', {})

def google(request):
    context = {
        'google_maps_api_key': getattr(settings, 'GOOGLE_MAPS_API_KEY', None)
    }
    return render(request, 'google.html', context)

def openlayers(request):
    return render(request, 'openlayers.html', {})
