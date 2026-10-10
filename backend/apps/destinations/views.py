from rest_framework import viewsets, permissions, filters
from django.db.models import Q
from .models import Division, District, Destination, Attraction
from .serializers import (
    DivisionSerializer, DistrictSerializer, DestinationListSerializer,
    DestinationDetailSerializer, AttractionSerializer
)


class DivisionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Division.objects.all()
    serializer_class = DivisionSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'


class DistrictViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

    def get_queryset(self):
        qs = super().get_queryset()
        division_slug = self.request.query_params.get('division')
        if division_slug:
            qs = qs.filter(division__slug=division_slug)
        return qs


class DestinationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Destination.objects.all()
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return DestinationDetailSerializer
        return DestinationListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        division = self.request.query_params.get('division')
        featured = self.request.query_params.get('featured')
        search = self.request.query_params.get('search')

        if category:
            qs = qs.filter(category=category)
        if division:
            qs = qs.filter(division_name__iexact=division)
        if featured in ['true', '1', 'True']:
            qs = qs.filter(is_featured=True)
        if search:
            qs = qs.filter(
                Q(name_en__icontains=search) |
                Q(name_bn__icontains=search) |
                Q(overview_en__icontains=search) |
                Q(division_name__icontains=search)
            )
        return qs


class AttractionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Attraction.objects.all()
    serializer_class = AttractionSerializer
    permission_classes = [permissions.AllowAny]
