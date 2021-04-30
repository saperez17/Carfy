# Generated by Django 3.1.6 on 2021-04-29 22:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0015_servicerequest_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servicerequest',
            name='status',
            field=models.CharField(choices=[('PEN', 'PENDING'), ('UN', 'UNPAID'), ('PA', 'PAID'), ('ACC', 'ACCEPTED'), ('CAN', 'CANCELED'), ('REJ', 'REJECTED'), ('COM', 'COMPLETED')], default='PEN', max_length=30),
        ),
    ]
