#use the official node image to run the nodejs Nevironment
FROM node:21.7.3-alpine3.20

#Setting the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# install the typeScript globally
RUN npm install -g typescript

#Generate Prisma Client
RUN npx prisma generate

# Build the typescript code 
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD ["node", "dist/app.js"]