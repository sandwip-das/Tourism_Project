from rest_framework import serializers
from .models import TourCategory, TourPackage, TourItineraryDay, TourInclusion
from apps.destinations.serializers import DestinationListSerializer


class TourCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TourCategory
        fields = '__all__'


class TourItineraryDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = TourItineraryDay
        fields = '__all__'


class TourInclusionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TourInclusion
        fields = '__all__'


class TourPackageListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name_en', read_only=True)
    destination_name = serializers.CharField(source='destination.name_en', read_only=True)

    class Meta:
        model = TourPackage
        fields = [
            'id', 'title_en', 'title_bn', 'slug', 'category', 'category_name',
            'destination', 'destination_name', 'tagline_en', 'tagline_bn',
            'duration_days', 'duration_nights', 'price_bdt', 'discount_price_bdt',
            'max_group_size', 'difficulty_level', 'start_location', 'end_location',
            'featured_image', 'badge_label_en', 'badge_label_bn',
            'rating', 'review_count', 'is_featured', 'order'
        ]


class TourPackageDetailSerializer(serializers.ModelSerializer):
    category = TourCategorySerializer(read_only=True)
    destination = DestinationListSerializer(read_only=True)
    itinerary_days = TourItineraryDaySerializer(many=True, read_only=True)
    inclusions = TourInclusionSerializer(many=True, read_only=True)

    class Meta:
        model = TourPackage
        fields = '__all__'
