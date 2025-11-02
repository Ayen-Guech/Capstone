from rest_framework import serializers
from .models import PeriodLog

class PeriodLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = PeriodLog
        fields = ['id', 'user', 'start_date', 'cycle_length', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
