import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.cms.models import SiteConfig, CampaignBanner, ActionMatrixCard, SpotlightFeature

# 1. Update SiteConfig hero fields
cfg = SiteConfig.objects.first()
if cfg:
    cfg.hero_badge_text = 'BEST IN TRAVEL WINNER'
    cfg.hero_headline_en = 'PRINCE EDWARD ISLAND, CANADA'
    cfg.hero_headline_bn = 'সাজেক ভ্যালি ও পার্বত্য চট্টগ্রাম'
    cfg.hero_subheadline_en = 'Best in Travel winner rewards visitors with some of the world’s softest coastal scenery, serene cloudscapes, and rich cultural lore. A traveler’s paradise, inviting you to slow down, explore indigenous trails, and savor every sunset.'
    cfg.hero_subheadline_bn = 'প্রকৃতির অপূর্ব মেঘের রাজ্য, স্নিগ্ধ পাহাড়ি উপত্যকা ও সমৃদ্ধ স্থানীয় সংস্কৃতির মেলবন্ধন। রোমাঞ্চকর পাহাড়ি ট্রেইল ও মেঘের ওপর সূর্যাস্তের অসাধারণ অভিজ্ঞতা।'
    cfg.hero_cta_text_en = 'BEST IN TRAVEL 2026'
    cfg.hero_cta_text_bn = '২০২৬ এর সেরা তালিকা দেখুন'
    cfg.hero_bg_image = '/media/image_jm0r06ajcd6afdte29dv2o0m7o.webp'
    cfg.hero_photographer_tag = 'PHOTO: SANDVIORA EDITORIAL ARCHIVE'
    cfg.save()
    print('SiteConfig updated successfully.')

# 2. Seed CampaignBanner
if not CampaignBanner.objects.exists():
    CampaignBanner.objects.create(
        kicker_en="SANDVIORA'S",
        kicker_bn='স্যান্ডভিওরা ম্যাগাজিন',
        title_en='Best in Travel 2026',
        title_bn='সেরা ভ্রমণ গন্তব্য ২০২৬',
        description_en="For our annual travel rankings, we asked our community of regional explorers and seasoned writers where they're heading next. Here are the must-visit destinations making waves right now.",
        description_bn='আমাদের বার্ষিক ভ্রমণ র্যাঙ্কিংয়ের জন্য আমরা স্থানীয় গবেষক ও ভ্রমণ বিশেষজ্ঞদের প্রশ্ন করেছিলাম: এরপর কোথায়? এখানে তুলে ধরা হলো দেশের সবচেয়ে আকর্ষণীয় ও আলোচিত ৫০টি গন্তব্য।',
        bg_image='/media/image_o683v8n8652o9dss1ic9nni56p.webp',
        cta_text_en='VIEW THE LIST',
        cta_text_bn='পূর্ণাঙ্গ তালিকা দেখুন',
        cta_url='#destinations',
        is_active=True
    )
    print('CampaignBanner created.')

# 3. Seed ActionMatrixCards
if not ActionMatrixCard.objects.exists():
    ActionMatrixCard.objects.create(
        kicker_en='PLAN IT YOURSELF',
        kicker_bn='নিজের ভ্রমণ নিজে সাজান',
        title_en='BOOKS',
        title_bn='গাইডবুক',
        cta_text_en='SHOP GUIDEBOOKS',
        cta_text_bn='গাইডবুক কিনুন',
        target_url='#destinations',
        image_url='/media/image_57elqnia655m5eq2pr4dv8o23o.jpg',
        bg_color='bg-[#C95A1E]',
        order=1,
        is_active=True
    )
    ActionMatrixCard.objects.create(
        kicker_en='GET INSPIRED',
        kicker_bn='অনুপ্রেরণা নিন',
        title_en='STORIES',
        title_bn='ভ্রমণ গল্প',
        cta_text_en='ALL ARTICLES',
        cta_text_bn='সকল প্রতিবেদন',
        target_url='#articles',
        image_url='/media/image_bdr35r8n513an9lek9up12qa4d.webp',
        bg_color='bg-[#2B3A42]',
        order=2,
        is_active=True
    )
    ActionMatrixCard.objects.create(
        kicker_en="WE'LL PLAN IT FOR YOU",
        kicker_bn='আমাদের দল সাজাবে',
        title_en='JOURNEYS',
        title_bn='অভিযান',
        cta_text_en='FIND A LOCAL EXPERT',
        cta_text_bn='লোকাল গাইড খুঁজুন',
        target_url='#tours',
        image_url='/media/image_5q471hcfsl6vp2hpirr9aj653e.webp',
        bg_color='bg-[#3D405B]',
        order=3,
        is_active=True
    )
    ActionMatrixCard.objects.create(
        kicker_en='BUILD YOUR TRIP',
        kicker_bn='ভ্রমণ সাজান ফোনে',
        title_en='THE SANDVIORA APP',
        title_bn='স্যান্ডভিওরা অ্যাপ',
        cta_text_en='DOWNLOAD NOW',
        cta_text_bn='অ্যাপ ডাউনলোড করুন',
        target_url='#destinations',
        image_url='/media/image_cs2skhiagd5td9tf88jp6cdb43.webp',
        bg_color='bg-[#1E293B]',
        order=4,
        is_active=True
    )
    print('ActionMatrixCards created.')

# 4. Seed SpotlightFeatures
if not SpotlightFeature.objects.exists():
    SpotlightFeature.objects.create(
        feature_type='trending',
        kicker_en='TRENDING DESTINATION',
        kicker_bn='জনপ্রিয় ট্রেন্ডিং গন্তব্য',
        title_en='Sreemangal & Sylhet Highlands',
        title_bn='শ্রীমঙ্গল ও সিলেটের সবুজ পাহাড়',
        description_en='Rolling emerald tea terraces, endangered hoolock gibbon canopies, crystal forest streams, and legendary seven-layer tea. Experience the quietest, most rejuvenating atmosphere in the northeast.',
        description_bn='দুটি পাতা একটি কুঁড়ির সবুজ চা বাগান, বিলুপ্তপ্রায় উল্লুকের ডাক, লাউয়াছড়া রেইনফরেস্ট ট্রেইল ও বিখ্যাত সাত রঙের চায়ের অভিজ্ঞতা। প্রকৃতির স্নিগ্ধতায় হারিয়ে যাওয়ার জন্য সেরা গন্তব্য।',
        image_url='/media/image_2ota2fffb95n77picluv9gmt2h.webp',
        cta_text_en='READ TRAVEL GUIDE',
        cta_text_bn='ভ্রমণ গাইড পড়ুন',
        cta_url='#destinations',
        order=1,
        is_active=True
    )
    SpotlightFeature.objects.create(
        feature_type='partner',
        kicker_en='PARTNER SPOTLIGHT',
        kicker_bn='পার্টনার স্পটলাইট',
        title_en='Tanguar Haor: Starlight Wetland Haven',
        title_bn='টাঙ্গুয়ার হাওর: ভাসমান জলরাশির স্বর্গ',
        description_en='Glide across crystal wetlands against the Meghalaya hill silhouettes. Savor fresh indigenous delicacies and spend a tranquil night beneath open celestial constellations with our verified houseboat partners.',
        description_bn='মেঘালয় পাহাড়ের পাদদেশে স্বচ্ছ জলরাশিতে ভাসমান রাত, ঐতিহ্যবাহী হাঁসের মাংসের ভূরিভোজ এবং তারার মেলা। আমাদের ভেরিফাইড লোকাল হাউসবোট পার্টনারদের সাথে নিরাপদ ভ্রমণ।',
        image_url='/media/image_9sjv8he53p33f55no19p6nti50.webp',
        cta_text_en='PLAN YOUR EXPEDITION',
        cta_text_bn='ট্যুর প্যাকেজ বুক করুন',
        cta_url='#tours',
        order=2,
        is_active=True
    )
    print('SpotlightFeatures created.')
