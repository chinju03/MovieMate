from rest_framework import serializers
from .models import Movie

class MovieSerializer(serializers.ModelSerializer):
    short_review = serializers.SerializerMethodField()
    class Meta:
        model = Movie
        fields = '__all__'
    
    def get_short_review(self, obj):
        note = obj.review.strip()
        if not note:
            return ""
        # very simple summarizer
        if len(note.split()) > 20:
            return " ".join(note.split()[:20]) + "..."
        if "slow" in note.lower():
            return "A good watch, but the pacing feels slow."
        if "great" in note.lower() or "awesome" in note.lower():
            return "Highly recommended with strong moments."
        if "boring" in note.lower():
            return "Might not keep you engaged."
        return note