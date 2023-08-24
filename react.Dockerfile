FROM node:20-alpine

WORKDIR /next-app

COPY ../rusgidro-ideas-frontend .

RUN yarn install
#CMD ["yarn", "run", "build"]
RUN yarn run build

EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

CMD ["yarn", "start"]
