# tracker/tests/test_models.py
from django.test import TestCase
from tracker.models import CycleRecord
from django.contrib.auth.models import User

class CycleRecordModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username="jane")
        self.record = CycleRecord.objects.create(
            user=self.user,
            last_period_start="2025-10-25",
            last_period_end="2025-10-28",
            cycle_length=28
        )

    def test_cycle_record_created(self):
        self.assertEqual(self.record.user.username, "jane")
        self.assertEqual(self.record.cycle_length, 28)
