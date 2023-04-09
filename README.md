# react-project-ottomons
react-project-ottomons created by GitHub Classroom

#### Website Link : https://ottomons.cyclic.app/

# Harkanwal Grewal (N01494838): 
Backend:
1:Created the Basic structure of the project.Created the database and as well as the connection.SetUp all the comfiguration required at backend 
example validateUser middlewares, cors,database and express configurations.
2: Designed order,menu models as well as the api's to fetch menu items as well as order api to submit the user order in the final stage.
3:Also implemented database functionality to add/delete/update menu items.
4:Implemented JWT token authorization at backend to regulate access to our backend server.
5: Also implemented NodeMailer , when a user sign's Up a welcome email is send as well as when the user orders food a email is sending listing all the food items ordered, quantity , price as well as total amount. 
Frontend:
1: Created the basic structure of the app , on which team members can built their components.
2: Created the menu Page , to list all the items. 
3: Created the cart Page, to list all the items selected by the user as well as additional functionality to add/delete selected items.
4: Created order checkout page where user fills her/her address details in order to submit the order.
5: Implemented user context as well as address context to store user operations such as user deleting/adding items . changing toal amount,
saving address details, user info and jwt(for reusability).
6:Implemented routes functionality in the project  , in order to make it a multi page application.
7: Used react hooks to fetch data from backend, update components as per user operations etc. 


# Kashish (N01569020):
User registration- Designed & Implemented User registration API. Added validations if user already exists or email id format is incorrect. Stored user data in the mongoDB.
User Details Page - Created frontend and backend API to capture address information for delivering food. 
Login Page - Designed Login page and added CSS styling along with React. Implemented backend API to fetch user details from db and authenticated users using JWT.

# Sonal Pooja (N01474010):
Developed a backend API for the Reviews and Contact Us pages.
Created a Reviews table in a MongoDB database.
Designed a frontend for the Reviews and Contact Us pages.
Implemented forms on both pages to allow for user input.
Successfully retrieved static data from the backend for both pages.
Fetched the reviews data from the Reviews table using the backend API.
Added a Ratings table on the Reviews page, displaying ratings in the form of stars.
Added CSS styling for both the Reviews and Contact Us pages.

# Priya Joseph (N01468981):
   Payment Page: Once the user adds item to the cart and checks out with address details, the user is redirected to the Payment page. In payment page, the user enters the card details and submits the form and the order is placed. Once the order is successful the user receives a mail. The payment details are saved into the mongoDB.
   About us Page: The about us description is loaded using useContext from AboutContext.js
