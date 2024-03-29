FROM node:17

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# set env variables
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL $REACT_APP_BACKEND_URL
ARG REACT_APP_EMAILJS_SERVICE_ID
ENV REACT_APP_EMAILJS_SERVICE_ID $REACT_APP_EMAILJS_SERVICE_ID
ARG REACT_APP_EMAILJS_TEMPLATE_ID
ENV REACT_APP_EMAILJS_TEMPLATE_ID $REACT_APP_EMAILJS_TEMPLATE_ID
ARG REACT_APP_EMAILJS_USER_ID
ENV REACT_APP_EMAILJS_USER_ID $REACT_APP_EMAILJS_USER_ID

# npm start is the command to start the application in development mode
CMD ["npm", "start"]