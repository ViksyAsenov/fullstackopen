title New Note Diagram

actor user
participant browser
participant server

user->>browser: clicks submit button

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note \nwith note from form data as payload

server-->>browser: REDIRECT TO /notes AND MAKE NEW GET REQUEST

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes

server-->>browser: html code

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->>browser: css file

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->>browser: js file

note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]

note right of browser: The browser starts executing the js code that fetches the JSON from the server