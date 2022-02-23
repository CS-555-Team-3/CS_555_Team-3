from django.urls import path, register_converter
from baseAPI.views import sound_views as views

# since the durations parameters may be float, we use a converter class to convert it


class FloatUrlParameterConverter:
    # regular expression
    regex = '[0-9]+\.?[0-9]+'

    def to_python(self, value):
        return float(value)

    def to_url(self, value):
        return str(value)


register_converter(FloatUrlParameterConverter, 'float')

# sound urls
urlpatterns = [
    path("<int:notes>/<float:durations>", views.getSounds, name="sounds"),
    path("b/<int:num_notes>", views.generate_rand_tune_list, name="random_tune_list"),
    path("c/<otes>/<int:durations>", views.get_list_mp3, name="list_to_mp3"),
    path("d/<int:color>", views.get_color_scheme, name="get_lists_color"),
    path("e/<int:notes>", views.get_one_sound, name="get_one_sound"),
    path("f/<notes>", views.get_one_color, name="get_one_color"),
    path("h/orders/", views.getOrders, name="orders"),
]
