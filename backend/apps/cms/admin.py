from django.contrib import admin
from .models import (
    SiteConfig, NavigationItem, FeatureBadge, SectionContent,
    Testimonial, FAQ, CampaignBanner, ActionMatrixCard, SpotlightFeature
)


@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ('site_name', 'hero_headline_en', 'contact_phone', 'updated_at')


@admin.register(CampaignBanner)
class CampaignBannerAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'kicker_en', 'cta_text_en', 'is_active', 'updated_at')
    list_editable = ('is_active',)


@admin.register(ActionMatrixCard)
class ActionMatrixCardAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'kicker_en', 'order', 'cta_text_en', 'is_active')
    list_editable = ('order', 'is_active')


@admin.register(SpotlightFeature)
class SpotlightFeatureAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'feature_type', 'kicker_en', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    list_filter = ('feature_type', 'is_active')


@admin.register(NavigationItem)
class NavigationItemAdmin(admin.ModelAdmin):
    list_display = ('label_en', 'label_bn', 'url', 'icon_name', 'order', 'is_active', 'is_highlighted')
    list_editable = ('order', 'is_active', 'is_highlighted')


@admin.register(FeatureBadge)
class FeatureBadgeAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'title_bn', 'icon_name', 'order', 'is_active')
    list_editable = ('order', 'is_active')


@admin.register(SectionContent)
class SectionContentAdmin(admin.ModelAdmin):
    list_display = ('section_key', 'title_en', 'badge_en', 'cta_label_en')
    search_fields = ('section_key', 'title_en', 'title_bn')


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('author_name', 'destination_visited', 'rating', 'order', 'is_active')
    list_editable = ('order', 'is_active')


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question_en', 'category', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    list_filter = ('category', 'is_active')
