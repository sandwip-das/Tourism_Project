from django.contrib import admin
from .models import Division, District, Destination, Attraction


class DistrictInline(admin.TabularInline):
    model = District
    extra = 1


@admin.register(Division)
class DivisionAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'name_bn', 'slug')
    prepopulated_fields = {'slug': ('name_en',)}
    inlines = [DistrictInline]


@admin.register(District)
class DistrictAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'name_bn', 'division', 'slug')
    prepopulated_fields = {'slug': ('name_en',)}
    list_filter = ('division',)


class AttractionInline(admin.StackedInline):
    model = Attraction
    extra = 1


@admin.register(Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'name_bn', 'division_name', 'category', 'rating', 'is_featured', 'order')
    list_filter = ('category', 'division_name', 'is_featured')
    search_fields = ('name_en', 'name_bn', 'tagline_en', 'overview_en')
    prepopulated_fields = {'slug': ('name_en',)}
    inlines = [AttractionInline]


@admin.register(Attraction)
class AttractionAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'destination', 'visiting_hours', 'ticket_price', 'order')
    search_fields = ('name_en', 'destination__name_en')
