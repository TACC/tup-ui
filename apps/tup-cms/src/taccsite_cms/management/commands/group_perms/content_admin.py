from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.core.management import BaseCommand

def set_group_perms():
    group, was_created = Group.objects.get_or_create(
        name='Content Admin'
    )

    model_name = 'page'.lower().replace(' ', '')
    content_type = ContentType.objects.get(app_label='cms', model=model_name)
    group.permissions.add( Permission.objects.get(name='Can change page', content_type=content_type) )

    model_name = 'page'.lower().replace(' ', '')
    content_type = ContentType.objects.get(app_label='cms', model=model_name)
    group.permissions.add( Permission.objects.get(name='Can publish page', content_type=content_type) )

    model_name = 'page'.lower().replace(' ', '')
    content_type = ContentType.objects.get(app_label='cms', model=model_name)
    group.permissions.add( Permission.objects.get(name='Can view page', content_type=content_type) )

    model_name = 'placeholder'.lower().replace(' ', '')
    content_type = ContentType.objects.get(app_label='cms', model=model_name)
    group.permissions.add( Permission.objects.get(name='Can use Structure mode', content_type=content_type) )

    model_name = 'link'.lower().replace(' ', '')
    content_type = ContentType.objects.get(app_label='djangocms_link', model=model_name)
    group.permissions.add( Permission.objects.get(name='Can add link', content_type=content_type) )

    model_name = 'link'.lower().replace(' ', '')
    content_type = ContentType.objects.get(app_label='djangocms_link', model=model_name)
    group.permissions.add( Permission.objects.get(name='Can change link', content_type=content_type) )

    model_name = 'link'.lower().replace(' ', '')
    content_type = ContentType.objects.get(app_label='djangocms_link', model=model_name)
    group.permissions.add( Permission.objects.get(name='Can delete link', content_type=content_type) )

    model_name = 'link'.lower().replace(' ', '')
    content_type = ContentType.objects.get(app_label='djangocms_link', model=model_name)
    group.permissions.add( Permission.objects.get(name='Can view link', content_type=content_type) )

    model_name = 'text'.lower().replace(' ', '')
    content_type = ContentType.objects.get(app_label='djangocms_text_ckeditor', model=model_name)
    group.permissions.add( Permission.objects.get(name='Can change text', content_type=content_type) )

    model_name = 'text'.lower().replace(' ', '')
    content_type = ContentType.objects.get(app_label='djangocms_text_ckeditor', model=model_name)
    group.permissions.add( Permission.objects.get(name='Can view text', content_type=content_type) )

    model_name = 'Folder'.lower().replace(' ', '')
    content_type = ContentType.objects.get(app_label='filer', model=model_name)
    group.permissions.add( Permission.objects.get(name='Can add Folder', content_type=content_type) )

    model_name = 'Folder'.lower().replace(' ', '')
    content_type = ContentType.objects.get(app_label='filer', model=model_name)
    group.permissions.add( Permission.objects.get(name='Can use directory listing', content_type=content_type) )

    model_name = 'Folder'.lower().replace(' ', '')
    content_type = ContentType.objects.get(app_label='filer', model=model_name)
    group.permissions.add( Permission.objects.get(name='Can view Folder', content_type=content_type) )

    model_name = 'file'.lower().replace(' ', '')
    content_type = ContentType.objects.get(app_label='filer', model=model_name)
    group.permissions.add( Permission.objects.get(name='Can add file', content_type=content_type) )

    model_name = 'file'.lower().replace(' ', '')
    content_type = ContentType.objects.get(app_label='filer', model=model_name)
    group.permissions.add( Permission.objects.get(name='Can view file', content_type=content_type) )
