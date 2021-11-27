# Coderator
Situations have changed substantially as a result of the pandemic. People working together used to be able to solve their problems and work on projects in person, which was far more convenient than the current situation; now, if developers want to collaborate, they only have a few options, such as attending a meeting and sharing their screens or using pull-push mechanisms, which takes a long time and misses the most important aspects, such as working on code in real-time. If people had access to all of this content on a single platform, the problem would be easily remedied. Coderator overcomes this problem by combining all of these features into a single platform.

# What can it do ? 
Coderator is an online code editor that may be used not only by students to work with other coders, but also by experts for other tasks like conducting interviews. The platform's fundamental service is real-time code sharing with other users over the application in a secure and permitted manner for increased productivity, allowing users to avoid using separate platforms for different purposes.

# How does it work ?
The application opens up at the home page, which describes a bit about the project. It is provided with four options: 
- *Login Option:* Only registered users can have access to the editors' page by logging in to the website. 
- *Register Option:* This option allows new users to register on the website.
- *Editor Option:* Users who are already logged in to the website can have direct access to the editor. (Direct access is only limited to 5 hours, after that the user will be automatically logged out.)
- *Logout Option:* a logged-in user can choose to log out manually. 

### Features: 
Users must first register on the site in order to use this application. Their credentials will be securely stored in a database using **bcrypt**. The Editor can then only be accessed by the *authorised user*. The application has a **JWT Web Tokens-based authentication system** that grants the user *5 hours of access to the editor*. If a person does not logout manually after 5 hours, he or she will be automatically logged out. The user will have to log in again after that. Users can also log in from different devices and log out based on demand or personal preference.
<br> <br>
The editor's main feature is that it allows several users to *share code in real time* (real-time code sharing can be achieved by socket.io). The platform also includes a function called "File Explorer," which allows the user to either create a new file using one of the application's various programming languages or upload a file from their own computer. By selecting File Explorer, users can go to any file (made or uploaded). Other features of the editor include *altering text size* and selecting *different editor themes*. ( The editor makes use of codemirror, a javascript package that lets you create a text/code editor. It has a number of built-in features that the developer can utilise to incorporate into the editor, such as themes, languages, and so on.
<br> <br>
The editor also has a "mirror" option, which may be found on the editor's page navigation bar. It allows users (who are linked by the same URL) to see *real-time file navigation* as well as the code. (Socket.io properties are also used to implement it.)
<br> <br>
Another feature the codemirror offers is an "Open board" [Work in Progress], which is integrated on the right hand side of the editor. This feature is implemented by keeping in mind the needs of the students to explain any topic. As the application aims to provide solutions on one platform, users might not need to switch between different platforms. The feature can be built with **socket.io** for real-time sharing and **express.js** for client-server communication.
<br>

# Future Scope:
As stated in the present work, the programme seeks to provide solutions to all of a student's difficulties on a single platform. As a result, the project can be expanded by incorporating video and audio conferencing capabilities, as well as the option of a chat window

# Tech stack used: (with version) : 
- Html
- CSS
- bcryptjs : v2.4.3
- cookie-parser : v1.4.6
- dotenv : v10.0.0
- express : v4.17.1
- hbs : v4.2.0
- jsonwebtoken : v8.5.1
- mongoose : v6.0.13
- socket.io : v3.1.2
- socket.io-client : v4.4.0

# Getting started:

### Requirements :
Follow the youtube links provided along with the criteria for a step-by-step installation.
<br>
- VsCode : [click here](https://www.youtube.com/watch?v=MlIzFUI1QGA)
- NodeJs [click here](https://www.youtube.com/watch?v=__7eOCxJyow)
- Mongodb : [click here](https://www.youtube.com/watch?v=3wqzr-GJoS0)

### Deployment :
For development and testing reasons, follow these instructions to get a copy of the project up and running on your local system. After you've installed all of the above, run the following commands:
- Clone the project
`git clone https://github.com/pranjal021/coderator.git`
- Open the project in VScode
- Open the terminal (make sure to check your directory, terminal should open inside ‘coderator’ folder). If not present, write `cd coderator` in terminal. 
- Write following commands in terminal:
```
npm init
npm install
npm run start
```
To run in local machine, open the chrome and type ***“http://localhost:5500/”***
##### (MUST DO STEPS)
- Open mongodb compass. 
- Click on local session 
- Click on the “CONNECT” button present on the right hand side.
All the user credentials would be present under **“userRegistration” -> Registers**

# Repo for code - editor
[click here](https://github.com/pranjal021/code-editor-coderator-)
