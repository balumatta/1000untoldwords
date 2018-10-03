from django.shortcuts import reverse, render, HttpResponseRedirect
from django.views.generic.edit import CreateView, View, UpdateView
from .models import UserDetails
from easy_pdf.views import PDFTemplateView
from django import forms


class UserDetailsCreateView(CreateView):
    model = UserDetails
    template_name = "welcomePage.html"
    fields = ['name', 'phone']
    user_name = None

    def get_success_url(self):
        user_id = self.existing_user_view(self.user_name)[0].id
        return reverse('book:pdf_preview', kwargs={'user_id': user_id})

    def existing_user_view(self, name):
        self.user_name = name
        if UserDetails.objects.filter(name=name).count() > 0:
            return UserDetails.objects.filter(name=name)
        else:
            return None

    def form_valid(self, form):
        user_data = form.save(commit=False)
        altered_name = user_data.name.upper()
        existing_user = self.existing_user_view(altered_name)
        if existing_user is None:
            user_data.views = 1
            user_data.name = altered_name
            user_data.save()
            return super().form_valid(form)
        else:
            existing_user.update(views=existing_user[0].views + 1)
            return HttpResponseRedirect(reverse('book:pdf_preview', kwargs={'user_id': existing_user[0].id}))

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        return context


class PDFPreviewView(View):
    template_name = "pdfPreviewPage.html"

    def get(self, request, user_id):
        user_existing_name = UserDetails.objects.filter(id=user_id)[0].name
        context = {}
        if "SHAMA" in user_existing_name or "SHAMA KASHYAP" in user_existing_name or "SHAMAKASHYAP" in user_existing_name:
            context['user_name'] = 'shama'
        context['user_id'] = user_id
        return render(request, self.template_name, context)


class FeedbackView(UpdateView):
    template_name = "feedback.html"
    model = UserDetails
    fields = ('reviews',)

    def get_success_url(self):
        return reverse('book:welcome_page')

    def get_form(self, form_class=None):
        form = super(FeedbackView, self).get_form(self.get_form_class())
        form.fields['reviews'].widget = forms.Textarea()
        return form

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        context['thanks_message'] = "Thanks for reading. Have a great day :)"
        return context
