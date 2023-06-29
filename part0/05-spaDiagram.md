title SPA Diagram

participant browser
participant server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa

server-->>browser: html code

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->>browser: css file

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->>browser: js file

note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]

note right of browser: The browser executes the event handler that renders the notes