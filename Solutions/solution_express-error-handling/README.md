# Adding Error Handling to our Backend

Let's add some error handling to our project. :-)

---

## Instructions

---

1. Create error handling middleware in the `middleware` directory. Then import and register it in `index.js`.
    - Remember that this middleware should be the final middleware in the stack.

2. Update your "login" logic in both the **frontend** and the **backend** to handle errors properly.
    - First, update the `loginPost` controller function in `loginController.js`.
    - If no user is found in the db with the same `username` or `password` provided by the user, forward an error object to the error handling middleware.
    - Make sure to give the error an appropriate `message` and `statusCode`. Look up status codes and see if you can find an appropriate one for logging in (clue: this is about whether the user can be authorized or not!)
    - Also update your frontend logic in `Login.js`. Change your `fetch` logic, so if the response received from the server indicates that the request was not successful, you:
        - Throw and catch an error.
        - Display the error message in an `alert`.
        - Reset the `username` and `password` state variables.

3. When you are done, you can see that your logic is looking a bit more complicated than it did before! Simplify it by converting your `fetch` request in `Login.js` to use `async await` syntax.
    - Remember that instead of ".then" and ".catch" handlers (as with "traditional" Promise syntax), you can use `try` and `catch` blocks to handle errors when using `async await` syntax!

## Bonus Questions - for those who finish the above tasks...

4. Go to `registerController.js` in your **backend** repo. Add extra logic to make sure that no-one can register for our app with the same username as another user.
    - If someone does supply an "already taken" username when registering, you should handle the error using the pattern established in Task 2.
    - Remember, you will also need to update your frontend `fetch` logic to handle the server's response. Also convert the logic to use `async await` syntax.


5. Go to `usersController.js` in your **backend** repo. Use the same patterns as Tasks 3 and 4 to:
    - In the `getUserData` controller function, send an error if the user does not exist in the db.
    - In the `postAlbum` controller function, send an error if an album with the same `band`, `albumTitle` and `albumYear` already exists in the user's array of albums.
    - In the `deleteAlbums` controller function, send an error if the user does not exist in the db.

---

# Below you will find a copy of the two previous exercises:

## Updating our Project Part 5 - Updating the remaining functionality

### Stage 1

As we discussed before lunch, the `GET` `/user/:id/albums` route in the server has not been configured according to REST best practice. So let's change it! 

The path GET `/users/:id/albums` would make sense if we wanted to `GET` **only** a user's array of albums from `db.json`. However, we need more data about the user to bring back to the frontend! 

Instead of `/users/:id/albums`, you should change the route to serve the path `/users/:id` in **both** the frontend and backend. This will mean our server finds the **resource** (object) associated with the current user in our database, and sends a `response` containing all relevant data.

To test your changes, you should try to log in as one of your users, and make sure you can see their (1) name and (2) albums in the `<Albums />` component of your React UI.
    >- **Hint:** Make sure the user has at least one album object in their "albums" array in `db.json` before doing this!

---

### Stage 2

Using what you have learned about REST, and the routes you have already created, get all your React app's functionality working again!

This means that after a user logs in, they should be able to:

- Create a new album by submitting in the "Create album" form in `Albums.js`
- Delete **all** their albums by clicking the "delete albums" button in `Album.js`

In both cases, you will need to make sure that you:

1. Send a `fetch` request in your frontend when the user performs one of these actions.
2. Set up a route in your server which can (A) receive the request, (B) update your database in the correct way, and (C) send back a response. 
    - Don't forget to use the already existing "users" router, and to create a controller function for each new route to handle the request!
3. Handle the server's `response` in your frontend by updating `state` in `Albums.js` to display the latest data.

**Remember**: you are trying to update the `albums` property of the **resource** in the database associated with the user who is currently logged in. So perhaps your two new routes could look like:

- `POST /users/:id/albums` to create a new album
- `DELETE /users/:id/albums` to delete all the objects from the user's array of albums

---

### Stage 3 - Only if you finish early!

In your **frontend** repo, try to create a `<Logout />` component that you can import into the `<Albums />` view. This should render a button with the content "Log out".

Clicking the button should "log out" the user when they click it, and render the `<Login />` view in the browser.

- What needs to happen to our `<App />`'s state in order to fully "log out" the user?

**Hint:** You don't need to send a HTTP request to the server to achieve this functionality!

---
---

## Part 4

Let's now let the user see their list of albums after they log in!

---

### Instructions

---

### Stage 1

1. Go to `App.js` in your **frontend** repo. Import the `Albums` component from the `views` directory, and replace the "successful login" `div` with an instance of the `<Albums />` component.
2. A successful registration or login will now render this component, instead of the "successful login" `div`. 
  >- **Remember**: when a user successfully registers or logs in, the `currentUserId` and `isLoggedIn` state variables in `App.js`, will be updated before `<Albums />` is rendered. This will soon be relevant...
3. You should also pass the `App.js` state variable `currentUserId` to `<Albums />` as a prop.

---

### Stage 2

4. Now go to your **backend** repo. You should create a **new** Express router (serving the "/users" endpoint). 
  >- Create one route in the "users" router, serving `GET` requests. This route will be **dynamic** - the next part of the path will be "/:id/albums" (so the endpoint will be "/users/:id/albums").
  >- You should also create a controller function for the new route. This should find the user in `db,json` whose `id` matches the `/:id` **parameter** in the request you made. 
    >- Can you remember how you can find this parameter using the `req` object?
  >- When the controller function finds the user with the correct `id`, it should make an object containing the `firstName` and `albums` properties for that user and send them back in the `response`, in a JSON format.

---

### Stage 3

5. Now go to `Albums.js` in your **frontend** repo. You should create a `useEffect`, which executes only once, when the component first renders. 
  >- The `useEffect` should make a `fetch` request. This should use the `currentUserId` **prop** (received from `App.js` in Stage 1.3) to send a GET request to `/users/${props.currentUserId}/albums`. As you can see, this request will be sent to our new **dynamic** "/users/:id/albums" route (see Stage 2)! 
  >- When the response is received back from the server, you will receive an object with the `firstName` and `albums` of the user who just registered or logged in.
    >- You should update the `firstName` state variable of `Albums.js` with the user's first name. This should make the `div` with id "greeting" work as expected.
    >- You should update the `albums` state variable of `Albums.js` with the user's current list of albums. This will mean that the user can see a JSX list of their albums.
  >- You can test this by giving a registered user some album objects in `db.json` (in the **backend** repo), and then logging in as that user. Can you see their albums after they log in?
    >- **Note:** You have to add album objects yourself in `db.json` because, due to our changes, the user can no longer use the app to add a new album themselves. That's ok - we can update the app tomorrow to let them do this. :-)