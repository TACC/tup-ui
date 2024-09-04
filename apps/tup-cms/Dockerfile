FROM node:20 as node_build
COPY package.json package-lock.json /code/
WORKDIR /code
RUN npm ci

COPY . /code/
RUN npx nx build tup-ui
RUN npx nx build tup-cms-react

FROM taccwma/core-cms:ec7b758b

WORKDIR /code

COPY apps/tup-cms/src/apps /code/apps
COPY apps/tup-cms/src/taccsite_custom /code/taccsite_custom
COPY apps/tup-cms/src/taccsite_cms /code/taccsite_cms

COPY --from=node_build /code/dist/apps/tup-ui/imports.html /code/taccsite_cms/templates/imports.html
COPY --from=node_build /code/dist/apps/tup-ui/assets/ /code/taccsite_cms/static/assets/

COPY --from=node_build /code/dist/apps/tup-cms-react/assets /code/taccsite_cms/static/cms-react/assets
COPY --from=node_build /code/dist/apps/tup-cms-react/imports.html /code/taccsite_cms/templates/tup-cms-react.html

RUN python manage.py collectstatic --no-input --clear --ignore assets/*/font*.css
