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

### **Authentication and Authorization**

After a user creates a profile, the user will be required to log in to the API to make requests. When a user logs in they will be assigned with an authorization token (bearer token) which will be needed to make any requests in the API.

---

### **API Endpoints**

To view the API Endpoints for this app please view the [documentation.html](https://myflix-2388-app.herokuapp.com/documentation.html)

**Screenshots of the Endpoints:**

1. POST request for new user.

    ![Adds new user](/img/POST_NewUser.png)

2. PUT request to update user.

    ![Update user information](/img/PUT_UserUpdate.png)

3. POST request to add favorite movie.

    ![Adds favorite movie](/img/POST_AddFavMovie.png)

4. DELETE request revove favorite movie.

    ![Removes favorite movie](/img/DELETE_RemoveFavMovie.png)

5. DELETE request allows user to deregister.

    ![Deregister User](/img/DELETE_Deregister.png)

6. GET request that returns all movies.

    ![Return all movies](/img/GET_AllMovies.png)

7. GET request to return a single movie.

    ![Returns a single movie](/img/GET_SingleMovie.png)

8. GET request data about a specific genre.

    ![Data about single genre](/img/GET_Genre.png)

9. GET request data about a specific Director.

    ![Data about a director](/img/GET_Director.png)


