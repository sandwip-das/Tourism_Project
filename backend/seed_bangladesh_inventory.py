import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth.models import User
from apps.destinations.models import Division, District
from apps.accounts.models import UserProfile, ContentReviewRequest, FinancialTransaction, DynamicAgentPartner

def run():
    print("Populating all 8 Divisions and 64 Districts of Bangladesh...")

    divisions_data = [
        {
            'name_en': 'Dhaka',
            'name_bn': 'ঢাকা বিভাগ',
            'slug': 'dhaka',
            'description_en': 'The bustling cultural, historical and economic heartland of Bangladesh.',
            'description_bn': 'বাংলাদেশের ঐতিহ্য, সংস্কৃতি ও অর্থনীতির প্রাণকেন্দ্র।',
            'image_url': 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1000&q=80',
            'districts': [
                ('Dhaka', 'ঢাকা'), ('Gazipur', 'গাজীপুর'), ('Kishoreganj', 'কিশোরগঞ্জ'),
                ('Manikganj', 'মানিকগঞ্জ'), ('Munshiganj', 'মুন্সীগঞ্জ'), ('Narayanganj', 'নারায়ণগঞ্জ'),
                ('Narsingdi', 'নরসিংদী'), ('Tangail', 'টাঙ্গাইল'), ('Faridpur', 'ফরিদপুর'),
                ('Gopalganj', 'গোপালগঞ্জ'), ('Madaripur', 'মাদারীপুর'), ('Rajbari', 'রাজবাড়ী'),
                ('Shariatpur', 'শরীয়তপুর')
            ]
        },
        {
            'name_en': 'Chattogram',
            'name_bn': 'চট্টগ্রাম বিভাগ',
            'slug': 'chattogram',
            'description_en': 'World’s longest sea beach, scenic hill tracts, waterfalls and coastal islands.',
            'description_bn': 'বিশ্বের দীর্ঘতম সমুদ্র সৈকত, সবুজ পাহাড়, ঝর্ণা ও উপকূলীয় দ্বীপের স্বর্গভূমি।',
            'image_url': 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1000&q=80',
            'districts': [
                ('Chattogram', 'চট্টগ্রাম'), ("Cox's Bazar", 'কক্সবাজার'), ('Bandarban', 'বান্দরবান'),
                ('Rangamati', 'রাঙ্গামাটি'), ('Khagrachhari', 'খাগড়াছড়ি'), ('Feni', 'ফেনী'),
                ('Noakhali', 'নোয়াখালী'), ('Lakshmipur', 'লক্ষ্মীপুর'), ('Cumilla', 'কুমিল্লা'),
                ('Brahmanbaria', 'ব্রাহ্মণবাড়িয়া'), ('Chandpur', 'চাঁদপুর')
            ]
        },
        {
            'name_en': 'Sylhet',
            'name_bn': 'সিলেট বিভাগ',
            'slug': 'সিলেট বিভাগ',
            'slug_en': 'sylhet',
            'description_en': 'Land of two leaves and a bud, mystical wetlands, crystal stone rivers and shrines.',
            'description_bn': 'দুটি পাতা একটি কুঁড়ির সবুজ দেশ, হাওর ও স্বচ্ছ পাথুরে নদীর পূণ্যভূমি।',
            'image_url': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
            'districts': [
                ('Sylhet', 'সিলেট'), ('Moulvibazar', 'মৌলভীবাজার'), ('Habiganj', 'হবিগঞ্জ'),
                ('Sunamganj', 'সুনামগঞ্জ')
            ]
        },
        {
            'name_en': 'Khulna',
            'name_bn': 'খুলনা বিভাগ',
            'slug': 'khulna',
            'description_en': 'Gateway to the Sundarbans mangrove forest, royal Bengal tigers and terracotta heritage.',
            'description_bn': 'সুন্দরবনের চিরসবুজ ম্যানগ্রোভ বন, রয়েল বেঙ্গল টাইগার ও পোড়ামাটির স্থাপত্যের দ্বার।',
            'image_url': 'https://images.unsplash.com/photo-1608958435020-e8a7109ba809?auto=format&fit=crop&w=1000&q=80',
            'districts': [
                ('Khulna', 'খুলনা'), ('Bagerhat', 'বাগেরহাট'), ('Satkhira', 'সাতক্ষীরা'),
                ('Jessore', 'যশোর'), ('Jhenaidah', 'ঝিনাইদহ'), ('Magura', 'মাগুরা'),
                ('Narail', 'নড়াইল'), ('Kushtia', 'কুষ্টিয়া'), ('Chuadanga', 'চুয়াডাঙ্গা'),
                ('Meherpur', 'মেহেরপুর')
            ]
        },
        {
            'name_en': 'Rajshahi',
            'name_bn': 'রাজশাহী বিভাগ',
            'slug': 'rajshahi',
            'description_en': 'Silk capital, mango orchards, and the ancient Buddhist viharas of Bengal.',
            'description_bn': 'রেশম নগরী, আমের বাগান এবং বরেন্দ্র ভূমির প্রাচীন বৌদ্ধ বিহার ও রাজপ্রাসাদ।',
            'image_url': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1000&q=80',
            'districts': [
                ('Rajshahi', 'রাজশাহী'), ('Bogura', 'বগুড়া'), ('Naogaon', 'নওগাঁ'),
                ('Natore', 'নাটোর'), ('Chapai Nawabganj', 'চাঁপাইনবাবগঞ্জ'), ('Pabna', 'পাবনা'),
                ('Sirajganj', 'সিরাজগঞ্জ'), ('Joypurhat', 'জয়পুরহাট')
            ]
        },
        {
            'name_en': 'Barishal',
            'name_bn': 'বরিশাল বিভাগ',
            'slug': 'barishal',
            'description_en': 'The Venice of Bengal with floating guava markets, serene rivers and Kuakata sunset beach.',
            'description_bn': 'ভাসমান পেয়ারা বাজার, নদীনালা আর কুয়াকাটার সমুদ্রের সূর্যোদয় ও সূর্যাস্তের অপূর্ব মিলনস্থল।',
            'image_url': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
            'districts': [
                ('Barishal', 'বরিশাল'), ('Patuakhali', 'পটুয়াখালী'), ('Bhola', 'ভোলা'),
                ('Pirojpur', 'পিরোজপুর'), ('Jhalokati', 'ঝালকাঠি'), ('Barguna', 'বরগুনা')
            ]
        },
        {
            'name_en': 'Rangpur',
            'name_bn': 'রংপুর বিভাগ',
            'slug': 'rangpur',
            'description_en': 'Northern landscapes, historical Tajhat Palace, Teesta Barrage and rural charms.',
            'description_bn': 'উত্তরবঙ্গের প্রাচীন ঐতিহ্য, তাজহাট জমিদার বাড়ি ও তিস্তা নদীর প্রাকৃতিক রূপ।',
            'image_url': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1000&q=80',
            'districts': [
                ('Rangpur', 'রংপুর'), ('Dinajpur', 'দিনাজপুর'), ('Kurigram', 'কুড়িগ্রাম'),
                ('Gaibandha', 'গাইবান্ধা'), ('Nilphamari', 'নীলফামারী'), ('Panchagarh', 'পঞ্চগড়'),
                ('Thakurgaon', 'ঠাকুরগাঁও'), ('Lalmonirhat', 'লালমনিরহাট')
            ]
        },
        {
            'name_en': 'Mymensingh',
            'name_bn': 'ময়মনসিংহ বিভাগ',
            'slug': 'mymensingh',
            'description_en': 'Lush Garo Hills border, Shusong Durgapur white ceramic lake and folk lore heritage.',
            'description_bn': 'গারো পাহাড়ের পাদদেশ, সুসং দুর্গাপুরের সাদামাটির লেক ও সমৃদ্ধ লোকসংস্কৃতি।',
            'image_url': 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80',
            'districts': [
                ('Mymensingh', 'ময়মনসিংহ'), ('Jamalpur', 'জামালপুর'), ('Netrokona', 'নেত্রকোণা'),
                ('Sherpur', 'শেরপুর')
            ]
        }
    ]

    total_districts_created = 0
    for div_data in divisions_data:
        slug = div_data.get('slug_en', div_data['slug'])
        division, _ = Division.objects.update_or_create(
            name_en=div_data['name_en'],
            defaults={
                'name_bn': div_data['name_bn'],
                'slug': slug,
                'description_en': div_data['description_en'],
                'description_bn': div_data['description_bn'],
                'image_url': div_data['image_url']
            }
        )

        for d_en, d_bn in div_data['districts']:
            d_slug = d_en.lower().replace(' ', '-').replace("'", "")
            District.objects.update_or_create(
                division=division,
                name_en=d_en,
                defaults={
                    'name_bn': d_bn,
                    'slug': f"{slug}-{d_slug}",
                    'description_en': f"Tourist district of {d_en} in {division.name_en} division.",
                    'description_bn': f"{division.name_bn}ের অন্তর্ভুক্ত পর্যটন জেলা {d_bn}।"
                }
            )
            total_districts_created += 1

    print(f"Total Divisions: {Division.objects.count()}, Total Districts: {District.objects.count()} (Target: 8 Divisions, 64 Districts)")

    # 2. Setup Superuser & Moderator Profile
    super_user = User.objects.filter(username='sandwip').first()
    if super_user:
        super_profile, _ = UserProfile.objects.get_or_create(user=super_user)
        super_profile.role = 'superadmin'
        super_profile.phone = '+880 1711-234567'
        super_profile.location = 'Dhaka, Bangladesh'
        super_profile.permissions = [
            'manage_cms', 'manage_inventory', 'moderate_content',
            'manage_finances', 'manage_users', 'view_reports', 'manage_agents'
        ]
        super_profile.save()

    # Moderator User
    mod_user, created = User.objects.get_or_create(
        username='moderator1',
        defaults={
            'email': 'moderator1@sandviora.com',
            'first_name': 'Tanvir',
            'last_name': 'Ahmed',
            'is_staff': True
        }
    )
    if created:
        mod_user.set_password('1234')
        mod_user.save()

    mod_profile, _ = UserProfile.objects.get_or_create(user=mod_user)
    mod_profile.role = 'moderator'
    mod_profile.phone = '+880 1812-987654'
    mod_profile.location = 'Sylhet, Bangladesh'
    mod_profile.permissions = ['submit_content', 'moderate_content', 'view_inventory']
    mod_profile.save()

    # 3. Seed Moderation Requests (Card View in Admin)
    ContentReviewRequest.objects.all().delete()
    ContentReviewRequest.objects.create(
        title='Sreemangal Rainforest Trail & Nilkantha Cabin',
        content_type='destination',
        division_name='Sylhet',
        district_name='Moulvibazar',
        category='tea',
        submitted_by=mod_user,
        status='pending',
        payload={
            'name_en': 'Sreemangal Rainforest Trail & Nilkantha Cabin',
            'name_bn': 'শ্রীমঙ্গল রেইনফরেস্ট ট্রেইল ও নীলকণ্ঠ কেবিন',
            'division_name': 'Sylhet',
            'category': 'tea',
            'tagline_en': 'Tea Capital and Lawachara Gibbon Forest',
            'tagline_bn': 'চা বাগান ও লাউয়াছড়া উল্লুকের বনাঞ্চল',
            'overview_en': 'Dense canopy rainforest walking trails, organic pineapple orchards, and world-famous 7-layer tea tasting.',
            'overview_bn': 'ঘন চিরসবুজ রেইনফরেস্টের পথচলা, পাহাড়ি আনারসের বাগান এবং বিখ্যাত সাত রঙের চা।',
            'hero_image': 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
            'rating': 4.9,
            'price_estimate': 'BDT 6,500'
        }
    )

    ContentReviewRequest.objects.create(
        title='Tanguar Haor Starlight Houseboat Expedition',
        content_type='tour',
        division_name='Sylhet',
        district_name='Sunamganj',
        category='lake',
        submitted_by=mod_user,
        status='review_again',
        admin_comments='Please attach the emergency safety protocol & lifejacket verification checklist before publishing.',
        payload={
            'name_en': 'Tanguar Haor Starlight Houseboat Expedition',
            'name_bn': 'টাঙ্গুয়ার হাওর স্টারলাইট হাউসবোট অভিযান',
            'division_name': 'Sylhet',
            'category': 'lake',
            'tagline_en': 'Ramsar wetland sanctuary with luxury eco-boat',
            'tagline_bn': 'রামসার জলাভূমিতে বিলাসবহুল ইকো বোট ভ্রমণ',
            'overview_en': 'Glide across crystal wetlands against Meghalaya hill silhouettes, fresh local duck roast, and nighttime stargazing.',
            'overview_bn': 'মেঘালয় পাহাড়ের পাদদেশে স্বচ্ছ জলরাশিতে ভাসমান রাত ও তারা দেখার অভিজ্ঞতা।',
            'hero_image': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
            'rating': 4.95,
            'price_estimate': 'BDT 14,000'
        }
    )

    ContentReviewRequest.objects.create(
        title='Kuakata Sunrise & Sunset Beach Sanctuary',
        content_type='destination',
        division_name='Barishal',
        district_name='Patuakhali',
        category='beach',
        submitted_by=mod_user,
        status='approved',
        admin_comments='Verified and published directly to live portal.',
        payload={
            'name_en': 'Kuakata Beach Sanctuary',
            'name_bn': 'কুয়াকাটা সমুদ্র সৈকত',
            'division_name': 'Barishal',
            'category': 'beach',
            'tagline_en': 'Daughter of the Sea',
            'tagline_bn': 'সাগরকন্যা কুয়াকাটা',
            'overview_en': 'Rare panoramic beach where travelers witness both sunrise and sunset from the same shore.',
            'overview_bn': 'একই স্থানে দাঁড়িয়ে সূর্যোদয় ও সূর্যাস্ত অবলোকনের দুর্লভ প্রাকৃতিক সৈকত।',
            'hero_image': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
            'rating': 4.8
        }
    )

    # 4. Financial Governance Transactions
    FinancialTransaction.objects.all().delete()
    FinancialTransaction.objects.create(
        title='Tour Booking SND-7F8920 - Sajek Clouds',
        transaction_type='income',
        amount_bdt=19000.00,
        category='Customer Booking',
        approval_status='approved',
        notes='Online gateway instant settlement via bKash Merchant API.'
    )
    FinancialTransaction.objects.create(
        title='Staff Payroll - Content Moderation Team (Month 10)',
        transaction_type='payroll',
        amount_bdt=145000.00,
        category='Employee Salary & Payroll',
        approval_status='pending',
        notes='Monthly remuneration for 4 regional field content scouts and editors.'
    )
    FinancialTransaction.objects.create(
        title='Eco-Resort Sajek Commission Settlement',
        transaction_type='vendor_payout',
        amount_bdt=28400.00,
        category='Partner Settlement',
        approval_status='pending',
        notes='Payable to Meghpunji & Runmoy cottages for September guest bookings.'
    )
    FinancialTransaction.objects.create(
        title='Sundarbans Vessel Charter & Fuel Expense',
        transaction_type='expense',
        amount_bdt=65000.00,
        category='Operational Expense',
        approval_status='approved',
        notes='Forest department permit fees and luxury cruiser fuel allocation.'
    )

    # 5. Dynamic Agent Partners (Scenario 1, 2, 3)
    DynamicAgentPartner.objects.all().delete()
    DynamicAgentPartner.objects.create(
        company_name='Sayeman Beach Resort Cox’s Bazar',
        partner_type='hotel',
        integration_scenario=1,
        contact_person='Imtiaz Chowdhury',
        phone='+880 1711-998877',
        email='reservations@sayemanresort.com',
        commission_pct=12.50,
        active_listings_count=18,
        status='active'
    )
    DynamicAgentPartner.objects.create(
        company_name='Green Leaf Eco Cottages Sreemangal',
        partner_type='hotel',
        integration_scenario=2,
        contact_person='Babulal Tripura',
        phone='+880 1819-334455',
        email='greenleaf@sreemangaltourism.com',
        commission_pct=10.00,
        active_listings_count=8,
        status='active'
    )
    DynamicAgentPartner.objects.create(
        company_name='Sundarbans Royal Cruise Operators',
        partner_type='transport',
        integration_scenario=3,
        contact_person='Captain Anwar Hossain',
        phone='+880 1912-776655',
        email='royalboat@mongla.com',
        commission_pct=15.00,
        active_listings_count=4,
        status='active'
    )
    DynamicAgentPartner.objects.create(
        company_name='Bandarban Indigenous Trekkers Guild',
        partner_type='guide',
        integration_scenario=3,
        contact_person='Mong Shwe Prue',
        phone='+880 1552-112233',
        email='guides@bandarbanhills.org',
        commission_pct=8.00,
        active_listings_count=12,
        status='active'
    )

    print("Bangladesh Inventory, RBAC, Moderation Requests, Finances and Agent Partners successfully seeded!")

if __name__ == '__main__':
    run()
