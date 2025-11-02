from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include, re_path
from django.http import JsonResponse
# from django.views.generic import TemplateView  # optional if you comment React route

def home(request):
    return JsonResponse({"status": "ok", "message": "CycleSafe API is running 🚀"})

urlpatterns = [
    path('admin/', admin.site.urls),

    # ✅ API routes
    path('api/auth/', include('users.urls')),
    path('api/proxy/', include('proxy.urls')),
    path('api/tracker/', include('tracker.urls')),
    path('api/search/', include('chat.urls')),
    path('api/blog/', include('blog.urls')),

    # ✅ JSON root view instead of React for now
    path('', home),

    # 🚫 Commented out React fallback (used only when serving frontend via Django)
    # re_path(r'^(?!api/).*$', TemplateView.as_view(template_name='index.html')),
]

# ✅ Serve media files in dev mode
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
