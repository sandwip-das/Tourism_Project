from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.http import HttpResponse
from .models import Booking, Inquiry
from .serializers import BookingSerializer, InquirySerializer
from apps.reports.services import generate_single_booking_voucher_pdf


class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.select_related('tour').all()
    serializer_class = BookingSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'booking_reference'

    def create(self, request, *args, **kwargs):
        # Enforce that user must be provided
        user = request.user if request.user.is_authenticated else None
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if user:
            booking = serializer.save(user=user)
        else:
            booking = serializer.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=['get'], url_path='voucher-pdf')
    def voucher_pdf(self, request, booking_reference=None):
        booking = self.get_object()
        if booking.payment_status != 'paid' and booking.booking_status != 'confirmed':
            return Response(
                {"error": "Payment verification is pending. Official ticket voucher is only issued after administrative confirmation."},
                status=status.HTTP_400_BAD_REQUEST
            )
        pdf_bytes = generate_single_booking_voucher_pdf(booking)
        response = HttpResponse(pdf_bytes, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="voucher_{booking.booking_reference}.pdf"'
        return response

    @action(detail=True, methods=['post'], url_path='verify-payment')
    def verify_payment(self, request, booking_reference=None):
        """
        Admin endpoint to confirm payment and approve booking
        """
        booking = self.get_object()
        action_type = request.data.get('action', 'approve')
        
        if action_type == 'approve':
            booking.payment_status = 'paid'
            booking.booking_status = 'confirmed'
            booking.save()
            return Response({"status": "approved", "message": "Booking payment verified and confirmed."})
        elif action_type == 'reject':
            booking.payment_status = 'failed'
            booking.booking_status = 'cancelled'
            booking.save()
            return Response({"status": "rejected", "message": "Booking payment rejected due to invalid TrxID."})
            
        return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)


class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [permissions.AllowAny]
