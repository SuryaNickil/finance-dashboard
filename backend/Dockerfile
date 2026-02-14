FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json /app/

# Install dependencies
RUN npm install --production

# Copy application code
COPY . /app/

# Expose port
EXPOSE 5000

# Start application
CMD ["npm", "start"]
