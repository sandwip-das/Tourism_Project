from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .models import UserProfile, ContentReviewRequest, FinancialTransaction, DynamicAgentPartner
from .serializers import (
    UserProfileSerializer, ContentReviewRequestSerializer,
    FinancialTransactionSerializer, DynamicAgentPartnerSerializer
)
from apps.destinations.models import Destination
from apps.tours.models import TourPackage, TourCategory


class AuthLoginView(APIView):
    def post(self, request):
        identifier = request.data.get('username', '').strip()
        secret = request.data.get('password', '').strip()

        if not identifier or not secret:
            return Response({'error': 'Username/Email and Password/OTP are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Lookup user by username or email
        user = User.objects.filter(username=identifier).first() or User.objects.filter(email=identifier).first()
        if not user:
            return Response({'error': 'No account found with this identifier'}, status=status.HTTP_404_NOT_FOUND)

        profile, _ = UserProfile.objects.get_or_create(user=user)

        # 1. Try OTP login first if user has active OTP
        if profile.otp_code and profile.otp_code == secret:
            if profile.must_reset_password:
                return Response({
                    'status': 'must_reset_password',
                    'username': user.username,
                    'message': 'One-Time Password verified. Please set your new password to proceed.'
                }, status=status.HTTP_200_OK)

        # 2. Try standard password authentication
        user_auth = authenticate(username=user.username, password=secret)
        if not user_auth:
            return Response({'error': 'Invalid password or expired OTP'}, status=status.HTTP_401_UNAUTHORIZED)

        # Successful Login
        data = {
            'status': 'success',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'is_superuser': user.is_superuser,
                'role': 'superadmin' if user.is_superuser else profile.role,
                'role_display': 'Super Admin' if user.is_superuser else profile.get_role_display(),
                'phone': profile.phone,
                'location': profile.location,
                'avatar': profile.avatar,
                'permissions': profile.permissions,
            },
            'token': f'snd_token_{user.id}_{user.username}'
        }
        return Response(data, status=status.HTTP_200_OK)


class AuthRegisterView(APIView):
    def post(self, request):
        username = request.data.get('username', '').strip()
        email = request.data.get('email', '').strip()
        password = request.data.get('password', '').strip()
        full_name = request.data.get('full_name', '').strip()
        phone = request.data.get('phone', '').strip()
        location = request.data.get('location', 'Dhaka, Bangladesh').strip()

        if not username or not email or not password:
            return Response({'error': 'Username, Email and Password are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already taken'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)

        parts = full_name.split(' ', 1)
        first_name = parts[0] if parts else username
        last_name = parts[1] if len(parts) > 1 else ''

        user = User.objects.create_user(
            username=username, email=email, password=password,
            first_name=first_name, last_name=last_name
        )

        profile = UserProfile.objects.create(
            user=user,
            role='customer',
            phone=phone,
            location=location,
            permissions=['view_content', 'book_tours', 'leave_reviews']
        )

        return Response({
            'status': 'success',
            'message': 'Account created successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'role': profile.role,
                'role_display': profile.get_role_display(),
                'phone': profile.phone,
                'location': profile.location,
                'avatar': profile.avatar,
                'permissions': profile.permissions,
            },
            'token': f'snd_token_{user.id}_{user.username}'
        }, status=status.HTTP_201_CREATED)


class UserProfileView(APIView):
    def get(self, request):
        username = request.query_params.get('username')
        if not username:
            user = request.user if request.user.is_authenticated else User.objects.filter(is_superuser=True).first()
        else:
            user = User.objects.filter(username=username).first()

        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        profile, _ = UserProfile.objects.get_or_create(user=user)
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_superuser': user.is_superuser,
            'role': 'superadmin' if user.is_superuser else profile.role,
            'role_display': 'Super Admin' if user.is_superuser else profile.get_role_display(),
            'phone': profile.phone, # Email and phone are immutable by customer
            'location': profile.location,
            'avatar': profile.avatar,
            'permissions': profile.permissions,
            'date_joined': user.date_joined.strftime('%d %B %Y'),
        })

    def patch(self, request):
        username = request.data.get('username')
        user = User.objects.filter(username=username).first() if username else (request.user if request.user.is_authenticated else None)

        if not user:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_400_BAD_REQUEST)

        profile, _ = UserProfile.objects.get_or_create(user=user)

        # Allow updating name, location, avatar
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        location = request.data.get('location')
        avatar = request.data.get('avatar')

        if first_name is not None:
            user.first_name = first_name
        if last_name is not None:
            user.last_name = last_name
        user.save()

        if location is not None:
            profile.location = location
        if avatar is not None:
            profile.avatar = avatar
        profile.save()

        # Notice: Email and Phone are strictly ignored / protected from edit!
        return Response({
            'status': 'success',
            'message': 'Profile updated successfully. Email and phone number remain locked for security.',
            'user': {
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'phone': profile.phone,
                'location': profile.location,
                'avatar': profile.avatar,
                'role': 'superadmin' if user.is_superuser else profile.role,
            }
        })


class OTPPasswordResetView(APIView):
    def post(self, request):
        username = request.data.get('username', '').strip()
        old_otp = request.data.get('old_otp', '').strip()
        new_password = request.data.get('new_password', '').strip()
        confirm_password = request.data.get('confirm_password', '').strip()

        if not username or not old_otp or not new_password:
            return Response({'error': 'Username, OTP, and New Password are required'}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({'error': 'New passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(username=username).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        profile = getattr(user, 'profile', None)
        if not profile or profile.otp_code != old_otp:
            return Response({'error': 'Invalid or expired OTP code'}, status=status.HTTP_400_BAD_REQUEST)

        # Update password
        user.set_password(new_password)
        user.save()

        profile.otp_code = ''
        profile.must_reset_password = False
        profile.save()

        return Response({
            'status': 'success',
            'message': 'Password has been reset successfully. You can now login with your new password.',
            'user': {
                'username': user.username,
                'role': 'superadmin' if user.is_superuser else profile.role,
                'role_display': 'Super Admin' if user.is_superuser else profile.get_role_display(),
            }
        }, status=status.HTTP_200_OK)


class AdminUserManagementView(APIView):
    def get(self, request):
        users = User.objects.all().order_by('-date_joined')
        data = []
        for u in users:
            prof, _ = UserProfile.objects.get_or_create(user=u)
            data.append({
                'id': u.id,
                'username': u.username,
                'email': u.email,
                'name': f"{u.first_name} {u.last_name}".strip() or u.username,
                'role': 'superadmin' if u.is_superuser else prof.role,
                'role_display': 'Super Admin' if u.is_superuser else prof.get_role_display(),
                'phone': prof.phone,
                'location': prof.location,
                'avatar': prof.avatar,
                'permissions': prof.permissions,
                'must_reset_password': prof.must_reset_password,
                'has_active_otp': bool(prof.otp_code),
                'active_otp': prof.otp_code,
                'date_joined': u.date_joined.strftime('%Y-%m-%d %H:%M'),
            })
        return Response(data)

    def post(self, request):
        username = request.data.get('username', '').strip()
        email = request.data.get('email', '').strip()
        role = request.data.get('role', 'moderator')
        full_name = request.data.get('name', '').strip()
        phone = request.data.get('phone', '').strip()
        permissions = request.data.get('permissions', [])
        initial_password = request.data.get('initial_password', 'TemporaryPass123!')

        if not username or not email:
            return Response({'error': 'Username and Email are required'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

        parts = full_name.split(' ', 1)
        first_name = parts[0] if parts else username
        last_name = parts[1] if len(parts) > 1 else ''

        user = User.objects.create_user(
            username=username, email=email, password=initial_password,
            first_name=first_name, last_name=last_name
        )

        profile = UserProfile.objects.create(
            user=user,
            role=role,
            phone=phone,
            permissions=permissions
        )

        # Generate OTP for immediate secure activation
        otp = profile.generate_otp()

        return Response({
            'status': 'success',
            'message': f'Staff user {username} created with role {role}.',
            'otp': otp,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': profile.role,
                'otp': otp
            }
        }, status=status.HTTP_201_CREATED)


class AdminGenerateOTPView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        username = request.data.get('username')

        user = User.objects.filter(id=user_id).first() if user_id else User.objects.filter(username=username).first()
        if not user:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        profile, _ = UserProfile.objects.get_or_create(user=user)
        otp = profile.generate_otp()

        return Response({
            'status': 'success',
            'username': user.username,
            'otp': otp,
            'message': f'New One-Time Password generated for {user.username}. User will be required to change password on first login.'
        })


class ContentModerationViewSet(viewsets.ModelViewSet):
    queryset = ContentReviewRequest.objects.all()
    serializer_class = ContentReviewRequestSerializer

    def create(self, request, *args, **kwargs):
        submitted_by = request.user if request.user.is_authenticated else User.objects.first()
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(submitted_by=submitted_by, status='pending')
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ApproveContentReviewView(APIView):
    def post(self, request, pk):
        review_req = ContentReviewRequest.objects.filter(pk=pk).first()
        if not review_req:
            return Response({'error': 'Review request not found'}, status=status.HTTP_404_NOT_FOUND)

        # Admin can provide updated edits directly from the full-view
        edited_payload = request.data.get('payload', review_req.payload)
        admin_comment = request.data.get('admin_comments', 'Approved by administrator')

        review_req.payload = edited_payload
        review_req.status = 'approved'
        review_req.admin_comments = admin_comment
        review_req.admin_reviewer = request.user if request.user.is_authenticated else User.objects.filter(is_superuser=True).first()
        review_req.save()

        # Materialize directly into public database if destination or tour
        if review_req.content_type == 'destination':
            p = review_req.payload
            slug = p.get('slug', review_req.title.lower().replace(' ', '-'))
            Destination.objects.update_or_create(
                slug=slug,
                defaults={
                    'name_en': p.get('name_en', review_req.title),
                    'name_bn': p.get('name_bn', review_req.title),
                    'division_name': p.get('division_name', review_req.division_name),
                    'category': p.get('category', review_req.category),
                    'tagline_en': p.get('tagline_en', 'Curated Travel Haven'),
                    'tagline_bn': p.get('tagline_bn', 'অপূর্ব ভ্রমণ স্পট'),
                    'overview_en': p.get('overview_en', 'A stunning travel destination in Bangladesh.'),
                    'overview_bn': p.get('overview_bn', 'বাংলাদেশের অন্যতম সুন্দর পর্যটন স্থান।'),
                    'hero_image': p.get('hero_image', 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80'),
                    'rating': float(p.get('rating', 4.9)),
                    'is_featured': True
                }
            )

        return Response({
            'status': 'success',
            'message': f'"{review_req.title}" has been approved and published to the live platform!',
            'data': ContentReviewRequestSerializer(review_req).data
        })


class ReviewAgainContentModerationView(APIView):
    def post(self, request, pk):
        review_req = ContentReviewRequest.objects.filter(pk=pk).first()
        if not review_req:
            return Response({'error': 'Review request not found'}, status=status.HTTP_404_NOT_FOUND)

        comments = request.data.get('admin_comments', '').strip()
        if not comments:
            return Response({'error': 'Please provide specific instructions/comments in the feedback box for the submitter'}, status=status.HTTP_400_BAD_REQUEST)

        review_req.status = 'review_again'
        review_req.admin_comments = comments
        review_req.admin_reviewer = request.user if request.user.is_authenticated else User.objects.filter(is_superuser=True).first()
        review_req.save()

        return Response({
            'status': 'success',
            'message': f'Request returned to {review_req.submitted_by.username} for revision with admin instructions.',
            'data': ContentReviewRequestSerializer(review_req).data
        })


class FinancialTransactionViewSet(viewsets.ModelViewSet):
    queryset = FinancialTransaction.objects.all()
    serializer_class = FinancialTransactionSerializer

    def perform_create(self, serializer):
        serializer.save()


class ApproveFinancialTransactionView(APIView):
    def post(self, request, pk):
        tx = FinancialTransaction.objects.filter(pk=pk).first()
        if not tx:
            return Response({'error': 'Transaction not found'}, status=status.HTTP_404_NOT_FOUND)

        decision = request.data.get('decision', 'approved') # approved / rejected
        tx.approval_status = decision
        tx.approved_by = request.user if request.user.is_authenticated else User.objects.filter(is_superuser=True).first()
        tx.save()

        return Response({
            'status': 'success',
            'message': f'Financial record marked as {decision}.',
            'transaction': FinancialTransactionSerializer(tx).data
        })


class DynamicAgentPartnerViewSet(viewsets.ModelViewSet):
    queryset = DynamicAgentPartner.objects.all()
    serializer_class = DynamicAgentPartnerSerializer
