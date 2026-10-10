from django.contrib import admin
from django.http import HttpResponse
from django.utils.html import format_html
from .models import Booking, Inquiry
from apps.reports.services import generate_bookings_report_pdf, generate_revenue_report_pdf, generate_single_booking_voucher_pdf


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        'booking_reference', 'customer_name', 'customer_phone', 'tour',
        'travel_date', 'number_of_travelers', 'total_price',
        'payment_status', 'booking_status', 'created_at', 'download_voucher'
    )
    list_filter = ('payment_status', 'booking_status', 'travel_date')
    search_fields = ('booking_reference', 'customer_name', 'customer_email', 'customer_phone', 'transaction_id')
    readonly_fields = ('booking_reference', 'created_at', 'updated_at')
    actions = ['export_bookings_pdf', 'export_revenue_pdf']

    def download_voucher(self, obj):
        if obj.payment_status == 'paid' or obj.booking_status == 'confirmed':
            return format_html(
                '<a class="button" style="background:#0284c7;color:#fff;padding:3px 8px;border-radius:4px;text-decoration:none;" href="/api/v1/bookings/{}/voucher-pdf/" target="_blank">PDF Voucher</a>',
                obj.booking_reference
            )
        return format_html('<span style="color:#f59e0b;font-weight:bold;">Pending Verification</span>')
    download_voucher.short_description = "Voucher"

    @admin.action(description="Generate & Download Bookings Summary PDF Report")
    def export_bookings_pdf(self, request, queryset):
        pdf_bytes = generate_bookings_report_pdf()
        response = HttpResponse(pdf_bytes, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="bookings_summary_report.pdf"'
        return response

    @admin.action(description="Generate & Download Revenue & Financial PDF Statement")
    def export_revenue_pdf(self, request, queryset):
        pdf_bytes = generate_revenue_report_pdf()
        response = HttpResponse(pdf_bytes, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="financial_revenue_statement.pdf"'
        return response


@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'destination_interest', 'is_resolved', 'created_at')
    list_filter = ('is_resolved', 'created_at')
    search_fields = ('name', 'email', 'destination_interest', 'message')
