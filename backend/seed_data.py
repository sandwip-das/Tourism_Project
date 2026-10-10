import os
import django
from datetime import date, timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.cms.models import SiteConfig, NavigationItem, FeatureBadge, SectionContent, Testimonial, FAQ
from apps.destinations.models import Division, District, Destination, Attraction
from apps.tours.models import TourCategory, TourPackage, TourItineraryDay, TourInclusion
from apps.bookings.models import Booking, Inquiry


def run_seed():
    print("Seeding database with authentic Bangladesh tourism content...")

    # 1. Site Config
    SiteConfig.objects.all().delete()
    site_cfg = SiteConfig.objects.create(
        site_name='SANDVIORA Tourism Ltd.',
        site_tagline_en='Discover the Untouched Beauty & Wonder of Bangladesh',
        site_tagline_bn='বাংলাদেশের রূপ-লাবণ্য ও প্রাকৃতিক বিস্ময়কে আবিষ্কার করুন',
        logo_url='',
        contact_phone='+880 1711-234567',
        contact_email='sandipdas050@gmail.com',
        office_address_en='Level 8, Crystal Palace, Gulshan-2, Dhaka 1212',
        office_address_bn='লেভেল ৮, ক্রিস্টাল প্যালেস, গুলশান-২, ঢাকা ১২১২',
        hero_badge_text='★ Bangladesh’s Leading Editorial Travel Platform',
        hero_headline_en='Untouched Horizons, Eternal Stories',
        hero_headline_bn='অনাবিল দিগন্ত, চিরন্তন রূপকথা',
        hero_subheadline_en='Journey through emerald hill tracts, rolling tea estates, world-record coastlines, and ancient mangrove jungles. Everything curated, authentic, and sustainably managed.',
        hero_subheadline_bn='সবুজ পাহাড়ের মেঘের ভেলা, চা বাগানের স্নিগ্ধতা, বিশ্বের দীর্ঘতম সমুদ্র সৈকত ও সুন্দরবনের রোমাঞ্চকর অভিযান। স্যান্ডভিওরার সাথে আপনার ভ্রমণ হোক নিরাপদ ও অবিস্মরণীয়।',
        hero_cta_text_en='Explore Curated Destinations',
        hero_cta_text_bn='জনপ্রিয় গন্তব্যসমূহ দেখুন',
        hero_cta_url='#destinations',
        hero_bg_image='https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=2000&q=80',
        search_placeholder_en='Search destinations, hill tracts, tea gardens, beaches...',
        search_placeholder_bn='গন্তব্য, পাহাড়, চা বাগান, সমুদ্র সৈকত খুঁজুন...'
    )

    # 2. Navigation Items
    NavigationItem.objects.all().delete()
    navs = [
        ('Destinations', 'গন্তব্যসমূহ', '#destinations', 'Compass', 1, False),
        ('Curated Tours', 'ট্যুর প্যাকেজ', '#tours', 'MapPin', 2, False),
        ('Experiences', 'অভিজ্ঞতা', '#experiences', 'Sparkles', 3, False),
        ('Travel Planner', 'ভ্রমণ পরিকল্পনা', '#planner', 'Calendar', 4, False),
        ('Traveler Reviews', 'ভ্রমণকারীদের রিভিউ', '#reviews', 'Heart', 5, False),
        ('Travel Stories', 'ভ্রমণ কাহিনী', '#articles', 'Compass', 6, False),
    ]
    for en, bn, url, icon, order, highlight in navs:
        NavigationItem.objects.create(
            label_en=en, label_bn=bn, url=url, icon_name=icon,
            order=order, is_highlighted=highlight
        )

    # 3. Feature Badges
    FeatureBadge.objects.all().delete()
    badges = [
        ('Verified Local Guides', 'স্থানীয় দক্ষ গাইড', 'Every tour is escorted by indigenous, certified experts.', 'প্রত্যেক ভ্রমণে থাকবেন স্থানীয় সার্টিফায়েড বিশেষজ্ঞ গাইড।', 'ShieldCheck', 1),
        ('Eco-Conscious Tourism', 'পরিবেশবান্ধব ভ্রমণ', 'Committed to conservation, plastic neutrality, and ethics.', 'প্রকৃতি সংরক্ষণ ও প্লাস্টিকমুক্ত ভ্রমণের অঙ্গীকার।', 'Sparkles', 2),
        ('Transparent Pricing', 'স্বচ্ছ মূল্য ও কোনো লুকানো ফি নেই', 'All permits, standard entry tickets, and taxes included.', 'সব ধরণের পারমিট, ফি ও ভ্যাট অন্তর্ভুক্ত।', 'Award', 3),
        ('24/7 Operations Room', '২৪/৭ সাপোর্ট হেল্পলাইন', 'Dedicated concierge and safety monitoring across Bangladesh.', 'সারা বাংলাদেশে সার্বক্ষণিক নিরাপত্তা ও তথ্য সহায়তা।', 'Clock', 4),
    ]
    for t_en, t_bn, d_en, d_bn, icon, order in badges:
        FeatureBadge.objects.create(
            title_en=t_en, title_bn=t_bn, description_en=d_en, description_bn=d_bn,
            icon_name=icon, order=order
        )

    # 4. Section Content
    SectionContent.objects.all().delete()
    sections = [
        (
            'destinations_featured',
            'ICONIC BANGLADESH',
            'আইকনিক বাংলাদেশ',
            'Handpicked Destinations',
            'সেরা ভ্রমণ গন্তব্যসমূহ',
            'Explore the legendary landscapes of Bangladesh, from high altitude cloud valleys to tranquil mangrove waterways.',
            'মেঘের রাজ্য সাজেক থেকে শুরু করে ম্যানগ্রোভ বন সুন্দরবন ও কক্সবাজারের সৈকত পর্যন্ত বিস্তৃত অনন্য রূপ।'
        ),
        (
            'tours_curated',
            'ALL-INCLUSIVE PACKAGES',
            'অল-ইনক্লুসিভ প্যাকেজ',
            'Handcrafted Expeditions',
            'রোমাঞ্চকর ভ্রমণ প্যাকেজ',
            'Designed for travelers who seek depth, comfort, and authentic storytelling.',
            'আরামদায়ক যাতায়াত, মানসম্মত রিসোর্ট ও বিশ্বস্ত স্থানীয় আতিথেয়তায় সাজানো ট্যুর।'
        ),
        (
            'experiences_section',
            'THEMATIC JOURNEYS',
            'থিম্যাটিক ভ্রমণ',
            'Distinctive Travel Experiences',
            'বৈচিত্র্যময় ভ্রমণ অভিজ্ঞতা',
            'Select your personal travel style — whether trekking mountain peaks, cruising tidal rivers, or sipping organic tea.',
            'পাহাড়ে ট্রেকিং, সুন্দরবনের নৌবিহার অথবা চা বাগানের নীরবতায় কাটিয়ে দিন আপনার অবসর।'
        ),
        (
            'admin_reports',
            'GOVERNANCE & AUDIT',
            'গভর্ন্যান্স ও অডিট',
            'Administrative Operations & PDF Reports',
            'অ্যাডমিন পোর্টাল ও পিডিএফ রিপোর্ট',
            'Generate instant, high-fidelity PDF statements for reservations, revenue summaries, and inventory capacities.',
            'বুকিং হিসাব, রেভিনিউ বিবরণী ও প্যাকেজ ইনভেন্টরি সংক্রান্ত সকল রিপোর্ট এক ক্লিকে পিডিএফ আকারে ডাউনলোড করুন।'
        ),
    ]
    for key, b_en, b_bn, t_en, t_bn, s_en, s_bn in sections:
        SectionContent.objects.create(
            section_key=key, badge_en=b_en, badge_bn=b_bn,
            title_en=t_en, title_bn=t_bn, subtitle_en=s_en, subtitle_bn=s_bn,
            cta_label_en='View All', cta_label_bn='সব দেখুন', cta_url='#'
        )

    # 5. Divisions & Districts
    Division.objects.all().delete()
    District.objects.all().delete()
    
    chattogram = Division.objects.create(
        name_en='Chattogram', name_bn='চট্টগ্রাম', slug='chattogram',
        description_en='Home to hill tracts, infinite sea beaches, and lush biodiversity.',
        image_url='https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=800&q=80'
    )
    sylhet = Division.objects.create(
        name_en='Sylhet', name_bn='সিলেট', slug='sylhet',
        description_en='The land of two leaves and a bud, swamp forests, and pristine haors.',
        image_url='https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80'
    )
    khulna = Division.objects.create(
        name_en='Khulna', name_bn='খুলনা', slug='khulna',
        description_en='Gateway to the majestic Sundarbans mangrove wilderness.',
        image_url='https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80'
    )

    d_cox = District.objects.create(division=chattogram, name_en="Cox's Bazar", name_bn="কক্সবাজার", slug='coxs-bazar')
    d_rang = District.objects.create(division=chattogram, name_en="Rangamati", name_bn="রাঙামাটি", slug='rangamati')
    d_band = District.objects.create(division=chattogram, name_en="Bandarban", name_bn="বান্দরবান", slug='bandarban')
    d_moul = District.objects.create(division=sylhet, name_en="Moulvibazar", name_bn="মৌলভীবাজার", slug='moulvibazar')
    d_suna = District.objects.create(division=sylhet, name_en="Sunamganj", name_bn="সুনামগঞ্জ", slug='sunamganj')
    d_bage = District.objects.create(division=khulna, name_en="Bagerhat", name_bn="বাগেরহাট", slug='bagerhat')

    # 6. Destinations
    Destination.objects.all().delete()
    dest_sajek = Destination.objects.create(
        district=d_rang,
        division_name='Chattogram',
        name_en='Sajek Valley',
        name_bn='সাজেক ভ্যালি',
        slug='sajek-valley',
        tagline_en='The Queen of Hills Floating in White Clouds',
        tagline_bn='মেঘের উপত্যকায় ভেসে থাকা পাহাড়ের রাণী',
        overview_en='Sajek Valley is situated in the north of Chittagong Hill Tracts, surrounded by Lush greenery and clouds that descend right to your doorstep. Experience traditional bamboo cuisine and stunning sunrise over Konglak Peak.',
        overview_bn='সাজেক ভ্যালি বাংলাদেশের রাঙামাটি জেলার বাঘাইছড়ি উপজেলায় অবস্থিত এক অপরূপ পর্যটন স্থান। সমুদ্রপৃষ্ঠ থেকে প্রায় ১,৮০০ ফুট উঁচুতে অবস্থিত সাজেকের প্রধান আকর্ষণ মেঘের ভেলা ও লুসাই জনগোষ্ঠীর সংস্কৃতি।',
        category='hills',
        best_time_to_visit='September - March',
        ideal_duration='3 Days, 2 Nights',
        climate_info='Cool breeze, frequent morning mist and dramatic sunsets',
        hero_image='https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=1200&q=80',
        gallery_images=[
            'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
        ],
        rating=4.9,
        review_count=342,
        is_featured=True,
        order=1
    )

    dest_cox = Destination.objects.create(
        district=d_cox,
        division_name='Chattogram',
        name_en="Cox's Bazar",
        name_bn='কক্সবাজার',
        slug='coxs-bazar',
        tagline_en="The World's Longest Natural Sea Beach (120 km)",
        tagline_bn='বিশ্বের দীর্ঘতম ১২০ কিমি প্রাকৃতিক সমুদ্র সৈকত',
        overview_en='Cox’s Bazar boasts an unbroken 120-kilometer sandy beach with spectacular sunset views over the Bay of Bengal, fresh seafood culinary journeys, and picturesque Marine Drive cliff rides.',
        overview_bn='বঙ্গোপসাগরের নীল জলরাশি আর বালুকাবেলার মেলবন্ধনে গড়ে ওঠা কক্সবাজার বিশ্বের দীর্ঘতম অবিচ্ছিন্ন সমুদ্র সৈকত। মেরিন ড্রাইভ সড়ক, ইনানী সৈকত ও হিমছড়ির প্রাকৃতিক ঝর্ণা এর অন্যতম আকর্ষণ।',
        category='beach',
        best_time_to_visit='October - April',
        ideal_duration='4 Days, 3 Nights',
        climate_info='Sunny coastal weather, warm tropical ocean waters',
        hero_image='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        gallery_images=[
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
        ],
        rating=4.8,
        review_count=520,
        is_featured=True,
        order=2
    )

    dest_sundar = Destination.objects.create(
        district=d_bage,
        division_name='Khulna',
        name_en='Sundarbans Mangrove Forest',
        name_bn='সুন্দরবন ম্যানগ্রোভ বন',
        slug='sundarbans',
        tagline_en='UNESCO World Heritage Sanctuary & Kingdom of the Royal Bengal Tiger',
        tagline_bn='ইউনেস্কো বিশ্ব ঐতিহ্য ও রয়েল বেঙ্গল টাইগারের বিচরণভূমি',
        overview_en='The world’s largest halophytic mangrove forest, crossed by complex networks of tidal waterways, mudflats, and home to spotted deer, saltwater crocodiles, and the majestic Bengal Tiger.',
        overview_bn='পৃথিবীর বৃহত্তম ম্যানগ্রোভ বন সুন্দরবন। জোয়ার-ভাটার নদীর মোহনা, চিত্রা হরিণের দল, কুমির এবং রয়েল বেঙ্গল টাইগারের পদচিহ্ন—সব মিলিয়ে এক রোমাঞ্চকর বুনো অভিজ্ঞতা।',
        category='forest',
        best_time_to_visit='November - February',
        ideal_duration='4 Days, 3 Nights',
        climate_info='Cool river breezes, serene nocturnal wildlife sounds',
        hero_image='https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
        gallery_images=[
            'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80'
        ],
        rating=4.9,
        review_count=215,
        is_featured=True,
        order=3
    )

    dest_sree = Destination.objects.create(
        district=d_moul,
        division_name='Sylhet',
        name_en='Sreemangal',
        name_bn='শ্রীমঙ্গল',
        slug='sreemangal',
        tagline_en='The Verdant Tea Capital of Bangladesh & Rainforest Sanctuary',
        tagline_bn='সবুজ চা বাগান ও চিরহরিৎ রেইনফরেস্টের রাজধানী',
        overview_en='Sreemangal is known as the Tea Capital of Bangladesh, blanketed by hundreds of terraced tea estates, dense Lawachara rainforest where Hoolock gibbons swing, and serene wetlands.',
        overview_bn='সবুজে মোড়ানো শ্রীমঙ্গল দেশের চা শিল্পের রাজধানী। লাউয়াছড়া জাতীয় উদ্যানের উল্লুক ও পাখির কলকাকলি, মাধবপুর লেক ও সাত রঙের চায়ের স্বাদ ভ্রমণকারীদের মোহিত করে।',
        category='tea',
        best_time_to_visit='All year round; especially Oct - Mar',
        ideal_duration='3 Days, 2 Nights',
        climate_info='Pleasant and mildly humid, fragrant tea garden air',
        hero_image='https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
        gallery_images=[
            'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80'
        ],
        rating=4.7,
        review_count=189,
        is_featured=True,
        order=4
    )

    dest_band = Destination.objects.create(
        district=d_band,
        division_name='Chattogram',
        name_en='Bandarban Hill Tracts',
        name_bn='বান্দরবান পার্বত্য জেলা',
        slug='bandarban',
        tagline_en='Highest Mountain Summits, Golden Temples & Raging Cascades',
        tagline_bn='উঁচু পর্বতশৃঙ্গ, বৌদ্ধ স্বর্ণমন্দির ও পাহাড়ি জলপ্রপাত',
        overview_en='Bandarban features the loftiest peaks of Bangladesh including Nilgiri, Keokradong, and Saka Haphong. Experience authentic Marma, Bawm, and Murong culture alongside thrilling waterfall treks.',
        overview_bn='নীলগিরির মেঘের সাম্রাজ্য, বগা লেকের পৌরাণিক রহস্য আর নাফাখুমের গর্জন নিয়ে বান্দরবান দেশের অন্যতম অ্যাডভেঞ্চার কেন্দ্র।',
        category='hills',
        best_time_to_visit='October - February',
        ideal_duration='4 Days, 3 Nights',
        climate_info='Cool hill climate, clear starry night skies',
        hero_image='https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
        gallery_images=[
            'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
        ],
        rating=4.9,
        review_count=294,
        is_featured=True,
        order=5
    )

    dest_tanguar = Destination.objects.create(
        district=d_suna,
        division_name='Sylhet',
        name_en='Tanguar Haor & Sunamganj',
        name_bn='টাঙ্গুয়ার হাওর ও সুনামগঞ্জ',
        slug='tanguar-haor',
        tagline_en='Pristine Ramsar Wetland Sanctuary & Luxury Houseboat Odyssey',
        tagline_bn='রামসার সাইট টাঙ্গুয়ার হাওর ও প্রিমিয়াম হাউসবোট ভ্রমণ',
        overview_en='A unique wetland ecosystem lying at the foot of Meghalaya hills. Cruise in traditionally crafted wooden luxury houseboats, witness migratory birds, and swim in the crystal blue waters of Jadukata river.',
        overview_bn='মেঘালয় পাহাড়ের পাদদেশে স্বচ্ছ জলের স্বর্গ টাঙ্গুয়ার হাওর। কাঠের বিলাসবহুল বজরা ও হাউসবোটে রাত কাটানো, টেকেরঘাট ও যাদুকাটা নদীর বালুতীর এক অভাবনীয় সৌন্দর্য তুলে ধরে।',
        category='lake',
        best_time_to_visit='July - October (for water expanse) & Dec - Feb (migratory birds)',
        ideal_duration='3 Days, 2 Nights',
        climate_info='Crisp breeze, endless water horizons',
        hero_image='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
        gallery_images=[
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
        ],
        rating=4.8,
        review_count=165,
        is_featured=True,
        order=6
    )

    # 7. Tour Categories
    TourCategory.objects.all().delete()
    cat_adv = TourCategory.objects.create(name_en='Hill Trekking & Adventure', name_bn='পাহাড়ি ট্রেকিং ও অ্যাডভেঞ্চার', slug='adventure', icon_name='Compass', order=1)
    cat_wild = TourCategory.objects.create(name_en='Wildlife & Rainforest Safari', name_bn='বন্যপ্রাণী ও সাফারি', slug='wildlife', icon_name='Sparkles', order=2)
    cat_coast = TourCategory.objects.create(name_en='Coastal & Marine Leisure', name_bn='সমুদ্র সৈকত ও রিফ্রেশমেন্ট', slug='coastal', icon_name='MapPin', order=3)
    cat_boat = TourCategory.objects.create(name_en='Houseboat & River Expeditions', name_bn='হাউসবোট ও রিভার ক্রুজ', slug='river-cruise', icon_name='Calendar', order=4)

    # 8. Tour Packages
    TourPackage.objects.all().delete()
    tour_sajek = TourPackage.objects.create(
        category=cat_adv,
        destination=dest_sajek,
        title_en='Sajek Valley Cloudscape Premium Expedition',
        title_bn='সাজেক ভ্যালি ক্লাউডস্কেপ প্রিমিয়াম অভিযান',
        slug='sajek-valley-cloudscape-premium',
        tagline_en='3 Days / 2 Nights in Luxury Wooden Cottages with Chander Gari Rides',
        tagline_bn='৩ দিন / ২ রাত প্রিমিয়াম কাঠের কটেজে থাকা ও চাঁদের গাড়ি ভ্রমণ',
        overview_en='Immerse yourself above the clouds in Sajek Valley. Includes 4WD Chander Gari transport from Dighinala, private balcony views facing Mizoram hills, authentic tribal dinners, and guided hike to Konglak summit.',
        overview_bn='সাজেক ভ্যালিতে মেঘের রাজ্যে ৩ দিন ২ রাতের প্রিমিয়াম ট্যুর। বিলাসবহুল কটেজ, ঐতিহ্যবাহী ব্যাম্বু চিকেন, কংলাক পাহাড়ের চূড়ায় সূর্যোদয় ও মায়াবী আলুটিলা গুহা পরিদর্শন।',
        duration_days=3,
        duration_nights=2,
        price_bdt=11500.00,
        discount_price_bdt=9800.00,
        max_group_size=12,
        difficulty_level='moderate',
        start_location='Dhaka (Sayedabad / Arambagh)',
        end_location='Dhaka',
        featured_image='https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=1000&q=80',
        badge_label_en='Bestseller',
        badge_label_bn='জনপ্রিয়',
        rating=4.9,
        review_count=142,
        is_featured=True,
        order=1
    )

    TourItineraryDay.objects.create(
        tour=tour_sajek, day_number=1,
        title_en='Scenic Escort to Sajek & Sunset at Helipad',
        title_bn='দীঘিনালা থেকে সাজেক গমন ও সূর্যাস্ত দর্শন',
        description_en='Board the open-roof Chander Gari through security convoy. Arrive at Ruilui Para, check into luxury eco-cottage, and watch sunset at Sajek helipad.',
        description_bn='চাঁদের গাড়িতে করে মেঘের পাহাড় বেয়ে সাজেক প্রবেশ। কটেজে চেক-ইন ও হেলিপ্যাডে দাঁড়িয়ে অপূর্ব সূর্যাস্ত উপভোগ।'
    )
    TourItineraryDay.objects.create(
        tour=tour_sajek, day_number=2,
        title_en='Konglak Summit Trek & Lusai Cultural Evening',
        title_bn='কংলাক পাহাড় ট্রেকিং ও লুসাই সাংস্কৃতিক সন্ধ্যা',
        description_en='Early morning climb to Konglak peak to watch clouds swirl under your feet. Evening bonfire with tribal bamboo chicken feast.',
        description_bn='ভোরে কংলাক পাড়া ট্রেকিং ও মেঘের ভেলা স্পর্শ। সন্ধ্যায় বার্বিকিউ ও ব্যাম্বু চিকেন নৈশভোজ।'
    )
    TourItineraryDay.objects.create(
        tour=tour_sajek, day_number=3,
        title_en='Alutila Cave Exploration & Return to Dhaka',
        title_bn='আলুটিলা রহস্যময় গুহা ও ঢাকার উদ্দেশ্যে যাত্রা',
        description_en='Explore the subterranean dark Alutila cave with flaming bamboo torches, followed by Tarateng waterfall before highway departure.',
        description_bn='মশাল জ্বালিয়ে রোমাঞ্চকর আলুটিলা গুহা অতিক্রম এবং তারাতারেং ঝর্ণা দর্শন শেষে ঢাকার উদ্দেশ্যে যাত্রা।'
    )

    TourInclusion.objects.create(tour=tour_sajek, item_en='Dhaka to Khagrachari AC Bus (Return)', item_bn='ঢাকা-খাগড়াছড়ি এসি বাস রিটার্ন', is_included=True)
    TourInclusion.objects.create(tour=tour_sajek, item_en='Reserved 4WD Chander Gari for 3 days', item_bn='৩ দিনের জন্য সংরক্ষিত চাঁদের গাড়ি', is_included=True)
    TourInclusion.objects.create(tour=tour_sajek, item_en='2 Nights at Premium Mountain View Cottage', item_bn='২ রাত প্রিমিয়াম মাউন্টেন ভিউ কটেজে অবস্থান', is_included=True)
    TourInclusion.objects.create(tour=tour_sajek, item_en='All 7 Gourmet Meals including Tribal Bamboo Cuisine', item_bn='৭ বেলা মানসম্মত খাবার ও ঐতিহ্যবাহী ব্যাম্বু চিকেন', is_included=True)
    TourInclusion.objects.create(tour=tour_sajek, item_en='Personal expenses and optional shopping', item_bn='ব্যক্তিগত কেনাকাটা ও অন্যান্য খরচ', is_included=False)

    tour_sundar = TourPackage.objects.create(
        category=cat_wild,
        destination=dest_sundar,
        title_en='Sundarbans Royal Bengal Forest Cruise',
        title_bn='সুন্দরবন রয়েল বেঙ্গল ফরেস্ট ক্রুজ',
        slug='sundarbans-royal-bengal-cruise',
        tagline_en='4 Days / 3 Nights on Luxury Vessel with Armed Forest Guards',
        tagline_bn='৪ দিন / ৩ রাত বিলাসবহুল জাহাজে সুন্দরবন অন্বেষণ',
        overview_en='Sail through the silent mangrove canals of Kotka, Kochikhali, and Harbaria aboard an air-conditioned cruising ship. Guided bird watching, mudflats trekking, and tiger tracking.',
        overview_bn='বিলাসবহুল ট্যুরিস্ট ভেসেলে সুন্দরবনের গহীন অরণ্যে ৪ দিন ৩ রাতের ক্রুজ। কটকা, কচিখালী ও করমজলে বন্যপ্রাণী পর্যবেক্ষণ ও সাইলেন্ট ক্যানেল ক্রুজিং।',
        duration_days=4,
        duration_nights=3,
        price_bdt=18500.00,
        discount_price_bdt=16200.00,
        max_group_size=20,
        difficulty_level='easy',
        start_location='Khulna / Mongla Port',
        end_location='Khulna / Mongla Port',
        featured_image='https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1000&q=80',
        badge_label_en='UNESCO Certified',
        badge_label_bn='ইউনেস্কো সাইট',
        rating=4.9,
        review_count=98,
        is_featured=True,
        order=2
    )

    tour_tanguar = TourPackage.objects.create(
        category=cat_boat,
        destination=dest_tanguar,
        title_en='Tanguar Haor Luxury Houseboat Voyage',
        title_bn='টাঙ্গুয়ার হাওর লাক্সারি হাউসবোট ট্রিপ',
        slug='tanguar-haor-luxury-houseboat',
        tagline_en='2 Days / 1 Night Living on Crystal Clear Waters in Premium Wooden Bajra',
        tagline_bn='২ দিন / ১ রাত প্রিমিয়াম কাঠের হাউসবোটে জলযাপনের রোমাঞ্চ',
        overview_en='Float in sheer tranquility amidst the wetlands of Sunamganj. Features attached bath cabins, solar power, freshwater swimming, and fresh indigenous duck dinners on deck under moonlight.',
        overview_bn='টাঙ্গুয়ার হাওর, যাদুকাটা নদী ও নীলাদ্রি লেকে ২ দিন ১ রাতের বিলাসবহুল হাউসবোট অভিজ্ঞতা। রুফটপ ডেক, সুস্বাদু হাওরের মাছ ও হাঁসের মাংসের ভূরিভোজ।',
        duration_days=2,
        duration_nights=1,
        price_bdt=8500.00,
        discount_price_bdt=7200.00,
        max_group_size=16,
        difficulty_level='easy',
        start_location='Sunamganj Sadar Ghat',
        end_location='Sunamganj Sadar Ghat',
        featured_image='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
        badge_label_en='Trending',
        badge_label_bn='ট্রেন্ডিং',
        rating=4.8,
        review_count=110,
        is_featured=True,
        order=3
    )

    tour_sree = TourPackage.objects.create(
        category=cat_wild,
        destination=dest_sree,
        title_en='Sreemangal Tea Country & Rainforest Escapade',
        title_bn='শ্রীমঙ্গল টি এস্টেট ও রেইনফরেস্ট রিট্রিট',
        slug='sreemangal-tea-country-retreat',
        tagline_en='3 Days / 2 Nights in 5-Star Eco Resort with Tea Leaf Plucking Tour',
        tagline_bn='৩ দিন / ২ রাত ইকো রিসোর্টে অবকাশ ও চা বাগান ট্যুর',
        overview_en='Experience the peaceful emerald slopes of Moulvibazar. Visit organic tea factories, cycle through rubber plantations, and hike into Lawachara rainforest sanctuary.',
        overview_bn='সবুজ চা বাগানের নির্মল বাতাসে ৩ দিন ২ রাতের আরামদায়ক অবকাশ। লাউয়াছড়া রেইনফরেস্টে ট্রেইল, মাধবপুর লেক ও শ্রীমঙ্গলের ঐতিহ্যবাহী চা স্বাদগ্রহণ।',
        duration_days=3,
        duration_nights=2,
        price_bdt=12000.00,
        discount_price_bdt=10500.00,
        max_group_size=10,
        difficulty_level='easy',
        start_location='Dhaka (Kamalapur / Airport)',
        end_location='Dhaka',
        featured_image='https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1000&q=80',
        badge_label_en='Relaxation',
        badge_label_bn='রিফ্রেশমেন্ট',
        rating=4.8,
        review_count=76,
        is_featured=True,
        order=4
    )

    # 9. Testimonials
    Testimonial.objects.all().delete()
    testimonials_data = [
        ('Tanvir Ahmed', 'Senior Tech Lead, Dhaka', 5, 'Traveling to Sajek with Sandviora was the best decision! The wooden cottage reservation and Chander Gari coordination were 100% seamless.', 'স্যান্ডভিওরার মাধ্যমে সাজেক ট্যুর করাটা জীবনের সেরা সিদ্ধান্তের একটি! কটেজের ভিউ আর চাঁদের গাড়ির সুবিধা অসাধারণ ছিল।', 'Sajek Valley'),
        ('Sabrina Chowdhury', 'Wildlife Photographer', 5, 'Our 4-day Sundarbans cruise exceeded expectations. Knowledgeable naturalist guides and exceptional dining aboard the vessel.', 'সুন্দরবনের গভীর ক্যানেলে ক্রুজ আর অভিজ্ঞ গাইডের দিকনির্দেশনা অবিস্মরণীয় ছিল।', 'Sundarbans'),
        ('Farhan Kabir', 'Travel Blogger', 5, 'Tanguar Haor on their luxury houseboat felt like floating in a poetic paradise. Clean, safe, and truly respectful of local communities.', 'টাঙ্গুয়ার হাওরে হাউসবোটে থাকার অভিজ্ঞতা অনন্য। ছাদ থেকে রাতের তারার মেলা দেখা ছিল অবিশ্বাস্য।', 'Tanguar Haor'),
    ]
    for name, role, rating, c_en, c_bn, dest in testimonials_data:
        Testimonial.objects.create(
            author_name=name, author_role=role, rating=rating,
            comment_en=c_en, comment_bn=c_bn, destination_visited=dest
        )

    # 10. FAQs
    FAQ.objects.all().delete()
    faqs_data = [
        ('How do I book a tour on Sandviora?', 'কীভাবে স্যান্ডভিওরায় ট্যুর বুকিং করব?', 'Simply select your desired package, click Book Now, choose your travel date, and submit traveler details. Instant confirmation voucher generated!', 'পছন্দের প্যাকেজ নির্বাচন করে বুক নাউ বাটনে ক্লিক করুন, তারিখ নির্ধারণ করুন ও তথ্য পূরণ করে নিশ্চিত করুন। সাথে সাথেই ভাউচার পাবেন।', 'Booking'),
        ('Are local security permits included for Sajek and Bandarban?', 'সাজেক ও বান্দরবানের অনুমতিপত্র কি অন্তর্ভুক্ত?', 'Yes! Sandviora handles all military checkpoint permissions, district administrative passes, and local transport logistics.', 'হ্যাঁ, সকল প্রকার প্রশাসনিক ও সেনাক্যাম্পের অনুমতি স্যান্ডভিওরা টিম নিশ্চিত করে।', 'Safety'),
        ('Can I customize an itinerary for private family groups?', 'পারিবারিক বা কর্পোরেট গ্রুপের জন্য কাস্টমাইজ ট্যুর সম্ভব?', 'Absolutely. Use our inquiry form or contact our 24/7 concierge to create customized dates, exclusive vehicles, and premium accommodation.', 'অবশ্যই। আমাদের সাথে যোগাযোগ করে আপনার সুবিধামতো তারিখ ও রিসোর্ট নির্বাচন করে কাস্টম ট্যুর করতে পারেন।', 'General'),
    ]
    for q_en, q_bn, a_en, a_bn, cat in faqs_data:
        FAQ.objects.create(question_en=q_en, question_bn=q_bn, answer_en=a_en, answer_bn=a_bn, category=cat)

    # 11. Seed sample Bookings for reports demonstration
    Booking.objects.all().delete()
    b1 = Booking.objects.create(
        tour=tour_sajek, customer_name='Mofazzal Hossain', customer_email='mofazzal@gmail.com',
        customer_phone='+880 1819-112233', travel_date=date.today() + timedelta(days=7),
        number_of_travelers=3, unit_price=9800.00, total_price=29400.00,
        payment_status='paid', booking_status='confirmed', transaction_id='BKASH-9X8721'
    )
    b2 = Booking.objects.create(
        tour=tour_sundar, customer_name='Dr. Nusrat Jahan', customer_email='nusrat.j@yahoo.com',
        customer_phone='+880 1712-445566', travel_date=date.today() + timedelta(days=14),
        number_of_travelers=2, unit_price=16200.00, total_price=32400.00,
        payment_status='paid', booking_status='confirmed', transaction_id='NAGAD-TR7712'
    )
    b3 = Booking.objects.create(
        tour=tour_tanguar, customer_name='Rafiqul Islam', customer_email='rafiq@outlook.com',
        customer_phone='+880 1911-889900', travel_date=date.today() + timedelta(days=10),
        number_of_travelers=4, unit_price=7200.00, total_price=28800.00,
        payment_status='paid', booking_status='confirmed', transaction_id='CARD-VISA-9912'
    )
    b4 = Booking.objects.create(
        tour=tour_sree, customer_name='Tahsin Rahman', customer_email='tahsin@gmail.com',
        customer_phone='+880 1670-334455', travel_date=date.today() + timedelta(days=21),
        number_of_travelers=2, unit_price=10500.00, total_price=21000.00,
        payment_status='pending', booking_status='pending'
    )

    print("Database seeding completed successfully!")


if __name__ == '__main__':
    run_seed()
