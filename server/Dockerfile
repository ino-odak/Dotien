# Use the official Node.js image as the base image
FROM node:20-alpine

# Install pnpm globally
RUN npm install -g pnpm

# Create and set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
