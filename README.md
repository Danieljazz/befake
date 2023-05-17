# BeFake - Social media application

Social media application which supports:

- comments,
- posts,
- likes,
- relathionships
- chat,
- notification.
  Applications has dark and light mode implemented using SASS and RWD.

## Techstack

- MySQL - database to keep all of the applicatoin data, additionaly using triggers notifications have been implemented,
- Express - backend server in api folder,
- SocketIo - used on Chat page to give the logged user information (green dot) which of the friends are currently available,
- React - used to build UI, useContext hook was used to keep logged user data among components, after user has logged in its data is save in local storage.

## Instructions

### Live project is available here: https://befake.danielsprojects.com.pl/

### Local run

1. Create MySQL database with tables:

- comments,
- posts,
- likes,
- relathionships
- chat,
- notification.

2. Provide connection details in _api_ in connect.ts.
3. Change folder to _api_. Build api using command `npm run build`.
4. Start server using command `npm run start`. Backend server is running.
5. Change folder to _client_. Build UI using command `npm run dev`.
