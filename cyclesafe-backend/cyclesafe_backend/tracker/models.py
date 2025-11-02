from django.db import models
from django.contrib.auth.models import User
from datetime import timedelta

class CycleRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    cycle_length = models.IntegerField(default=28)
    duration = models.IntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        """Automatically compute duration before saving."""
        if self.start_date and self.end_date:
            self.duration = (self.end_date - self.start_date).days
        super().save(*args, **kwargs)

    @staticmethod
    def get_average_cycle_length(user):
        """Get user’s average cycle from their last 3 cycles."""
        records = CycleRecord.objects.filter(user=user).order_by('-created_at')[:3]
        if not records.exists():
            return 28
        lengths = [r.cycle_length for r in records if r.cycle_length]
        if not lengths:
            return 28
        return round(sum(lengths) / len(lengths))

    def calculate_predictions(self):
        """Predict all cycle windows and biological phases."""
        avg_cycle = CycleRecord.get_average_cycle_length(self.user)
        next_period = self.start_date + timedelta(days=avg_cycle)
        ovulation = self.start_date + timedelta(days=avg_cycle - 14)
        fertile_start = ovulation - timedelta(days=5)
        fertile_end = ovulation + timedelta(days=1)

        menstrual_end = self.end_date
        follicular_start = self.end_date + timedelta(days=1)
        follicular_end = ovulation - timedelta(days=1)
        luteal_start = ovulation + timedelta(days=1)
        luteal_end = next_period - timedelta(days=1)

        return {
            "avg_cycle": avg_cycle,
            "next_period": next_period,
            "ovulation": ovulation,
            "fertile_window": f"{fertile_start.strftime('%b %d')} – {fertile_end.strftime('%b %d')}",
            "phases": {
                "menstrual": f"{self.start_date.strftime('%b %d')} – {menstrual_end.strftime('%b %d')}",
                "follicular": f"{follicular_start.strftime('%b %d')} – {follicular_end.strftime('%b %d')}",
                "ovulation": f"{ovulation.strftime('%b %d')}",
                "luteal": f"{luteal_start.strftime('%b %d')} – {luteal_end.strftime('%b %d')}",
            },
        }

    def __str__(self):
        return f"{self.user.username} | {self.start_date} → {self.end_date} | {self.cycle_length} days"
