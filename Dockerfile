FROM node:12.18-alpine as build-frontend-core
ARG BUILD_ENV
WORKDIR /frontend-core
COPY package.json yarn.lock /frontend-core/
RUN yarn install
COPY . /frontend-core
RUN yarn build:${BUILD_ENV}

FROM nginx:1.17-alpine
COPY --from=build-frontend-core /frontend-core/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
