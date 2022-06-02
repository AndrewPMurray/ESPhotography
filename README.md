# ESPhotography
A photography portfolio made for a professional photographer, Elmar Schmittou


![gallery_page](https://user-images.githubusercontent.com/92741849/166256530-44887d60-a935-405a-ad88-4c4f962a8794.JPG)



[esphotography](https://elmarschmittou.com/), a fullstack photography portfolio, is a showcase of photos taken by professional photographer Elmar Schmittou. The website allows the photographer to log in to add & edit galleries and photos. The photographer can reorganize how photos are displayed by dragging and dropping while logged in.

## Technologies Used

 - **Backend:** JavaScript, Express, aws-sdk
 - **Frontend:** JavaScript, React/Redux, React-Drag-And-Drop(for image upload functionality), react-beautiful-dnd (for drag and drop functionality)
 - **Database:** PostgresSQL
 - **Image hosting:** AWS/S3

## Features

 - Homepage
 ![user_home](https://user-images.githubusercontent.com/92741849/166257215-173995cc-0bac-41a9-9a03-6b0a9ac2b822.JPG)
 -----------------------------
 - Gallery List Page
![gallery_list](https://user-images.githubusercontent.com/92741849/166257370-9be825f5-7f15-4721-96bb-aaf833627509.png)


## Install Instructions

 1. Clone this repo
	 - `git clone git@github.com:AndrewPMurray/GameMasterStudio.git`
 2. Install dependencies for backend 
	 - `npm install`
 3. Install dependencies for frontend
	 - `cd frontend`
	 - `npm install`
 4. Create PostgreSQL user
	 - `CREATE USER esphotography_app WITH CREATEDB PASSWORD '<password>'`
 5. Create PostgreSQL database
	 - `CREATE DATABASE esphotography_db WITH OWNER esphotography_app
6. Create a `.env` file in the backend directory based on the `.env.example` file
7. In `.env` file:
	- Replace 'password' in DATABASE_URL with your chosen password
	- Enter a secure combination of characters for your SECRET_KEY
	- Create your own [S3](https://s3.console.aws.amazon.com/s3/home?region=us-east-1) image bucket and [AWS user](https://console.aws.amazon.com/iam/home?#/users) and connect them, and enter in the information for AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY. You'll also need to change the NAME_OF_BUCKET variable in backend/awsS3.js to match your bucket name.
	- Choose a username and secure password for the user name & password seeder (to see login functionality in action)
8. Sequelize Migrate and Seed your database in backend directory
	- `npx dotenv sequelize db:migrate`
	- `npx dotenv sequelize db:seed:all`
9. Start backend server in root directory
	- `npm start`
10. Start frontend server in `frontend` directory
	- `npm start`
11. In your browser go to `localhost:3000`
12. You may login by typing in `localhost:3000/login` (Use the username and password you provided as your "seeder username" and "seeder password" in step 7)


---------------------
