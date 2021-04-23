from django import forms
from django.forms import ModelForm
# from .serializers import ServiceDetail, CarType

class NameForm(forms.Form):
    username = forms.CharField(max_length=32,
        required=True,
        widget=forms.TextInput(attrs={'placeholder':'Username'}))
    password = forms.CharField(max_length=32, 
        widget=forms.PasswordInput(attrs={'placeholder':'Password'}))
    
    def clean(self):
        cleaned_data = super(NameForm, self).clean()
        name = cleaned_data.get('name')
        password = cleaned_data.get('password')
        if not name and not password :
            raise forms.ValidationError('You have to write something!')

# class CustomerPublicationForm(forms.Form):
#     service_type = forms.CheckboxSelectMultiple(choices=ServiceDetail.choices)
#     car_type = forms.CheckboxSelectMultiple(choices=CarType.choices)
#     longitude = forms.DecimalField(max_digits=9, decimal_places=6)
#     latitude = forms.DecimalField(max_digits=9, decimal_places=6)
