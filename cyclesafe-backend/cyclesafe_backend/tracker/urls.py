from django.urls import path
from .views import SmartCyclePredictor

urlpatterns = [
    path('chat/', SmartCyclePredictor.as_view(), name='smart-cycle-chat'),
    
]
