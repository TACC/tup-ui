# TACC/Core-CMS#678 (core-styles v2.11 to v2.22; migrate css to core-cms|styles)
FROM taccwma/core-cms:0335d90

WORKDIR /code

COPY apps/tup-cms/src/apps /code/apps
COPY apps/tup-cms/src/taccsite_custom /code/taccsite_custom
COPY apps/tup-cms/src/taccsite_cms /code/taccsite_cms

COPY dist/apps/tup-ui/imports.html /code/taccsite_cms/templates/imports.html
COPY dist/apps/tup-ui/assets/ /code/taccsite_cms/static/assets/

COPY dist/apps/tup-cms-react/assets /code/taccsite_cms/static/cms-react/assets
COPY /dist/apps/tup-cms-react/imports.html /code/taccsite_cms/templates/tup-cms-react.html
