from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('services/', views.services, name='services'),
    path('cases/', views.cases, name='cases'),
    path('articles/', views.article_list, name='articles'),
    path('about/', views.about, name='about'),
    path('faq/', views.faq, name='faq'),
    path('contacts/', views.contacts, name='contacts'),
]
