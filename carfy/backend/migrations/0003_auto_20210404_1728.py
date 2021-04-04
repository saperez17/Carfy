# Generated by Django 3.1.6 on 2021-04-04 22:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20210403_1817'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shopservice',
            name='target_automobile',
            field=models.CharField(choices=[('S', 'SEDAN'), ('T', 'TRUCK'), ('M', 'MOTORCYCLE'), ('U', 'UNKNOWN')], default='U', max_length=20),
        ),
        migrations.DeleteModel(
            name='Automobile',
        ),
    ]