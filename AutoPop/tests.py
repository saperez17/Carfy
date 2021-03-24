from django.test import TestCase, Client

from .models import UserApp, Shop

# Create your tests here.

class UserAppTestCase(TestCase):
    def setUp(self):
        #Create UserApp instances
        u1 = UserApp.objects.create(username='Karen', country='colombia', email='karo@gmail.com', city='popayan')
        u2 = UserApp.objects.create(username='Alejo$', country='colombia', email='ale@gmail.com', city='popayan')
        u3 = UserApp.objects.create(username='Alejo1', country='colombia', email='alegmail.com', city='popayan')
        shop1 = Shop.objects.create(shop_name='CarFast', longitude=100, latitude=90)

    def test_index(self):
        #Note. run the command python manage.py collectstatic if you have never run it before, otherwise 
        #you could receive the "Missing staticfiles manifest entry" error.
        c = Client()
        response = c.get('/')
        self.assertEqual(response.status_code, 200)
    
    def test_landing_page_shops(self):
        c = Client()
        response = c.get('/landing_page')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context['shops'].count(), 1)

    def test_user_name(self):
        """ Test if username is valid"""
        obj = UserApp.objects.get(username='Alejo$')
        self.assertFalse(obj.is_valid_user())
        
    def test_username_email(self):
        obj = UserApp.objects.get(username='Alejo1')
        self.assertFalse(obj.is_valid_user())
        
    def test_username_all(self):
        obj = UserApp.objects.get(username='Karen')
        self.assertTrue(obj.is_valid_user())
