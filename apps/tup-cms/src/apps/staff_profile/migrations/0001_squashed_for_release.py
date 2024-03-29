# Generated by Django 3.2.18 on 2023-06-30 17:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import filer.fields.image


class Migration(migrations.Migration):

    replaces = [
      ('staff_profile', '0001_initial'),
      ('staff_profile', '0002_alter_staffprofileplugin_phone'),
      ('staff_profile', '0001_squashed_0002_alter_staffprofileplugin_phone'),
      ('staff_profile', '0002_split_name_into_first_and_last'),
      ('staff_profile', '0003_reduce_first_last_name_length_squashed_0009_do_not_require_photo'),
      ('staff_profile', '0004_reduce_name_field_lengths'),
      ('staff_profile', '0005_remove_experience'),
      ('staff_profile', '0006_reduce_post_nomials_length'),
    ]

    initial = True

    dependencies = [
        ('filer', '__first__'),
        ('cms', '0022_auto_20180620_1551'),
    ]

    operations = [
        migrations.CreateModel(
            name='StaffProfilePlugin',
            fields=[
                ('cmsplugin_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, related_name='staff_profile_staffprofileplugin', serialize=False, to='cms.cmsplugin')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('post_nomials', models.CharField(max_length=50)),
                ('title', models.CharField(max_length=100)),
                ('title2', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100)),
                ('department', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=50, null=True)),
                ('description', models.TextField()),
                ('publications', models.TextField(null=True)),
                ('projects', models.TextField(null=True)),
                ('education', models.TextField(null=True)),
                ('research_areas', models.TextField(null=True)),
                ('memberships', models.TextField(null=True)),
                ('photo', filer.fields.image.FilerImageField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.FILER_IMAGE_MODEL)),
            ],
            options={
                'abstract': False,
            },
            bases=('cms.cmsplugin',),
        ),
    ]
