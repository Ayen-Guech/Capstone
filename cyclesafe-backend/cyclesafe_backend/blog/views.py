from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import BlogSubmission, Comment, Like
from .serializers import (
    BlogSubmissionSerializer,
    CommentSerializer,
    BlogSummarySerializer,
)

# ✅ Custom Pagination Class
class BlogPagination(PageNumberPagination):
    """
    Returns a fixed number of blogs per page.
    Example: /api/blog/approved-posts/?page=2
    """
    page_size = 6
    page_size_query_param = "page_size"
    max_page_size = 12


# ✅ List approved posts (public)
class ApprovedBlogListView(generics.ListAPIView):
    queryset = BlogSubmission.objects.filter(status="approved").order_by("-submitted_at")
    serializer_class = BlogSubmissionSerializer
    pagination_class = BlogPagination
    permission_classes = [permissions.AllowAny]  # ✅ public access


# ✅ Retrieve a single approved blog (public)
class BlogDetailView(generics.RetrieveAPIView):
    queryset = BlogSubmission.objects.filter(status="approved")
    serializer_class = BlogSubmissionSerializer
    permission_classes = [permissions.AllowAny]  # ✅ public access


# ✅ Lightweight latest blogs (no pagination, top 5 only — public)
class LatestBlogsView(generics.ListAPIView):
    queryset = BlogSubmission.objects.filter(status="approved").order_by("-submitted_at")[:5]
    serializer_class = BlogSummarySerializer
    permission_classes = [permissions.AllowAny]  # ✅ public access


# ✅ Submit a new blog (public submission, default status=pending)
class BlogSubmissionCreateView(generics.CreateAPIView):
    queryset = BlogSubmission.objects.all()
    serializer_class = BlogSubmissionSerializer
    permission_classes = [permissions.AllowAny]  # ✅ anyone can submit

    def perform_create(self, serializer):
        serializer.save(status="pending")


# ✅ Create a new comment (public)
class CommentCreateView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]  # ✅ anyone can comment


# ✅ Like a post (public)
@api_view(["POST"])
@permission_classes([permissions.AllowAny])  # ✅ allow public likes
def like_post(request, pk):
    post = get_object_or_404(BlogSubmission, pk=pk)
    session_id = request.data.get("session_id")

    if not session_id:
        return Response({"error": "Session ID required."}, status=400)

    Like.objects.get_or_create(post=post, session_id=session_id)
    return Response({"likes": post.likes.count()})


# ✅ Admin-only approval API
@api_view(["PATCH"])
@permission_classes([permissions.IsAdminUser])
def approve_post(request, pk):
    """
    Allows admin users to approve a pending blog post directly via API.
    Example: PATCH /api/blog/approve-post/3/
    """
    post = get_object_or_404(BlogSubmission, pk=pk)

    if post.status == "approved":
        return Response({"message": "⚠️ This post is already approved."})

    post.status = "approved"
    post.save()
    return Response({"message": f"✅ Blog '{post.title}' approved successfully!"})
