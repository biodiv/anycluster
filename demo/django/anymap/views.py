from django.shortcuts import render

def home(request):
    return render(request, 'base.html', {})

def leaflet(request):
    return render(request, 'leaflet.html', {})

def google(request):
    return render(request, 'google.html', {})

def openlayers(request):
    return render(request, 'openlayers.html', {})
