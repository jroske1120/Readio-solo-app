# Joel Roske Solo Project - Readio 

_Duration: 2 Week Sprint_

This is Joel Roske's full stack classroom reading application incorporating Redux/Sagas, PostgreSQL, Material UI, and Google Books' API. A full list of dependencies can be found in `package.json`.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Screen Shots

### User View
![Joel Roske Readio Solo App](UserView.gif)

### Additional Teacher (Admin) features
![Joel Roske Readio Solo App](TeacherView.gif)

## Installation

1. Create a database named `readio_solo`.
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries. 
3. Open up your editor of choice and run an `npm install`
- Make sure you also have other dependencies installed (found in json file)
4. Run `npm run server` in your first terminal
5. Run `npm run client` in your second terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage - Student (Client)

1. After registering as a student, user logs in and can search for books and add them to their profile. 
2. On their profile, users can see book details, read the book (Google Books API copyright permitting), or remove the book from their profile.
3. On the book's details popup, a user can also see any feedback on a previously submitted quiz below the book's description. 
4. After they click to Finish the book, the user is then permitted to take the quiz (click Details, then Quiz buttons).
5. The user is brought to the quiz page for that particular book, where they can submit their responses to the questions.

## Usage - Teacher (Admin)

1. After registering as a teacher, the user logs in and has the same functionality for searching for books and storing them on their profile.
2. Teachers have an additional button on their profile to see their class roster.
3. The roster page has buttons to add a new student or remove an existing one.
4. Teachers also have buttons to grade student quizzes, which will only be available to click if there are submitted quizzes that have not yet been scored by the teacher.
5. When the teacher clicks to grade, a new table of that student's quizzes pops up below, and teachers can provide feedback and a score for that quiz.
6. The scores will update to show a student's average quiz score. 

## Built With

The full stack! React, Redux/Sagas, Javascript, Node and Express, PostgreSQL, Material UI, and Google Books' API.

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality, as well as the members of my cohort, Paxos.

## Support
If you have suggestions or issues, please email me at [joel.j.roske@gmail.com](www.google.com)
