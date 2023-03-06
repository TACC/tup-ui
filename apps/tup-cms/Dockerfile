FROM taccwma/core-cms:32e4324

WORKDIR /code

COPY apps/tup-cms/src/apps /code/apps
COPY apps/tup-cms/src/taccsite_custom /code/taccsite_custom
COPY apps/tup-cms/src/taccsite_cms /code/taccsite_cms

COPY dist/apps/tup-ui/imports.html /code/taccsite_cms/templates/imports.html
COPY dist/apps/tup-ui/assets/ /code/taccsite_cms/static/assets/

COPY dist/apps/tup-cms-react/assets /code/taccsite_cms/static/cms-react/assets
COPY /dist/apps/tup-cms-react/imports.html /code/taccsite_cms/templates/assets_custom_delayed.html
