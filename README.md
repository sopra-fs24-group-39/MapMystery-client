# Map Mystery

---
## Introduction
Map Mystery is a multi- and singleplayer browser game where you can 
improve your geography skills by either guessing your location on a map 
via an interactive streetview image or by assigning flags to their 
corresponding countries.

This project was created in scope of the software engineering Lab course
at the University of Zürich.

Our goal was to create an interactive game that includes the use of 
external API's as well as a backend API that connects frontend with the 
database.
## Technologies

For the Frontend we used:
- Tailwind CSS
- Axios for API handling
- [Minidenticons](https://github.com/laurentpayot/minidenticons)
- sockjs-client and ws for websockets

## High-Level components

[***Start***](https://github.com/sopra-fs24-group-39/MapMystery-client/blob/main/src/components/views/Start.tsx)

The main Start screen that a not logged in user can see.
By clicking on play the user is asked to login or create an account to play the game.

[***Game***](https://github.com/sopra-fs24-group-39/MapMystery-client/blob/main/src/components/views/Game.tsx)

The game component where the user can select the game mode he 
wants to play and if he wants to play it privately, together with his 
friends or in a public lobby with other users.

[***GlobeGuesserLobby***](https://github.com/sopra-fs24-group-39/MapMystery-client/blob/main/src/components/views/GlobeGuesserLobby.tsx)

A lobby for the Globe Guesser game. After three users have joined the 
game starts automatically. They are redirected to the [GeoGuesser](https://github.com/sopra-fs24-group-39/MapMystery-client/blob/main/src/components/views/GlobeGuesser.tsx) component
where they can submit their guesses. After that they will be 
redirected to the [GlobeGuesserDistanceScreen](https://github.com/sopra-fs24-group-39/MapMystery-client/blob/main/src/components/views/GlobeGuesserDistanceScreen.tsx) where they can see 
how far away their guess was.

[***FlagFinderConfiguraion***](https://github.com/sopra-fs24-group-39/MapMystery-client/blob/main/src/components/views/FlagFinderConfiguraion.tsx)

A lobby for the Flag Finder game. The user can select how many rounds 
he wants to play and how much time he should have to guess the 
country. After submitting the criteria the lobby starts and the user is 
redirected to the [Flagfinder](https://github.com/sopra-fs24-group-39/MapMystery-client/blob/main/src/components/views/FlagFinder.tsx) component.

[***FinalScore***](https://github.com/sopra-fs24-group-39/MapMystery-client/blob/main/src/components/views/FinalScore.tsx)

After a Game of Globe Guesser is finished the ranking is announced. 
Users can return back to the [Game](https://github.com/sopra-fs24-group-39/MapMystery-client/blob/main/src/components/views/Game.tsx)
component to play another round.

### How the components work together

It all boils down to a simple user walkthrough. Roughly illustrating as follows:



## Launch & Deployment
## Illustrations
## Roadmap
## Authors and acknowledgment
## License