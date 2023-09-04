# SkyBnB

To view the live site for SkyBnB, click here: [SkyBnb Live](https://airbnb-5tj9.onrender.com)

SkyBnB is a clone of the popular website Airbnb, a website that provides an intermediary between those who want to rend out space and those who are looking for space to rent, both short-term and long-term stays.
The backend of SkyBnb is built with a PostgreSQL database, while the frontend rendering is done with React.

## Technology Used
Backend:
- Javascript
- Sequelize
- Express
-PostgreSQL

Frontend:
- Javascript
- React
- Redux
- CSS


## Set Up & Installation
1. Clone the repository
2. Run npm install from the root directory
3. Open one terminal, and cd into the frontend folder, then run npm install
4. Open another terminal, and cd into the backend folder, then run npm install
5. Run npx dotenv sequelize-cli db:migrate & npx dotenv sequelize-cli db:seed:all in the backend terminal
6. Run npm start in both terminals to start the servers and see the application

## Features and Implementation
- Spots CRUD Feature (Create, Read, Update, and Delete)
- Reviews Feature with Create Read and Delete
- Demo User with Login and Logout



### Home Page
*Dropdown menu is open to show functionality
![skybnb home page](https://github.com/samanarana/AirBnB/assets/113636092/2bdfae85-b8f1-45d2-b3e0-1532adf00d2e)



### Create a Spot Page
![Create a spot page](https://github.com/samanarana/AirBnB/assets/113636092/9651f5e4-ff2e-4dfe-95e8-f9846c7f7141)



### Manage Spots Page
![Manage Spots Page](https://github.com/samanarana/AirBnB/assets/113636092/429a197c-e3b9-4476-b24e-c5cbf89170d8)



### Signup Modal
![Signup Modal](https://github.com/samanarana/AirBnB/assets/113636092/9d704329-94e1-42b6-aec5-b7c7db24e3d8)



### Spot Details Page
![Spot Details Page](https://github.com/samanarana/AirBnB/assets/113636092/f50fb862-1fc6-404e-a243-24ed51b55b95)



### User Reviews
![Spot Reviews](https://github.com/samanarana/AirBnB/assets/113636092/3410f8ab-8c3e-4d55-8e7c-45b3b608fd2d)

## Future Features
- Bookings CRUD Feature
- Spot Search
- Google Maps Search
- Favorites
- Messaging
- AWS Image Upload
- User profiles


## React Components List

| Folder            | Component Name        | Description                                     |
|-------------------|-----------------------|-------------------------------------------------|
| `CreateSpotForm`  | `index.js`            | Form for creating spots                         |
| `LoginFormModal`  | `index.js`            | Modal for login form                            |
| `LoginFormPage`   | `index.js`            | Full page for login form                        |
| `ManageSpots`     | `DeleteSpotModal.js`  | Modal for deleting a spot                       |
|                   | `UpdateSpot.js`       | Component for updating spots                    |
|                   | `UserSpotTile.js`     | Component for displaying individual user spots  |
|                   | `UserSpotTileList.js` | List of user spots                              |
| `Navigation`      | `ProfileButton.js`    | Profile button in the navigation                |
| `OpenModalButton` | `index.js`            | Button for opening modals                       |
| `SignupFormModal` | `index.js`            | Modal for signup form                           |
| `SignupFormPage`  | `index.js`            | Full page for signup form                       |
| `SpotDetails`     | `DeleteReviewModal.js`| Modal for deleting a review                     |
|                   | `ReviewList.js`       | List of reviews for a spot                      |
|                   | `ReviewModal.js`      | Modal for creating/editing a review             |
| `SpotTileList`    | `SpotTile.js`         | Individual spot tile                            |
|                   | `SpotTileList.js`     | List of spot tiles                              |



## Redux Store

The Redux store is composed of the following slices:

- `csrf`: Handles Cross-Site Request Forgery tokens.
- `session`: Manages user sessions.
- `spot`: Manages spots data.
- `review`: Manages reviews for spots.
