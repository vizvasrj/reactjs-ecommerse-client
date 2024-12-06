# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy the build files from the dist folder to the Nginx html directory
COPY dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]