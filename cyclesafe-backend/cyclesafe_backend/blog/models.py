from django.db import models
from django.contrib.auth.models import User


class BlogSubmission(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default='pending'
    )
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']  # ✅ newest posts first

    def __str__(self):
        return f"{self.title} ({self.status})"

    # ✅ Ensure consistent lowercase storage for status values
    def save(self, *args, **kwargs):
        if self.status:
            self.status = self.status.lower()
        super().save(*args, **kwargs)

    # ✅ Helper: Approve post (sets status to lowercase 'approved')
    def approve(self):
        self.status = "approved"
        self.save()

    # ✅ Helper: Reject post
    def reject(self):
        self.status = "rejected"
        self.save()


class Like(models.Model):
    post = models.ForeignKey(
        BlogSubmission, on_delete=models.CASCADE, related_name="likes"
    )
    session_id = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('post', 'session_id')

    def __str__(self):
        return f"Like on {self.post.title}"


class Comment(models.Model):
    post = models.ForeignKey(
        BlogSubmission, on_delete=models.CASCADE, related_name="comments"
    )
    name = models.CharField(max_length=100)
    comment_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} on {self.post.title}"
