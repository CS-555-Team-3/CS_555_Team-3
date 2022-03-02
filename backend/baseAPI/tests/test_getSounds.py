from rest_framework.test import (
    APIClient,
    APITestCase,
)
from django.urls import reverse
from rest_framework import status


class GetSoundsTestCase(APITestCase):
    def setUp(self):
        self.API_URL = reverse("sounds", kwargs={'notes': 4, 'durations': 1.5})
        self.client = APIClient()

    def test_response_200(self):
        """ test if 200 with correct url params """
        response = self.client.get(self.API_URL)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_content_type(self):
        """ test if content type is .wav """
        response = self.client.get(self.API_URL)
        self.assertEqual(response["Content-Type"], 'audio/wav')

    def test_response_404_without_params(self):
        """ test if 404 without params """
        API_URL = "http://localhost:8000/api/sounds/"
        response = self.client.get(API_URL)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_response_404_nonFloat_durations(self):
        """ test if 404 non-float durations """
        API_URL = "http://localhost:8000/api/sounds/5/2"  # durations should be float
        response = self.client.get(API_URL)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_response_400_notes_outrange(self):
        """ test if 400 with outrange notes"""
        API_URL = "http://localhost:8000/api/sounds/0/2.0"  # notes should be >= 1, <= 12
        response = self.client.get(API_URL)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_response_400_durations_outrange(self):
        """ test if 400 with outrange durations"""
        API_URL = "http://localhost:8000/api/sounds/3/0.5"  # durations should be >= 1, <= 6
        response = self.client.get(API_URL)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
