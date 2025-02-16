FROM node:22-alpine AS development

WORKDIR /home/node

COPY package.json .gitignore tsconfig.json tailwind.config.js ./
COPY src/ ./src
COPY public/ ./public
RUN yarn

#############

FROM development AS builder
WORKDIR /home/node

ARG REACT_APP_AUTH0_CLIENT_ID
ARG REACT_APP_AUTH0_DOMAIN

ENV REACT_APP_AUTH0_CLIENT_ID=${REACT_APP_AUTH0_CLIENT_ID}
ENV REACT_APP_AUTH0_DOMAIN=${REACT_APP_AUTH0_DOMAIN}

RUN yarn build

#############

FROM nginx:stable-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/node/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
