from django.urls import path
from .views import (
    ApprovedBlogListView,
    BlogDetailView,
    CommentCreateView,
    like_post,
    BlogSubmissionCreateView,
    approve_post,
    LatestBlogsView,
)

urlpatterns = [
    path('approved-posts/', ApprovedBlogListView.as_view(), name='approved-posts'),
    path('approved-posts/<int:pk>/', BlogDetailView.as_view(), name='post-detail'),
    path('<int:pk>/like/', like_post, name='like-post'),
    path('comment/', CommentCreateView.as_view(), name='comment'),
    path('submit-post/', BlogSubmissionCreateView.as_view(), name='submit-post'),
    path('approve-post/<int:pk>/', approve_post, name='approve-post'),
    path('latest-blogs/', LatestBlogsView.as_view(), name='latest-blogs'),
]
