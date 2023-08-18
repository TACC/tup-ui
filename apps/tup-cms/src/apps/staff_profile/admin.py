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

admin.site.register(StaffProfilePlugin, StaffProfilePluginAdmin)
