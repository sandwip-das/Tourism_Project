from rest_framework import viewsets, permissions, views
from rest_framework.response import Response
from .models import (
    SiteConfig, NavigationItem, FeatureBadge, SectionContent,
    Testimonial, FAQ, CampaignBanner, ActionMatrixCard, SpotlightFeature
)
from .serializers import (
    SiteConfigSerializer, NavigationItemSerializer, FeatureBadgeSerializer,
    SectionContentSerializer, TestimonialSerializer, FAQSerializer,
    CampaignBannerSerializer, ActionMatrixCardSerializer, SpotlightFeatureSerializer
)


class SiteConfigViewSet(viewsets.ModelViewSet):
    queryset = SiteConfig.objects.all()
    serializer_class = SiteConfigSerializer
    permission_classes = [permissions.AllowAny]


class CampaignBannerViewSet(viewsets.ModelViewSet):
    queryset = CampaignBanner.objects.filter(is_active=True)
    serializer_class = CampaignBannerSerializer
    permission_classes = [permissions.AllowAny]


class ActionMatrixCardViewSet(viewsets.ModelViewSet):
    queryset = ActionMatrixCard.objects.filter(is_active=True).order_by('order')
    serializer_class = ActionMatrixCardSerializer
    permission_classes = [permissions.AllowAny]


class SpotlightFeatureViewSet(viewsets.ModelViewSet):
    queryset = SpotlightFeature.objects.filter(is_active=True).order_by('order')
    serializer_class = SpotlightFeatureSerializer
    permission_classes = [permissions.AllowAny]


class NavigationItemViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = NavigationItem.objects.filter(is_active=True).order_by('order')
    serializer_class = NavigationItemSerializer
    permission_classes = [permissions.AllowAny]


class FeatureBadgeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FeatureBadge.objects.filter(is_active=True).order_by('order')
    serializer_class = FeatureBadgeSerializer
    permission_classes = [permissions.AllowAny]


class SectionContentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SectionContent.objects.all()
    serializer_class = SectionContentSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'section_key'


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.filter(is_active=True).order_by('order')
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.AllowAny]


class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQ.objects.filter(is_active=True).order_by('order')
    serializer_class = FAQSerializer
    permission_classes = [permissions.AllowAny]


class SiteInitializationView(views.APIView):
    """
    Returns initial site configuration in a single payload for instant frontend hydration.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        config = SiteConfig.objects.first()
        config_data = SiteConfigSerializer(config).data if config else {}
        campaign = CampaignBanner.objects.filter(is_active=True).first()
        campaign_data = CampaignBannerSerializer(campaign).data if campaign else None
        action_cards = ActionMatrixCardSerializer(ActionMatrixCard.objects.filter(is_active=True).order_by('order'), many=True).data
        spotlights = SpotlightFeatureSerializer(SpotlightFeature.objects.filter(is_active=True).order_by('order'), many=True).data
        nav_items = NavigationItemSerializer(NavigationItem.objects.filter(is_active=True).order_by('order'), many=True).data
        badges = FeatureBadgeSerializer(FeatureBadge.objects.filter(is_active=True).order_by('order'), many=True).data
        sections = {s.section_key: SectionContentSerializer(s).data for s in SectionContent.objects.all()}
        testimonials = TestimonialSerializer(Testimonial.objects.filter(is_active=True).order_by('order'), many=True).data
        faqs = FAQSerializer(FAQ.objects.filter(is_active=True).order_by('order'), many=True).data

        return Response({
            'site_config': config_data,
            'campaign_banner': campaign_data,
            'action_matrix': action_cards,
            'spotlights': spotlights,
            'navigation': nav_items,
            'feature_badges': badges,
            'sections': sections,
            'testimonials': testimonials,
            'faqs': faqs,
        })


# Backward compatibility alias
CombinedBootstrapView = SiteInitializationView
