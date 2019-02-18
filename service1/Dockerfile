# Start with a super light base image of Alpine Linux with Node 8.11.1 installed
FROM node:10.15.1-alpine

# Set working directory of container
WORKDIR /usr/src/app

# Copying source code into the working directory of the container
COPY . .

# Install dependencies (this happens in an intermdiate container)
RUN npm install --only=production

# Expose TCP port
EXPOSE 80

# Command to start container
CMD ["npm", "start"]
