# TACC/Core-CMS#v3.12.0-beta.3
FROM taccwma/core-cms:aba079b

WORKDIR /code

COPY apps/tup-cms/src/apps /code/apps
COPY apps/tup-cms/src/taccsite_custom /code/taccsite_custom
COPY apps/tup-cms/src/taccsite_cms /code/taccsite_cms

COPY dist/apps/tup-ui/imports.html /code/taccsite_cms/templates/imports.html
COPY dist/apps/tup-ui/assets/ /code/taccsite_cms/static/assets/

COPY dist/apps/tup-cms-react/assets /code/taccsite_cms/static/cms-react/assets
COPY /dist/apps/tup-cms-react/imports.html /code/taccsite_cms/templates/tup-cms-react.html
