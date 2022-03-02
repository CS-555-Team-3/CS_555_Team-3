from rest_framework.test import (
    APIClient,
    APITestCase,
)
from django.urls import reverse
from rest_framework import status
import json


class GetOrdersTestCase(APITestCase):
    def setUp(self):
        self.API_URL = reverse("orders")
        self.SOUND_API_URL = reverse(
            "sounds", kwargs={'notes': 4, 'durations': 1.5})
        self.client = APIClient()

    def test_response_200(self):
        """ test if 200 with pre-request sounds """
        self.client.get(self.SOUND_API_URL)
        response = self.client.get(self.API_URL)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_order_length(self):
        """ test if order length equals with num of notes """
        self.client.get(self.SOUND_API_URL)
        response = json.loads(self.client.get(self.API_URL).content)
        self.assertEqual(len(response), 4)

    def test_order_length(self):
        """ test if order's element type is string """
        self.client.get(self.SOUND_API_URL)
        response = json.loads(self.client.get(self.API_URL).content)
        self.assertEqual(type(response[0]), str)
