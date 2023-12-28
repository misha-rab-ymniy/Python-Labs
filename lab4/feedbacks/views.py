from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import redirect
from django.urls import reverse_lazy, reverse
from django.views.generic import ListView, CreateView, TemplateView

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


class FeedbacksStatisticView(TemplateView):
    template_name = "feedbacks/statistics.html"

    def get(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return redirect(reverse("signin"))

        return super().get(request, args, kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        one = Feedback.objects.filter(rating=1)
        two = Feedback.objects.filter(rating=2)
        three = Feedback.objects.filter(rating=3)
        four = Feedback.objects.filter(rating=4)
        five = Feedback.objects.filter(rating=5)

        get_total_people = len(one) + len(two) + len(three) + len(four) + len(five)

        context["feedbacks"] = dict(
            one=one, two=two, three=three, four=four, five=five
        )
        context["one"] = len(one)
        context["two"] = len(two)
        context["three"] = len(three)
        context["four"] = len(four)
        context["five"] = len(five)
        return context
