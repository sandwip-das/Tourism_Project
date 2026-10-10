from rest_framework import viewsets, permissions
from django.db.models import Q
from .models import TourCategory, TourPackage, TourItineraryDay, TourInclusion
from .serializers import (
    TourCategorySerializer, TourPackageListSerializer,
    TourPackageDetailSerializer, TourItineraryDaySerializer, TourInclusionSerializer
)


class TourCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TourCategory.objects.filter(is_active=True).order_by('order')
    serializer_class = TourCategorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'


class TourPackageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TourPackage.objects.filter(is_active=True)
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TourPackageDetailSerializer
        return TourPackageListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        category_slug = self.request.query_params.get('category')
        destination_slug = self.request.query_params.get('destination')
        difficulty = self.request.query_params.get('difficulty')
        featured = self.request.query_params.get('featured')
        search = self.request.query_params.get('search')

        if category_slug:
            qs = qs.filter(category__slug=category_slug)
        if destination_slug:
            qs = qs.filter(destination__slug=destination_slug)
        if difficulty:
            qs = qs.filter(difficulty_level=difficulty)
        if featured in ['true', '1', 'True']:
            qs = qs.filter(is_featured=True)
        if search:
            qs = qs.filter(
                Q(title_en__icontains=search) |
                Q(title_bn__icontains=search) |
                Q(overview_en__icontains=search) |
                Q(start_location__icontains=search) |
                Q(destination__name_en__icontains=search)
            )
        return qs
