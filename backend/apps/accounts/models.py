from django.db import models
from django.contrib.auth.models import User
import random
import string


class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('superadmin', 'Super Admin (সুপার এডমিন)'),
        ('admin', 'Central Admin (সেন্ট্রাল এডমিন)'),
        ('moderator', 'Content Moderator (কনটেন্ট মডারেটর)'),
        ('creator', 'Content Creator (কনটেন্ট ক্রিয়েটর)'),
        ('supervisor', 'Supervisor (সুপারভাইজার)'),
        ('accounts_hrm', 'Accounts & HRM (হিসাব ও মানবসম্পদ)'),
        ('agent', 'Service Agent / Partner (এজেন্ট ও পার্টনার)'),
        ('customer', 'Traveler / Customer (সাধারণ গ্রাহক)'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=30, choices=ROLE_CHOICES, default='customer')
    phone = models.CharField(max_length=30, blank=True, default='', help_text='Immutable by customer')
    location = models.CharField(max_length=150, blank=True, default='Dhaka, Bangladesh')
    avatar = models.URLField(
        max_length=500, blank=True, 
        default='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    )
    
    # OTP Password recovery / initial invite flow
    otp_code = models.CharField(max_length=10, blank=True, default='')
    otp_expires_at = models.DateTimeField(null=True, blank=True)
    must_reset_password = models.BooleanField(default=False)
    
    # Granular permissions
    permissions = models.JSONField(
        default=list, blank=True,
        help_text='List of permissions e.g. ["manage_cms", "manage_inventory", "moderate_content", "view_reports", "manage_finances", "manage_users"]'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def generate_otp(self):
        otp = ''.join(random.choices(string.digits, k=6))
        self.otp_code = otp
        self.must_reset_password = True
        self.save()
        return otp

    def __str__(self):
        return f"{self.user.username} ({self.get_role_display()})"


class ContentReviewRequest(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending Admin Review (পেন্ডিং রিভিউ)'),
        ('review_again', 'Review Again / Revision Required (পুনরায় পর্যালোচনার জন্য ফেরত)'),
        ('approved', 'Approved & Published (অনুমোদিত ও প্রকাশিত)'),
        ('rejected', 'Rejected (বাতিল)'),
    ]

    CONTENT_TYPE_CHOICES = [
        ('destination', 'Tourist Destination (পর্যটন গন্তব্য)'),
        ('tour', 'Tour Package (ট্যুর প্যাকেজ)'),
        ('service', 'Commercial Service / Resort (হোটেল/সেবা)'),
        ('article', 'Travel Story / Guide (ভ্রমণ গাইড)'),
    ]

    title = models.CharField(max_length=200)
    content_type = models.CharField(max_length=30, choices=CONTENT_TYPE_CHOICES, default='destination')
    division_name = models.CharField(max_length=100, default='Chattogram')
    district_name = models.CharField(max_length=100, default="Cox's Bazar")
    category = models.CharField(max_length=100, default='beach')
    
    # Payload storing submitted form data
    payload = models.JSONField(default=dict, help_text='Full structured draft content')
    
    submitted_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='submitted_contents')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='pending')
    
    # Admin review feedback
    admin_comments = models.TextField(blank=True, default='')
    admin_reviewer = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='moderated_contents')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"[{self.get_status_display()}] {self.title} by {self.submitted_by.username}"


class FinancialTransaction(models.Model):
    TRANSACTION_TYPES = [
        ('income', 'Revenue / Tour Booking (আয়)'),
        ('expense', 'Operational Expense (পরিচালনা ব্যয়)'),
        ('payroll', 'Employee Salary & Payroll (বেতন ও পে-রোল)'),
        ('vendor_payout', 'Partner / Agent Settlement (পার্টনার সেটেলমেন্ট)'),
    ]

    APPROVAL_STATUSES = [
        ('pending', 'Pending Approval (অনুমোদন প্রতীক্ষিত)'),
        ('approved', 'Approved (অনুমোদিত)'),
        ('rejected', 'Rejected (বাতিল)'),
    ]

    title = models.CharField(max_length=200)
    transaction_type = models.CharField(max_length=30, choices=TRANSACTION_TYPES, default='income')
    amount_bdt = models.DecimalField(max_digits=12, decimal_places=2)
    category = models.CharField(max_length=100)
    approval_status = models.CharField(max_length=30, choices=APPROVAL_STATUSES, default='pending')
    approved_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='approved_finances')
    notes = models.TextField(blank=True, default='')
    transaction_date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - BDT {self.amount_bdt} ({self.approval_status})"


class DynamicAgentPartner(models.Model):
    PARTNER_TYPES = [
        ('hotel', 'Hotel & Resort (হোটেল ও রিসোর্ট)'),
        ('transport', 'Transport & Airlines (পরিবহন সংস্থা)'),
        ('tour_operator', 'Tour Operator (ট্যুর অপারেটর)'),
        ('guide', 'Certified Local Guide (স্থানীয় গাইড)'),
    ]

    INTEGRATION_SCENARIOS = [
        (1, 'Scenario 1: Full API Integration (ওয়েবসাইট ও বুকিং এপিআই সমৃদ্ধ)'),
        (2, 'Scenario 2: Portal Sync (ওয়েবসাইট আছে কিন্তু এপিআই নেই)'),
        (3, 'Scenario 3: Zero-Tech Portal (প্রযুক্তিগত সুবিধাবিহীন, সেন্ট্রাল পোর্টাল পরিচালিত)'),
    ]

    company_name = models.CharField(max_length=200)
    partner_type = models.CharField(max_length=30, choices=PARTNER_TYPES, default='hotel')
    integration_scenario = models.IntegerField(choices=INTEGRATION_SCENARIOS, default=1)
    contact_person = models.CharField(max_length=120)
    phone = models.CharField(max_length=30)
    email = models.EmailField()
    commission_pct = models.DecimalField(max_digits=5, decimal_places=2, default=10.0)
    active_listings_count = models.IntegerField(default=5)
    status = models.CharField(max_length=30, default='active')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.company_name} (Scenario {self.integration_scenario})"
