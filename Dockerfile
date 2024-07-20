# Build stage
FROM node:20-alpine
WORKDIR /app

RUN apk add g++ make py3-pip

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy source files
COPY . .

# Install 'serve' to run the application
RUN yarn global add serve

# Expose the port serve runs on
EXPOSE 3333

# Command to build and serve the application
CMD ["sh", "-c", "yarn build && serve -s dist -l tcp://0.0.0.0:3333"]