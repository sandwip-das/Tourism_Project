from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.http import HttpResponse
from apps.bookings.models import Booking, Inquiry
from apps.tours.models import TourPackage
from apps.destinations.models import Destination
from .services import (
    generate_bookings_report_pdf,
    generate_revenue_report_pdf,
    generate_inventory_report_pdf
)


class ReportStatsView(APIView):
    """
    Returns administrative KPI metrics and recent activity for the Admin Panel.
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        total_bookings = Booking.objects.count()
        confirmed_bookings = Booking.objects.filter(booking_status='confirmed').count()
        total_revenue = sum(float(b.total_price) for b in Booking.objects.filter(payment_status='paid'))
        total_destinations = Destination.objects.count()
        total_tours = TourPackage.objects.filter(is_active=True).count()
        pending_inquiries = Inquiry.objects.filter(is_resolved=False).count()

        recent_bookings = [
            {
                'ref': b.booking_reference,
                'customer': b.customer_name,
                'tour': b.tour.title_en,
                'amount': float(b.total_price),
                'date': str(b.travel_date),
                'status': b.booking_status,
                'payment': b.payment_status,
            }
            for b in Booking.objects.select_related('tour').order_by('-created_at')[:8]
        ]

        return Response({
            'kpis': {
                'total_bookings': total_bookings,
                'confirmed_bookings': confirmed_bookings,
                'total_revenue_bdt': total_revenue,
                'total_destinations': total_destinations,
                'total_active_tours': total_tours,
                'pending_inquiries': pending_inquiries,
            },
            'recent_bookings': recent_bookings,
            'pdf_reports': [
                {
                    'id': 'bookings',
                    'title': 'Bookings & Reservations Report',
                    'description': 'Full audit log of traveler reservations, contact details, dates, and confirmation statuses.',
                    'endpoint': '/api/v1/reports/pdf/bookings/'
                },
                {
                    'id': 'revenue',
                    'title': 'Financial & Revenue Statement',
                    'description': 'Gross platform volume, revenue broken down by tour package, and guest totals.',
                    'endpoint': '/api/v1/reports/pdf/revenue/'
                },
                {
                    'id': 'inventory',
                    'title': 'Tour Inventory & Capacity Report',
                    'description': 'Catalogue of all packages, itineraries, max capacities, and pricing tiers.',
                    'endpoint': '/api/v1/reports/pdf/inventory/'
                }
            ]
        })


class BookingsPdfReportView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        pdf_bytes = generate_bookings_report_pdf()
        response = HttpResponse(pdf_bytes, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="sandviora_bookings_report.pdf"'
        return response


class RevenuePdfReportView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        pdf_bytes = generate_revenue_report_pdf()
        response = HttpResponse(pdf_bytes, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="sandviora_revenue_statement.pdf"'
        return response


class InventoryPdfReportView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        pdf_bytes = generate_inventory_report_pdf()
        response = HttpResponse(pdf_bytes, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="sandviora_inventory_report.pdf"'
        return response
