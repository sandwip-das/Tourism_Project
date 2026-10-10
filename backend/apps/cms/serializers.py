from rest_framework import serializers
from .models import (
    SiteConfig, NavigationItem, FeatureBadge, SectionContent,
    Testimonial, FAQ, CampaignBanner, ActionMatrixCard, SpotlightFeature
)


class SiteConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteConfig
        fields = '__all__'


class CampaignBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = CampaignBanner
        fields = '__all__'


class ActionMatrixCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActionMatrixCard
        fields = '__all__'


class SpotlightFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotlightFeature
        fields = '__all__'


class NavigationItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NavigationItem
        fields = '__all__'


class FeatureBadgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureBadge
        fields = '__all__'


class SectionContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionContent
        fields = '__all__'


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'
