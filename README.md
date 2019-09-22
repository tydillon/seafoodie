# SeaFoodie

Seafoodie is a web app designed to make locally sourced seafood in the Charleston area accessible.

## Technologies Used

This app is MERN-based. It utilizes the following technologies:

- [reactJS](https://reactjs.org)
- [mongoDB](https://mongodb.com)
- [Express](https://expressjs.com)
- [nodeJS](https://nodejs.org/en/)
- [passportJS](https://www.npmjs.com/package/passport)

## Installation Instructions

Follow these instructions in order to get a copy of this app on your local machine

1. If you have not already done so, install mongoDB on your local machine.

2. Start the mongodb server

```
mongod
```

3. In another terminal tab or window, clone the github repo

```
git clone https://github.com/tydillon/seafoodie-v2.git
cd seafoodie-v2
```

4. Install dependencies

```
npm install
cd api
npm install
```

5. Start the back-end server

```
npm run start
```

6. In a third terminal tab or window, launch the front-end server

```
cd ..
npm run start
```

7. It is strongly recommended to perform a 'POST' to the api through a service such as Postman in order to begin as an administrator.

- 'POST' to http://localhost:8005/users/ with a body containing:

```
{
   "username": YOURUSERNAME,
   "password": YOURPASSWORD
}
```

8. In order to view map information in this app, you will also need a google API key. This can be obtained [here](https://developers.google.com/maps/documentation/javascript/get-api-key). Once the key is obtained, create a .env file in the seafoodie-v2 folder containing the following:

```
REACT_APP_API_KEY = INSERTYOURKEYHERE
```

9. The app can now be viewed [here](http://localhost:3000/)

## Usage

General users are able to view basic restaurant information. Administrators are able to add restaurants, edit restaurants, and add other administrators. The sign-in link is located at the bottom of the home page.

## Future Considerations

Future versions of the app may include features such as:

- Filtering menu items by type of food or time of day
- Making restaurant data available for bulk import
- Host the app on AWS

## Motivation

- This project was created as a final project for [JRS Coding School](http://www.harborec.com/jrs-coding-school).
- Inspiration for the project came from the [South Carolina Aquarium Good Catch Initiative](https://scaquarium.org/conservation/goodcatch/). This program interviewed many restaurants in the Charleston area in order to determine where their seafood is sourced from. Data for this project stems from this source.
