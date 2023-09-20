from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView

from .models import Feedback


class FeedbackListView(ListView):
    template_name = "feedbacks/feedback-list.html"
    model = Feedback


class FeedbackCreateView(LoginRequiredMixin, CreateView):
    model = Feedback
    template_name = "feedbacks/feedback-create.html"
    fields = ("title", "rating", "content")
    success_url = reverse_lazy("feedback-list")
    login_url = reverse_lazy("users:signin")

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)
