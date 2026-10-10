from rest_framework import serializers
from .models import Booking, Inquiry
from apps.tours.serializers import TourPackageListSerializer


class BookingSerializer(serializers.ModelSerializer):
    tour_details = TourPackageListSerializer(source='tour', read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ['booking_reference', 'total_price', 'created_at', 'updated_at']

    def create(self, validated_data):
        unit_price = validated_data.get('unit_price') or validated_data['tour'].discount_price_bdt or validated_data['tour'].price_bdt
        travelers = validated_data.get('number_of_travelers', 1)
        validated_data['unit_price'] = unit_price
        validated_data['total_price'] = unit_price * travelers
        return super().create(validated_data)


class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = '__all__'
        read_only_fields = ['is_resolved', 'created_at']
