# basis-task
A simple user signIn and signup application using NodeJS and ExpressJS

# Steps <br>
<hr>
1. Clone or download the repo.<br>
2. Execute `npm install` to install all the dependencies.<br>
3. start your mongoclient <br>
4. Run `node app.js` to start the server.<br>
5. go to 'http://localhost/api/user/`route defined below`<br>


# About the REST API<br>
<hr>

# routes
'/' - details about the api<br>

'/signup' <br>
POST method: To reigister new User<br>
body:username,firstname,lastname,email,password<br>
Ex:<br>
{<br>
	"username": "strongestAvenger",<br>
	"firstname":"Tony",<br>
	"lastname":"Stark",<br>
	"email":"tony_stark@avengers.com",<br>
	"password":"IamStrong9"<br>
}<br>
<br>
'/login' <br>
POST method: To login<br>
body:username,password<br>
Ex:<br>
{<br>
	"username": "strongestAvenger",<br>
	"password":"IamStrong9"<br>
}<br>
<br>

'/getuser?user_id=`enter user_id`' <br>
Add token generated in the login to Header as Authorization<br>
GET method: To get the information about the user<br>
<br>

'/update/:id'<br>
Add token generated in the login to Header as Authorization<br>
PUT method: To update the user info with given id<br>
<br>





