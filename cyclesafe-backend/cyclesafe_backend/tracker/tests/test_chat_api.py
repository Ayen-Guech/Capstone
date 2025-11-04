from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from tracker.models import CycleRecord


class ChatAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        # ✅ Updated URL name
        self.url = reverse("smart-cycle-chat")
        self.client.login(username="testuser", password="testpass")

    def test_valid_chat_request(self):
        """POST: Valid data returns predictions"""
        data = {"message": "My period was from Oct 1 to Oct 5", "cycle_length": 28}
        response = self.client.post(self.url, data, format="json")

        # Expect 200 OK
        self.assertIn(response.status_code, [status.HTTP_200_OK, status.HTTP_201_CREATED])
        self.assertIn("next_period", response.data)

    def test_missing_message_field(self):
        """POST: Missing message should fail"""
        data = {"cycle_length": 28}
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_unauthorized_request(self):
        """POST: Without token should be unauthorized"""
        self.client.logout()
        data = {"message": "My period was from Oct 1 to Oct 5", "cycle_length": 28}
        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class CycleRecordModelTest(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="modeluser", password="testpass")
        self.record = CycleRecord.objects.create(
            user=self.user,
            start_date="2025-10-01",
            end_date="2025-10-05",
            cycle_length=28,
        )

    def test_cycle_record_created(self):
        """Ensure cycle record is stored correctly"""
        self.assertEqual(self.record.user.username, "modeluser")
        self.assertEqual(self.record.cycle_length, 28)
        self.assertIsNotNone(self.record.id)
