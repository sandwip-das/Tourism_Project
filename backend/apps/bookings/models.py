import uuid
from django.db import models
from django.conf import settings
from apps.tours.models import TourPackage


def generate_booking_ref():
    return f"SND-{uuid.uuid4().hex[:8].upper()}"


class Booking(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('pending_verification', 'Pending Payment Verification (যাচাইাধীন)'),
        ('paid', 'Paid & Confirmed (পরিশোধিত)'),
        ('failed', 'Payment Failed / Invalid TrxID (ব্যর্থ)'),
        ('partially_paid', 'Partially Paid (আংশিক পরিশোধিত)'),
        ('refunded', 'Refunded (ফেরত)'),
    ]

    BOOKING_STATUS_CHOICES = [
        ('pending', 'Pending Approval (অনুমোদনাধীন)'),
        ('confirmed', 'Confirmed (নিশ্চিত)'),
        ('completed', 'Completed (সম্পন্ন)'),
        ('cancelled', 'Cancelled (বাতিল)'),
    ]

    booking_reference = models.CharField(max_length=30, unique=True, default=generate_booking_ref, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='bookings')
    tour = models.ForeignKey(TourPackage, on_delete=models.CASCADE, related_name='bookings')
    
    customer_name = models.CharField(max_length=150)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=30)
    
    travel_date = models.DateField()
    number_of_travelers = models.PositiveSmallIntegerField(default=1)
    
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    special_requests = models.TextField(blank=True, default='')
    
    payment_status = models.CharField(max_length=30, choices=PAYMENT_STATUS_CHOICES, default='pending_verification')
    booking_status = models.CharField(max_length=20, choices=BOOKING_STATUS_CHOICES, default='pending')
    
    payment_method = models.CharField(max_length=50, default='bKash Merchant')
    transaction_id = models.CharField(max_length=100, blank=True, default='', help_text='Sender TrxID e.g. 9J4K2881')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.total_price:
            self.total_price = self.unit_price * self.number_of_travelers
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.booking_reference} - {self.customer_name} ({self.tour.title_en})"


class Inquiry(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True, default='')
    destination_interest = models.CharField(max_length=150, blank=True, default='')
    message = models.TextField()
    is_resolved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Inquiries'

    def __str__(self):
        return f"{self.name} - {self.destination_interest}"
