from rest_framework import serializers
from .models import BlogSubmission, Like, Comment


# ✅ Comment Serializer
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


# ✅ Like Serializer
class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"


# ✅ Full Blog Serializer (used in main blog listing & details)
class BlogSubmissionSerializer(serializers.ModelSerializer):
    likes_count = serializers.IntegerField(source="likes.count", read_only=True)
    comments_count = serializers.IntegerField(source="comments.count", read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = BlogSubmission
        fields = [
            "id",
            "name",
            "email",
            "title",
            "content",
            "image",
            "status",
            "submitted_at",
            "likes_count",
            "comments_count",
            "comments",
        ]
        read_only_fields = [
            "status",
            "submitted_at",
            "likes_count",
            "comments_count",
            "comments",
        ]

    def create(self, validated_data):
        # ✅ Ensure status always defaults to "pending"
        validated_data["status"] = "pending"
        return super().create(validated_data)


# ✅ NEW: Compact Blog Summary Serializer (for sidebar / homepage previews)
class BlogSummarySerializer(serializers.ModelSerializer):
    """
    This lightweight serializer is ideal for "Latest Blogs" sections,
    homepage cards, or lists — excludes heavy fields like 'content' and 'comments'.
    """
    class Meta:
        model = BlogSubmission
        fields = ["id", "title", "name", "image", "submitted_at"]
