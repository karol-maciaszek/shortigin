# https://www.poorna.dev/post/error-converting-sdl-to-metadata/ /s/alpine/slim/g
FROM node:22

WORKDIR /home/node/hasura

COPY packages/hasura /home/node/hasura
COPY packages/backend /home/node/backend
COPY packages/frontend /home/node/frontend
COPY packages/redirector /home/node/redirector

RUN yarn global add wait-on
RUN yarn
