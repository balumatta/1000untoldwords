from django.contrib import admin
from django.urls import path
from .views import *

app_name = 'book'

urlpatterns = [
    path('', UserDetailsCreateView.as_view(), name='welcome_page'),
    path('<int:user_id>/pdf/preview', PDFPreviewView.as_view(), name='pdf_preview'),
    path('<int:pk>/user/feedback', FeedbackView.as_view(), name='feedback'),

]
