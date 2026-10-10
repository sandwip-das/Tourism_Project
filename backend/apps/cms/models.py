from django.db import models


class SiteConfig(models.Model):
    site_name = models.CharField(max_length=150, default='SANDVIORA Tourism')
    site_tagline_en = models.CharField(max_length=255, default='Discover the Untouched Beauty of Bangladesh')
    site_tagline_bn = models.CharField(max_length=255, default='বাংলাদেশের অনাবিল সৌন্দর্য আবিষ্কার করুন')
    logo_url = models.CharField(max_length=500, blank=True, default='')
    contact_phone = models.CharField(max_length=50, default='+880 1700-000000')
    contact_email = models.EmailField(default='sandipdas050@gmail.com')
    office_address_en = models.CharField(max_length=255, default='Gulshan-2, Dhaka 1212, Bangladesh')
    office_address_bn = models.CharField(max_length=255, default='গুলশান-২, ঢাকা ১২১২, বাংলাদেশ')
    facebook_url = models.URLField(blank=True, default='https://facebook.com')
    instagram_url = models.URLField(blank=True, default='https://instagram.com')
    youtube_url = models.URLField(blank=True, default='https://youtube.com')
    
    # Hero section managed dynamically
    hero_badge_text = models.CharField(max_length=100, default='BEST IN TRAVEL WINNER')
    hero_headline_en = models.CharField(max_length=255, default='SAJEK VALLEY & CHITTAGONG HILL TRACTS')
    hero_headline_bn = models.CharField(max_length=255, default='সাজেক ভ্যালি ও পার্বত্য চট্টগ্রাম')
    hero_subheadline_en = models.TextField(default='From lush rolling cloudscapes and serene indigenous cultures to untouched tribal trails and panoramic mountain viewpoints, this hill tract sanctuary invites you to slow down and savor the journey.')
    hero_subheadline_bn = models.TextField(default='প্রকৃতির অপূর্ব মেঘের রাজ্য, স্নিগ্ধ পাহাড়ি উপত্যকা ও সমৃদ্ধ স্থানীয় সংস্কৃতির মেলবন্ধন। রোমাঞ্চকর পাহাড়ি ট্রেইল ও মেঘের ওপর সূর্যাস্তের অসাধারণ অভিজ্ঞতা।')
    hero_cta_text_en = models.CharField(max_length=100, default='BEST IN TRAVEL 2026')
    hero_cta_text_bn = models.CharField(max_length=100, default='২০২৬ এর সেরা তালিকা দেখুন')
    hero_cta_url = models.CharField(max_length=200, default='#destinations')
    hero_bg_image = models.CharField(max_length=500, default='/media/image_jm0r06ajcd6afdte29dv2o0m7o.webp')
    hero_photographer_tag = models.CharField(max_length=150, default='PHOTO: SANDVIORA EDITORIAL ARCHIVE')
    
    # Search placeholder
    search_placeholder_en = models.CharField(max_length=150, default='Where do you want to explore in Bangladesh?')
    search_placeholder_bn = models.CharField(max_length=150, default='বাংলাদেশের কোথায় ভ্রমণ করতে চান?')

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Site Configuration'
        verbose_name_plural = 'Site Configuration'

    def __str__(self):
        return f"{self.site_name} Configuration"


class CampaignBanner(models.Model):
    """
    Full-bleed 'Best in Travel 2026' editorial campaign banner
    """
    kicker_en = models.CharField(max_length=100, default="SANDVIORA'S")
    kicker_bn = models.CharField(max_length=100, default="স্যান্ডভিওরা ম্যাগাজিন")
    title_en = models.CharField(max_length=200, default='Best in Travel 2026')
    title_bn = models.CharField(max_length=200, default='সেরা ভ্রমণ গন্তব্য ২০২৬')
    description_en = models.TextField(default="For our annual travel rankings, we asked our community of regional explorers and seasoned writers where they're heading next. Here are the must-visit destinations making waves right now.")
    description_bn = models.TextField(default="আমাদের বার্ষিক ভ্রমণ র্যাঙ্কিংয়ের জন্য আমরা স্থানীয় গবেষক ও ভ্রমণ বিশেষজ্ঞদের প্রশ্ন করেছিলাম: এরপর কোথায়? এখানে তুলে ধরা হলো দেশের সবচেয়ে আকর্ষণীয় ও আলোচিত ৫০টি গন্তব্য।")
    bg_image = models.CharField(max_length=500, default='/media/image_o683v8n8652o9dss1ic9nni56p.webp')
    cta_text_en = models.CharField(max_length=100, default='VIEW THE LIST')
    cta_text_bn = models.CharField(max_length=100, default='পূর্ণাঙ্গ তালিকা দেখুন')
    cta_url = models.CharField(max_length=200, default='#destinations')
    is_active = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Campaign Banner'
        verbose_name_plural = 'Campaign Banners'

    def __str__(self):
        return self.title_en


class ActionMatrixCard(models.Model):
    """
    The 4-pillar promotional pathways: BOOKS, STORIES, JOURNEYS, THE APP
    """
    kicker_en = models.CharField(max_length=100, default='PLAN IT YOURSELF')
    kicker_bn = models.CharField(max_length=100, default='নিজের ভ্রমণ নিজে সাজান')
    title_en = models.CharField(max_length=150, default='BOOKS')
    title_bn = models.CharField(max_length=150, default='গাইডবুক')
    cta_text_en = models.CharField(max_length=100, default='SHOP GUIDEBOOKS')
    cta_text_bn = models.CharField(max_length=100, default='গাইডবুক কিনুন')
    target_url = models.CharField(max_length=200, default='#destinations')
    image_url = models.CharField(max_length=500, default='/media/image_57elqnia655m5eq2pr4dv8o23o.jpg')
    bg_color = models.CharField(max_length=50, default='bg-[#C95A1E]')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']
        verbose_name = 'Action Matrix Card'
        verbose_name_plural = 'Action Matrix Cards'

    def __str__(self):
        return f"{self.order}. {self.title_en} ({self.kicker_en})"


class SpotlightFeature(models.Model):
    """
    Editorial features: Trending Destination & Partner Spotlight
    """
    TYPE_CHOICES = [
        ('trending', 'Trending Destination'),
        ('partner', 'Partner Spotlight'),
    ]
    feature_type = models.CharField(max_length=30, choices=TYPE_CHOICES, default='trending')
    kicker_en = models.CharField(max_length=100, default='TRENDING DESTINATION')
    kicker_bn = models.CharField(max_length=100, default='জনপ্রিয় ট্রেন্ডিং গন্তব্য')
    title_en = models.CharField(max_length=200, default='Sreemangal & Sylhet Highlands')
    title_bn = models.CharField(max_length=200, default='শ্রীমঙ্গল ও সিলেটের সবুজ পাহাড়')
    description_en = models.TextField(default='Rolling emerald tea terraces, endangered hoolock gibbon canopies, crystal forest streams, and legendary seven-layer tea. Experience the quietest, most rejuvenating atmosphere in the northeast.')
    description_bn = models.TextField(default='দুটি পাতা একটি কুঁড়ির সবুজ চা বাগান, বিলুপ্তপ্রায় উল্লুকের ডাক, লাউয়াছড়া রেইনফরেস্ট ট্রেইল ও বিখ্যাত সাত রঙের চায়ের অভিজ্ঞতা। প্রকৃতির স্নিগ্ধতায় হারিয়ে যাওয়ার জন্য সেরা গন্তব্য।')
    image_url = models.CharField(max_length=500, default='/media/image_2ota2fffb95n77picluv9gmt2h.webp')
    cta_text_en = models.CharField(max_length=100, default='READ TRAVEL GUIDE')
    cta_text_bn = models.CharField(max_length=100, default='ভ্রমণ গাইড পড়ুন')
    cta_url = models.CharField(max_length=200, default='#destinations')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']
        verbose_name = 'Spotlight Feature'
        verbose_name_plural = 'Spotlight Features'

    def __str__(self):
        return f"[{self.feature_type}] {self.title_en}"


class NavigationItem(models.Model):
    label_en = models.CharField(max_length=100)
    label_bn = models.CharField(max_length=100)
    url = models.CharField(max_length=200)
    icon_name = models.CharField(max_length=50, blank=True, default='Compass', help_text='Icon identifier, e.g. Compass, MapPin, Calendar, Heart, Shield')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_highlighted = models.BooleanField(default=False)

    class Meta:
        ordering = ['order']
        verbose_name = 'Navigation Item'
        verbose_name_plural = 'Navigation Items'

    def __str__(self):
        return f"{self.label_en} ({self.url})"


class FeatureBadge(models.Model):
    title_en = models.CharField(max_length=120)
    title_bn = models.CharField(max_length=120)
    description_en = models.CharField(max_length=255)
    description_bn = models.CharField(max_length=255)
    icon_name = models.CharField(max_length=50, default='ShieldCheck', help_text='Icon identifier, e.g. ShieldCheck, Sparkles, Award, Clock')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title_en


class SectionContent(models.Model):
    section_key = models.CharField(max_length=100, unique=True, help_text='Key e.g. destinations_featured, tours_curated, experiences_section, reviews_section')
    badge_en = models.CharField(max_length=100, blank=True, default='')
    badge_bn = models.CharField(max_length=100, blank=True, default='')
    title_en = models.CharField(max_length=200)
    title_bn = models.CharField(max_length=200)
    subtitle_en = models.TextField(blank=True, default='')
    subtitle_bn = models.TextField(blank=True, default='')
    cta_label_en = models.CharField(max_length=100, blank=True, default='')
    cta_label_bn = models.CharField(max_length=100, blank=True, default='')
    cta_url = models.CharField(max_length=200, blank=True, default='')

    class Meta:
        verbose_name = 'Section Content'
        verbose_name_plural = 'Section Contents'

    def __str__(self):
        return f"[{self.section_key}] {self.title_en}"


class Testimonial(models.Model):
    author_name = models.CharField(max_length=150)
    author_role = models.CharField(max_length=150, default='Traveler')
    author_avatar = models.URLField(max_length=500, blank=True, default='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80')
    rating = models.PositiveSmallIntegerField(default=5)
    comment_en = models.TextField()
    comment_bn = models.TextField()
    destination_visited = models.CharField(max_length=150, default='Sajek Valley')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.author_name} - {self.destination_visited}"


class FAQ(models.Model):
    question_en = models.CharField(max_length=255)
    question_bn = models.CharField(max_length=255)
    answer_en = models.TextField()
    answer_bn = models.TextField()
    category = models.CharField(max_length=100, default='General')
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.question_en
