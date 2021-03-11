# 9-REST-API

====================================
### **Installation:**

Do the following once node and npm is installed and 9-Rest-api repo has been cloned:
1. Open the Terminal and cd into directory

2. Run `npm install`

====================================
### **Running locally**

Run `npm start`

====================================
### **Structure**

1. Contains two Sequelize models user and course with proper validation rules.
2. Routes folder which has various users and courses endpoints.
3. A utility file to manage some resuable functions.
4. A middleware folder which uses basic-auth package to validate the authentication of a user.

### **Testing**

1. Find the RESTAPI.postman_collection.json file in the project
2. Open Postman tool
3. Import the json to postman and hit all endpoints.
