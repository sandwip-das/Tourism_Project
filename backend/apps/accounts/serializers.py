from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, ContentReviewRequest, FinancialTransaction, DynamicAgentPartner


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    role_display = serializers.CharField(source='get_role_display', read_only=True)

    class Meta:
        model = UserProfile
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'role', 'role_display', 'phone', 'location', 'avatar',
            'permissions', 'must_reset_password', 'created_at'
        ]
        read_only_fields = ['id', 'username', 'email', 'role', 'role_display', 'phone', 'created_at']


class ContentReviewRequestSerializer(serializers.ModelSerializer):
    submitted_by_username = serializers.CharField(source='submitted_by.username', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    content_type_display = serializers.CharField(source='get_content_type_display', read_only=True)

    class Meta:
        model = ContentReviewRequest
        fields = '__all__'
        read_only_fields = ['id', 'submitted_by', 'created_at', 'updated_at']


class FinancialTransactionSerializer(serializers.ModelSerializer):
    approved_by_username = serializers.CharField(source='approved_by.username', read_only=True)
    transaction_type_display = serializers.CharField(source='get_transaction_type_display', read_only=True)

    class Meta:
        model = FinancialTransaction
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'transaction_date']


class DynamicAgentPartnerSerializer(serializers.ModelSerializer):
    partner_type_display = serializers.CharField(source='get_partner_type_display', read_only=True)
    integration_scenario_display = serializers.CharField(source='get_integration_scenario_display', read_only=True)

    class Meta:
        model = DynamicAgentPartner
        fields = '__all__'
        read_only_fields = ['id', 'created_at']
