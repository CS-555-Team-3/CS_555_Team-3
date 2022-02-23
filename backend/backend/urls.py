"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls.conf import include

# base urls, we include sub-endpoints and route to them here
urlpatterns = [
    path('admin/', admin.site.urls),

    # routing to the sound server
    path("api/sounds/", include("baseAPI.urls.sound_urls")),
    
    #path("api/random_list/", include("baseAPI.urls.sound_urls")),
    #path("api/list_to_mp3/", include("baseAPI.urls.sound_urls")),
    path("api/get_one_sound/", include("baseAPI.urls.sound_urls")),
    #path("api/get_one_color/", include("baseAPI.urls.sound_urls")),
    #path("api/get_list_color/", include("baseAPI.urls.sound_urls")),
    #path("api/variables/", include("baseAPI.urls.sound_urls")),
         
    #path("orders/", views.getOrders, name="orders"),
]

'''

        path("<int:num_notes>", views.generate_rand_tune_list, name="random_tune_list"),
    path("<list:notes>/<list:durations>", views.get_list_mp3, name="list_to_mp3"),
    path("<string:color>", views.get_color_scheme, name="get_lists_color"),
    path("<string:notes>", views.get_one_sound, name="get_one_sound"),
    path("<string:notes>", views.get_one_color, name="get_one_color"),

'''
