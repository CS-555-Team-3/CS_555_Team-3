from rest_framework.test import (
    APIClient,
    APITestCase,
)
from django.urls import reverse
from rest_framework import status


class GetSoundsTestCase(APITestCase):
    def setUp(self):
        self.API_URL = reverse(
            "sounds", kwargs={'notes': 4, 'durations': 1.5, 'instrument': 'piano','familiar':0, 'dailyChallenge':0})
        self.client = APIClient()

    def test_response_200(self):
        """ test if 200 with correct url params """
        response = self.client.get(self.API_URL)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_content_type(self):
        """ test if content type is .wav """
        response = self.client.get(self.API_URL)
        self.assertEqual(response["Content-Type"], 'audio/wav')

    def test_response_404_without_all_params(self):
        """ test if 404 without notes, durations, instrument """
        API_URL = "http://localhost:8000/api/sounds/"
        response = self.client.get(API_URL)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_response_404_without_duration_instrument_params(self):
        """ test if 404 without durations, instrument """
        API_URL = "http://localhost:8000/api/sounds/4"
        response = self.client.get(API_URL)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_response_404_without_instrument_params(self):
        """ test if 404 without instrument """
        API_URL = "http://localhost:8000/api/sounds/4/1.5"
        response = self.client.get(API_URL)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_response_404_nonFloat_durations(self):
        """ test if 404 non-float durations """
        API_URL = "http://localhost:8000/api/sounds/5/2/piano"  # durations should be float
        response = self.client.get(API_URL)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_response_400_notes_outrange(self):
        """ test if 400 with outrange notes"""
        API_URL = "http://localhost:8000/api/sounds/0/2.0/piano/0/0"  # notes should be >= 1, <= 12
        response = self.client.get(API_URL)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_response_400_durations_outrange(self):
        """ test if 400 with outrange durations"""
        API_URL = "http://localhost:8000/api/sounds/3/0.5/piano/0/0"  # durations should be >= 1, <= 6
        response = self.client.get(API_URL)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_response_400_nonexisting_instrument(self):
        """ test if 400 with non-existing instrument """
        API_URL = "http://localhost:8000/api/sounds/5/1.5/bass/0/0"
        response = self.client.get(API_URL)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
    # ADDED Familiar sounds tests      
    def test_response_404_without_familiar_params(self):
        """ test if 404 without instrument """
        API_URL = "http://localhost:8000/api/sounds/4/1.5/piano"
        response = self.client.get(API_URL)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_response_404_with_bad_familiar_params1(self):
        """ test if 404 without instrument """
        API_URL = "http://localhost:8000/api/sounds/4/1.5/piano/-1/0" # familair should be > 0
        response = self.client.get(API_URL)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_response_404_with_bad_familiar_params2(self):
        """ test if 404 without instrument """
        API_URL = "http://localhost:8000/api/sounds/4/1.5/piano/2/0"  # familair should be 0 or 1
        response = self.client.get(API_URL)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
