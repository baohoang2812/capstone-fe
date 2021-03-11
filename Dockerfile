FROM node:12.18-alpine as build-app
# ARG BUILD_ENV
WORKDIR /app
COPY package.json yarn.lock ./
RUN apk add git
RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"
COPY . ./ 
# RUN yarn run build:${BUILD_ENV}
RUN yarn run build:testing

FROM nginx:1.17-alpine
RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY --from=build-app /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.template
# EXPOSE 80
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
