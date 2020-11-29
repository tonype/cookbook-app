FROM node:12.13.1 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build:prod

FROM nginx:alpine
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /app/dist/cookbook /usr/share/nginx/html
