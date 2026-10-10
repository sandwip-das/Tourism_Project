from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.cms.views import (
    SiteConfigViewSet, NavigationItemViewSet, FeatureBadgeViewSet,
    SectionContentViewSet, TestimonialViewSet, FAQViewSet,
    SiteInitializationView, CombinedBootstrapView,
    CampaignBannerViewSet, ActionMatrixCardViewSet, SpotlightFeatureViewSet
)
from apps.destinations.views import (
    DivisionViewSet, DistrictViewSet, DestinationViewSet, AttractionViewSet
)
from apps.tours.views import (
    TourCategoryViewSet, TourPackageViewSet
)
from apps.bookings.views import (
    BookingViewSet, InquiryViewSet
)
from apps.reports.views import (
    ReportStatsView, BookingsPdfReportView,
    RevenuePdfReportView, InventoryPdfReportView
)
from apps.accounts.views import (
    AuthLoginView, AuthRegisterView, UserProfileView, OTPPasswordResetView,
    AdminUserManagementView, AdminGenerateOTPView, ContentModerationViewSet,
    ApproveContentReviewView, ReviewAgainContentModerationView,
    FinancialTransactionViewSet, ApproveFinancialTransactionView,
    DynamicAgentPartnerViewSet
)

router = DefaultRouter()
# CMS
router.register(r'cms/config', SiteConfigViewSet, basename='site-config')
router.register(r'cms/campaigns', CampaignBannerViewSet, basename='campaigns')
router.register(r'cms/action-matrix', ActionMatrixCardViewSet, basename='action-matrix')
router.register(r'cms/spotlights', SpotlightFeatureViewSet, basename='spotlights')
router.register(r'cms/navigation', NavigationItemViewSet, basename='navigation')
router.register(r'cms/features', FeatureBadgeViewSet, basename='features')
router.register(r'cms/sections', SectionContentViewSet, basename='sections')
router.register(r'cms/testimonials', TestimonialViewSet, basename='testimonials')
router.register(r'cms/faqs', FAQViewSet, basename='faqs')

# Destinations
router.register(r'destinations/divisions', DivisionViewSet, basename='divisions')
router.register(r'destinations/districts', DistrictViewSet, basename='districts')
router.register(r'destinations/attractions', AttractionViewSet, basename='attractions')
router.register(r'destinations', DestinationViewSet, basename='destinations')

# Tours
router.register(r'tours/categories', TourCategoryViewSet, basename='tour-categories')
router.register(r'tours', TourPackageViewSet, basename='tours')

# Bookings
router.register(r'bookings', BookingViewSet, basename='bookings')
router.register(r'inquiries', InquiryViewSet, basename='inquiries')

# Accounts & Moderation & Finance & Agents
router.register(r'admin/moderation', ContentModerationViewSet, basename='content-moderation')
router.register(r'finances', FinancialTransactionViewSet, basename='finances')
router.register(r'agents', DynamicAgentPartnerViewSet, basename='agents')

urlpatterns = [
    path('django-admin/', admin.site.urls),
    
    # Site Initialization Payload (Primary endpoint)
    path('api/v1/site-init/', SiteInitializationView.as_view(), name='api-site-init'),
    # Backward compatibility alias
    path('api/v1/bootstrap/', SiteInitializationView.as_view(), name='api-bootstrap'),
    
    # Auth & RBAC
    path('api/v1/auth/login/', AuthLoginView.as_view(), name='auth-login'),
    path('api/v1/auth/register/', AuthRegisterView.as_view(), name='auth-register'),
    path('api/v1/auth/profile/', UserProfileView.as_view(), name='auth-profile'),
    path('api/v1/auth/otp-reset/', OTPPasswordResetView.as_view(), name='auth-otp-reset'),
    
    # Custom Admin Console Operations
    path('api/v1/admin/users/', AdminUserManagementView.as_view(), name='admin-users'),
    path('api/v1/admin/generate-otp/', AdminGenerateOTPView.as_view(), name='admin-generate-otp'),
    path('api/v1/admin/moderation/<int:pk>/approve/', ApproveContentReviewView.as_view(), name='admin-moderation-approve'),
    path('api/v1/admin/moderation/<int:pk>/review-again/', ReviewAgainContentModerationView.as_view(), name='admin-moderation-review-again'),
    path('api/v1/finances/<int:pk>/approve/', ApproveFinancialTransactionView.as_view(), name='finances-approve'),

    # Reports & PDF generation
    path('api/v1/reports/stats/', ReportStatsView.as_view(), name='report-stats'),
    path('api/v1/reports/pdf/bookings/', BookingsPdfReportView.as_view(), name='report-pdf-bookings'),
    path('api/v1/reports/pdf/revenue/', RevenuePdfReportView.as_view(), name='report-pdf-revenue'),
    path('api/v1/reports/pdf/inventory/', InventoryPdfReportView.as_view(), name='report-pdf-inventory'),
    
    # DRF Router
    path('api/v1/', include(router.urls)),
]
