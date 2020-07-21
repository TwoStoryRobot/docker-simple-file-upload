FROM node:14-alpine
RUN mkdir -p /code
WORKDIR /code
ADD . /code
RUN npm install --production
ENV NODE_ENV production
CMD [ "npm", "start" ]
EXPOSE 3000
