from rest_framework import serializers
from .models import Division, District, Destination, Attraction


class AttractionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attraction
        fields = '__all__'


class DestinationListSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = Destination
        fields = [
            'id', 'name_en', 'name_bn', 'slug', 'division_name',
            'tagline_en', 'tagline_bn', 'category', 'category_display',
            'best_time_to_visit', 'ideal_duration', 'hero_image',
            'rating', 'review_count', 'is_featured', 'order'
        ]


class DestinationDetailSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    attractions = AttractionSerializer(many=True, read_only=True)

    class Meta:
        model = Destination
        fields = '__all__'


class DistrictSerializer(serializers.ModelSerializer):
    destinations = DestinationListSerializer(many=True, read_only=True)

    class Meta:
        model = District
        fields = '__all__'


class DivisionSerializer(serializers.ModelSerializer):
    districts = DistrictSerializer(many=True, read_only=True)

    class Meta:
        model = Division
        fields = '__all__'
