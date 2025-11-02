from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include, re_path
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),

    # ✅ your existing API routes
    path('api/auth/', include('users.urls')),
    path('api/proxy/', include('proxy.urls')),
    path('api/tracker/', include('tracker.urls')),
    path('api/search/', include('chat.urls')),
    path('api/blog/', include('blog.urls')),

    # ✅ this line fixes the React refresh problem:
    # it serves index.html for any non-API route
    re_path(r'^(?!api/).*$', TemplateView.as_view(template_name='index.html')),
]

# ✅ serve media in dev mode (optional)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
