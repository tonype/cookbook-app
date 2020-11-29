FROM node:12.13.1
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app
EXPOSE 9876
CMD ["npm", "run", "serve"]
