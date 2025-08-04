# Use Node.js LTS version
FROM node:20

# Set app directory inside the container
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy all files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]
