#!/usr/bin/python
# -*- coding: utf-8 -*-

from django.conf.urls import patterns, url
from anycluster import views
from django.conf import settings

urlpatterns = patterns('',
    url(r'^getgrid/(\d+)/(\d+)/$', views.getGrid, name='getGrid'),
    url(r'^getpins/(\d+)/(\d+)/$', views.getPins, name='getPins'),
)
