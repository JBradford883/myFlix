# **myFlix Movie API**

### **Objective**

To build the server-side component of a “movies” web application. The web
application will provide users with access to information about different
movies, directors, and genres. Users will be able to sign up, update their
personal information, and create a list of their favorite movies.

---

### **Features of this App**

1. Allows new users to register.
2. Allows users to update their info (username, password, email, birthday).
3. Allows users to add movies to a list of their favorites.
4. Allows users to remove movies from their favorites.
5. Allows existing users to deregister.
6. Returns a list of ALL movies in the database to the user.
7. Returns data about a single movie to the user (description, genre, director, image URL, and if the movie was featured.)
8. Returns data about a genre (description) by name/title (e.g., "Action").
9. Returns data about a director (bio, birth year, death year) by name.

---

### **Authentication and Authorization**

After a user creates a profile, the user will be required to log in to the API to make requests. When a user logs in they will be assigned with an authorization token (bearer token) which will be needed to make any requests in the API.

---

### **API Endpoints**

To view the API Endpoints for this app please view this [link](https://myflix-2388-app.herokuapp.com/documentation.html)

Examples of how the Endpoints will render

1. POST new user

    ![Post new user](/img/POST_NewUser.png)

---

### **Dependencies**

- bcrypt
- body
- body-parser
- cors
- dotenv
- express
- express-validator
- jsonwebtoken
- mongoose
- morgan
- parser
- passport
- passport-jwt
- passport-local
- uuid

---


