FROM node::20 as build

WORKDIR /app

COPY . .

RUN yarn && yarn run build

FROM nginx:alpine as production

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "deamon off;"]