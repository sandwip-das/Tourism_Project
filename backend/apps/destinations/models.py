from django.db import models


class Division(models.Model):
    name_en = models.CharField(max_length=100)
    name_bn = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True)
    description_en = models.TextField(blank=True, default='')
    description_bn = models.TextField(blank=True, default='')
    image_url = models.URLField(max_length=500, blank=True, default='')

    class Meta:
        ordering = ['name_en']

    def __str__(self):
        return f"{self.name_en} ({self.name_bn})"


class District(models.Model):
    division = models.ForeignKey(Division, on_delete=models.CASCADE, related_name='districts')
    name_en = models.CharField(max_length=100)
    name_bn = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True)
    description_en = models.TextField(blank=True, default='')
    description_bn = models.TextField(blank=True, default='')

    class Meta:
        ordering = ['name_en']

    def __str__(self):
        return f"{self.name_en}, {self.division.name_en}"


class Destination(models.Model):
    CATEGORY_CHOICES = [
        ('hills', 'Hills & Valleys (পাহাড় ও উপত্যকা)'),
        ('beach', 'Beaches & Islands (সৈকত ও দ্বীপ)'),
        ('forest', 'Mangroves & Forests (বন ও সুন্দরবন)'),
        ('heritage', 'History & Heritage (ঐতিহাসিক ও পুরাকীর্তি)'),
        ('lake', 'Lakes & Waterfalls (হ্রদ ও ঝর্ণা)'),
        ('tea', 'Tea Gardens & Eco-Parks (চা বাগান ও ইকোপার্ক)'),
    ]

    district = models.ForeignKey(District, on_delete=models.SET_NULL, null=True, blank=True, related_name='destinations')
    division_name = models.CharField(max_length=100, default='Chattogram')
    name_en = models.CharField(max_length=150)
    name_bn = models.CharField(max_length=150)
    slug = models.SlugField(max_length=160, unique=True)
    tagline_en = models.CharField(max_length=255)
    tagline_bn = models.CharField(max_length=255)
    overview_en = models.TextField()
    overview_bn = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='hills')
    
    best_time_to_visit = models.CharField(max_length=100, default='October - March')
    ideal_duration = models.CharField(max_length=100, default='3 Days, 2 Nights')
    climate_info = models.CharField(max_length=200, default='Pleasant winter, lush green monsoons')
    
    hero_image = models.URLField(max_length=500)
    gallery_images = models.JSONField(default=list, blank=True)
    
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.8)
    review_count = models.PositiveIntegerField(default=128)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-rating', 'name_en']

    def __str__(self):
        return f"{self.name_en} - {self.get_category_display()}"


class Attraction(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='attractions')
    name_en = models.CharField(max_length=150)
    name_bn = models.CharField(max_length=150)
    description_en = models.TextField(blank=True, default='')
    description_bn = models.TextField(blank=True, default='')
    image_url = models.URLField(max_length=500, blank=True, default='')
    visiting_hours = models.CharField(max_length=100, default='Sunrise to Sunset')
    ticket_price = models.CharField(max_length=100, default='Free / Nominal')
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name_en']

    def __str__(self):
        return f"{self.name_en} ({self.destination.name_en})"
