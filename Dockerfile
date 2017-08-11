FROM node:boron
WORKDIR /usr/src/app
COPY package.json .

RUN npm install
RUN npm install flake-idgen
RUN npm install biguint-format
RUN npm install fs

COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]