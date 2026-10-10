from django.contrib import admin
from django.http import HttpResponse
from .models import TourCategory, TourPackage, TourItineraryDay, TourInclusion
from apps.reports.services import generate_inventory_report_pdf


class TourItineraryDayInline(admin.StackedInline):
    model = TourItineraryDay
    extra = 1


class TourInclusionInline(admin.TabularInline):
    model = TourInclusion
    extra = 2


@admin.register(TourCategory)
class TourCategoryAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'name_bn', 'slug', 'icon_name', 'order', 'is_active')
    prepopulated_fields = {'slug': ('name_en',)}
    list_editable = ('order', 'is_active')


@admin.register(TourPackage)
class TourPackageAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'category', 'destination', 'duration_days', 'price_bdt', 'rating', 'is_featured', 'is_active')
    list_filter = ('category', 'difficulty_level', 'is_featured', 'is_active')
    search_fields = ('title_en', 'title_bn', 'start_location')
    prepopulated_fields = {'slug': ('title_en',)}
    inlines = [TourItineraryDayInline, TourInclusionInline]
    actions = ['export_inventory_pdf']

    @admin.action(description="Generate & Download Tour Inventory PDF Report")
    def export_inventory_pdf(self, request, queryset):
        pdf_bytes = generate_inventory_report_pdf()
        response = HttpResponse(pdf_bytes, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="tour_inventory_report.pdf"'
        return response
