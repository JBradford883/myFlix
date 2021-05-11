# **myFlix Movie API**

### **Objective:**

To build the server-side component of a “movies” web application. The web
application will provide users with access to information about different
movies, directors, and genres. Users will be able to sign up, update their
personal information, and create a list of their favorite movies.

---

### **Key Features:**

1. Returns a list of ALL movies in the database to the user.
2. Returns data about a single movie to the user (description, genre, director, image URL, and if the movie was featured.)
3. Returns data about a genre (description) by name/title (e.g., "Action").
4. Returns data about a director (bio, birth year, death year) by name.
5. Allows new users to register.
6. Allows users to update their info (username, password, email, birthday).
7. Allows users to add movies to a list of their favorites.
8. Allows users to remove movies from their favorites.
9. Allows existing users to deregister.

---

### **Built With:**

- JavaScript
- Node.js
- Express
- MongoDB
- Visual Studio Code

---

### **Dependencies:**

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
- eslint

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

4. DELETE request to remove favorite movie.

    ![Removes favorite movie](/img/DELETE_RemoveFavMovie.png)

5. DELETE request allows user to deregister.

    ![Deregister User](/img/DELETE_Deregister.png)

6. GET request that returns all movies.

    ![Return all movies](/img/GET_AllMovies.png)

7. GET request to return a single movie.

    ![Returns a single movie](/img/GET_SingleMovie.png)

8. GET request that returns data about a specific genre.

    ![Data about single genre](/img/GET_Genre.png)

9. GET request that returns data about a specific Director.

    ![Data about a director](/img/GET_Director.png)

---

### **To clone or view this repository**

Visit this link [myFlix App](https://myflix-2388-app.herokuapp.com/documentation.html)

---

**Description** | **URL** | **HTTP METHOD** | **Request** | **Response**
--- | --- | --- | --- | ---
Get list of all movies to the users | /movies | GET | none | A JSON object holding data about all the movies. <a href="img/GET_AllMovies.png" target="_blank">View example 
Get data about a single movie by title (description, genre, director, image URL, whether it’s featured or not) | /movies/[title] | GET | none | A JSON object holding data about a single movie containing the title, description, genre, director, image, and if it is featured. <a href="img/GET_SingleMovie.png" target="_blank">View example
Get data about a genre (description) by name/title (e.g., "Thriller"). | /movies/genre/[name] | GET | none | A JSON object holding data about a movie genre containing the name and description. <a href="img/GET_Genre.png" target="_blank">View example
Get data about a director (bio, birth year, death year) by name. | /movies/director/[name] | GET | /movies/director/:name | A JSON object holding data about a movie director containing the name and bio. <a href="img/GET_Genre.png" target="_blank">View example
Allow new users to register | /users | POST | A JSON object holding data about the user who registered. | A JSON object holding data from the information the user added. <a href="img/GET_Genre.png" target="_blank">View example
Allow users to update their user info (username). | /users/[Username] | PUT | A JSON object holding data the user has updated. | A JSON object holding data from the information the user added. <a href="img/GET_Genre.png" target="_blank">View example
Allow users to add a movie to their list of favorites. | /users/[Username]/Movies/[MovieID] | POST | none | A JSON object holding data about the movies added to the users favorites list. <a href="img/GET_Genre.png" target="_blank">View example
Allow users to remove a movie from their list of favorites. | /users/[Username]/Movies/[MovieID] | DELETE | none | A JSON object holding data about the movie removed from the users favorites list. <a href="img/DELETE_RemoveFavMovie.png" target="_blank">View example
Allow existing users to deregister | /users/[Username] | DELETE | none | Returns the response "Username" account was removed. <a href="img/DELETE_Deregister.png" target="_blank">View example


