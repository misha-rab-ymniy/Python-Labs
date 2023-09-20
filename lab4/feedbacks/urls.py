from django.urls import path

from .views import FeedbackListView, FeedbackCreateView

urlpatterns = [
    path("", FeedbackListView.as_view(), name="feedback-list"),
    path("create", FeedbackCreateView.as_view(), name="feedback-create"),
]
