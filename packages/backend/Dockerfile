FROM node:22-alpine AS development

WORKDIR /home/node

COPY package.json tsconfig.json /home/node/
COPY src /home/node/src

RUN yarn

ENV TZ=Europe/Warsaw

####

FROM development AS production

RUN yarn build
RUN yarn --production
RUN rm -rf src/ tsconfig.json

