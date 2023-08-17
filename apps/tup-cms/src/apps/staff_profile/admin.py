from cms.admin.placeholderadmin import FrontendEditableAdminMixin
from django.contrib import admin
from .models import StaffProfilePlugin
from .forms import StaffProfilePluginForm, fieldsets

class StaffProfilePluginAdmin(FrontendEditableAdminMixin, admin.ModelAdmin):
    form = StaffProfilePluginForm
    fieldsets = fieldsets
    list_display = ('id', 'first_name', 'last_name', 'department', 'email')
    list_filter = ('department', 'title')
    search_fields = ('first_name', 'last_name', 'email')
    frontend_editable_fields = ('first_name', 'last_name', 'post_nomials', 'title', 'title2', 'email', 'department', 'phone', 'description', 'photo', 'publications', 'projects', 'education', 'research_areas', 'memberships')

admin.site.register(StaffProfilePlugin, StaffProfilePluginAdmin)
