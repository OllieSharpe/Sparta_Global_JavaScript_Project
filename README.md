# JavaScript Project - Type Racer

This project aimed to create a fully functional, browser-based, game using HTML5, CSS and JavaScript. The project involved 2 sprints and had core requirements of: must be fully functional, well styled, must display a win/loss message or deliver a score and it must feature instructions on how to play (to be displayed on page or linked too). This game features two additional bonus features: player vs computer functionality and a high-score feature which uses local storage (with the latter not being covered during the course and therefore researched independently).

How to Play:

To begin the game, press the start button at the top of the webpage. Once the game has begun, words will appear beneath the track and the Red (computer controlled) car will begin racing towards the finish line. The Blue (player controlled) car will speed up by a fixed amount after each word is typed correctly. Incorrectly typing a word will cause the car to lose an equal amount of speed. The objective of the game is to beat the Red car to the finish line. If your time beats one of the five high-scores displayed, you will be given a prompt for your name and your time will be added to the list. After the first click, the start button will convert to a reset button which will refresh the game page.

Sprint 1:

The main focus of sprint 1 was to set-up the page structure and to implement the games core functionality. A race function was created to transition the cars across the screen and an "enableType" function was created to generate words and to attach correct and incorrect outputs to the players speed.

Sprint 2:

Sprint 2 first added the high-score functionality. It then focused on the styling of the page which was largely untouched in Sprint 1. Sprint 2 also fixed a few bugs wherein the race outcome message were displaying incorrectly.

In its current state the game has a defined finish line point at 1400px. If this value exceeds the screens maximum width, the cars will continue off screen. In future I am looking to add media queries to fix this issue.

Software used:
- Atom (text-editor)
- Html5
- CSS
- JavaScript
- Trello (Task management)
- Google chrome (browser and developer tools)
