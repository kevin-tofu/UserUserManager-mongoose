FROM node:18

# Create app directory
WORKDIR /app
COPY . .
RUN npm install package.json

EXPOSE 3001
CMD [ "node", "./src/index.js" ]
