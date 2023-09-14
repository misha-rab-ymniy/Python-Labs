from django.urls import path

from news.views import ArticleDetailView, ArticlesListView

urlpatterns = [
    path("<int:pk>/", ArticleDetailView.as_view(), name="news_details"),
    path("", ArticlesListView.as_view(), name="news_page"),
]
