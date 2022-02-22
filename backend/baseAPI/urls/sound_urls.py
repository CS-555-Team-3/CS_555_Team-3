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
    path("orders/", views.getOrders, name="orders"),
]
