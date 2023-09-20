# Create your views here.
from django.shortcuts import render


def about_us(request):
    return render(request, 'info/about_us.html')


def faq(request):
    return render(request, 'faq/faq.html')


def privacy_policy(request):
    return render(request, 'privacy_policy/privacy_policy.html')


def contacts(request):
    return render(request, 'contacts/contacts.html')
