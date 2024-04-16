# Build stage
FROM node:20-alpine as build
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy source files
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM node:20-alpine as production
WORKDIR /app

# Install 'serve' to run the application
RUN yarn global add serve

# Copy build artifacts from the 'build' stage
COPY --from=build /app/dist ./dist

# Expose the port serve runs on
EXPOSE 3333

# Command to serve the application
CMD ["serve", "-s", "dist", "-l", "tcp://0.0.0.0:3333"]