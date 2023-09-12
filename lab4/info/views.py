# Create your views here.
from django.shortcuts import render, get_object_or_404


def about_us(request):
    return render(request, 'info/about_us.html')
