from rest_framework.test import (
    APIClient,
    APITestCase,
)
from django.urls import reverse
from rest_framework import status
import json


class GetOrdersTestCaseWithoutSounds(APITestCase):
    def setUp(self):
        self.API_URL = reverse("orders")
        self.client = APIClient()

    def test_response_400(self):
        """ test if 400 without pre-request sounds """
        response = self.client.get("http://localhost:8000/api/sounds/orders/")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
