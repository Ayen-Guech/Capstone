from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import BlogSubmission, Like, Comment


@admin.register(BlogSubmission)
class BlogSubmissionAdmin(admin.ModelAdmin):
    list_display = ("title", "name", "email", "status", "submitted_at")
    list_filter = ("status", "submitted_at")
    search_fields = ("title", "name", "email", "content")
    actions = ["approve_blogs", "reject_blogs"]

    def approve_blogs(self, request, queryset):
        updated = queryset.update(status="approved")
        self.message_user(request, f"{updated} blog(s) approved successfully!")

    def reject_blogs(self, request, queryset):
        updated = queryset.update(status="rejected")
        self.message_user(request, f"{updated} blog(s) rejected.")

    approve_blogs.short_description = "✅ Approve selected blogs"
    reject_blogs.short_description = "❌ Reject selected blogs"


admin.site.register(Like)
admin.site.register(Comment)
