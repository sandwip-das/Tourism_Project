from django.db import models
from apps.destinations.models import Destination


class TourCategory(models.Model):
    name_en = models.CharField(max_length=100)
    name_bn = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True)
    icon_name = models.CharField(max_length=50, default='Compass')
    image_url = models.URLField(max_length=500, blank=True, default='')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order', 'name_en']
        verbose_name_plural = 'Tour Categories'

    def __str__(self):
        return f"{self.name_en} ({self.name_bn})"


class TourPackage(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy (সহজ)'),
        ('moderate', 'Moderate (মাঝারি)'),
        ('challenging', 'Challenging (কঠিন)'),
    ]

    category = models.ForeignKey(TourCategory, on_delete=models.SET_NULL, null=True, related_name='tours')
    destination = models.ForeignKey(Destination, on_delete=models.SET_NULL, null=True, blank=True, related_name='tours')
    
    title_en = models.CharField(max_length=200)
    title_bn = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    
    tagline_en = models.CharField(max_length=255, default='All-inclusive premium experience')
    tagline_bn = models.CharField(max_length=255, default='প্রিমিয়াম ভ্রমণ ও থাকার সুব্যবস্থা')
    overview_en = models.TextField()
    overview_bn = models.TextField()
    
    duration_days = models.PositiveSmallIntegerField(default=3)
    duration_nights = models.PositiveSmallIntegerField(default=2)
    
    price_bdt = models.DecimalField(max_digits=10, decimal_places=2, default=12500.00)
    discount_price_bdt = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    max_group_size = models.PositiveSmallIntegerField(default=12)
    difficulty_level = models.CharField(max_length=30, choices=DIFFICULTY_CHOICES, default='moderate')
    
    start_location = models.CharField(max_length=100, default='Dhaka')
    end_location = models.CharField(max_length=100, default='Dhaka')
    
    featured_image = models.URLField(max_length=500)
    gallery_images = models.JSONField(default=list, blank=True)
    
    badge_label_en = models.CharField(max_length=50, blank=True, default='Bestseller')
    badge_label_bn = models.CharField(max_length=50, blank=True, default='জনপ্রিয়')
    
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.9)
    review_count = models.PositiveIntegerField(default=84)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-rating', 'title_en']

    def __str__(self):
        return f"{self.title_en} ({self.duration_days}D/{self.duration_nights}N)"


class TourItineraryDay(models.Model):
    tour = models.ForeignKey(TourPackage, on_delete=models.CASCADE, related_name='itinerary_days')
    day_number = models.PositiveSmallIntegerField(default=1)
    title_en = models.CharField(max_length=150)
    title_bn = models.CharField(max_length=150)
    description_en = models.TextField()
    description_bn = models.TextField()
    meals_included = models.CharField(max_length=100, default='Breakfast, Lunch, Dinner')
    accommodation_info = models.CharField(max_length=150, default='Resort / Eco Cottage')

    class Meta:
        ordering = ['day_number']

    def __str__(self):
        return f"{self.tour.title_en} - Day {self.day_number}: {self.title_en}"


class TourInclusion(models.Model):
    tour = models.ForeignKey(TourPackage, on_delete=models.CASCADE, related_name='inclusions')
    item_en = models.CharField(max_length=200)
    item_bn = models.CharField(max_length=200)
    is_included = models.BooleanField(default=True, help_text='True if included, False if excluded')

    class Meta:
        ordering = ['-is_included', 'item_en']

    def __str__(self):
        status = "✓" if self.is_included else "✗"
        return f"{status} {self.item_en}"
