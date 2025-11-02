from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .serializers import RegisterSerializer
from .models import UserProfile

# ✅ Registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer


# ✅ Password reset
class PasswordResetView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        new_password = request.data.get("new_password")

        try:
            user = User.objects.get(username=username)
            user.password = make_password(new_password)
            user.save()
            return Response({"detail": "Password reset successful"})
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=404)


# ✅ Manage SMS notifications (Authenticated)
class NotificationSettingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        return Response({
            "phone_number": profile.phone_number,
            "allow_sms": profile.allow_sms
        })

    def post(self, request):
        profile, _ = UserProfile.objects.get_or_create(user=request.user)
        phone_number = request.data.get("phone_number")
        allow_sms = request.data.get("allow_sms", False)

        if phone_number:
            profile.phone_number = phone_number
        profile.allow_sms = allow_sms
        profile.save()

        return Response({
            "message": "Notification settings updated successfully",
            "phone_number": profile.phone_number,
            "allow_sms": profile.allow_sms
        })