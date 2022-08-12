------------------------

DISCLAIMER 

This is the FRONTEND repository, the BACKEND can be found here : https://github.com/meal-next-door/meal-next-door-server

------------------------
DESCRIPTION

In the context of our bootcamp at Ironhack we were asked to build an app where users could login and logout and add, create, update and delete content for at least two models.

With these instructions in mind, we decided to create an app to would allow anyone that doesn't know what to eat and doesn't want to cook to look for chefs (amateur or professionals) nearby and see what they have to offer. This app is an alternative to restaurant and food delivry services/app.

By connecting customers and cooks it allows customers to connect with cooks and enjoy their delicious meal. 

For cooks: if you are an amateur cook and have leftovers, this can be a way to find people with the same tastes and avoid wasting. For professional chefs you can use this app as your own "restaurant" and connect with customers near you.

For customers: this is an innovative way of finding what delicious meals are being prepared next to you.

Waste is a global problem and our app is a humble try at tackling this problem.

We hope that you enjoy it as much as we do ! 

------------------------
INSTRUCTIONS

In order to run this app on your local machine you will need to :
- create a .env file with the following varaiables :
    - PORT : the local port you want to host your app on
    - you will also need to define a "REACT_APP_API_UR" variable with the port of your backend.

- Cloudinary:
Our app is using the services of Cloudinary to manage picture uploads. In order to use, no backend configurations required but you will need to do the following in order to be able to use it:
    - set up a Cloudinary account on : https://cloudinary.com/
    - get your CLOUDINARY_NAME
    - get your CLOUDINARY_KEY
    - and your CLOUDINARY_SECRET
    - You will then need to create an "upload preset" (you can find this in the settings tab of Cloudinary) and create an unsigned preset (if you don't mind it being unsigned, otherwise you can secure it by signing it). In this step don't forget to give a name to your folder so that your pictures get uploaded to this particular file and not the general folder of your account ;).

Before running your app you will also need to add dependencies. You can simply run the command 'npm install' in your terminal.

Then run the application with magic words : 'npm start'.

Enjoy !

------------------------
If you want to try the live version, is here the link to the demo : https://meal-next-door.netlify.app/