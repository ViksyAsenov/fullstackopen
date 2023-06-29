title SPA New Note Diagram

participant browser
participant server

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
note right of browser: Content-Type: application/json \n{content: "testche2", date: "2023-06-29T09:35:38.772Z"}
server-->>browser: 201 Created

note right of browser: The browser executes the event handler that renders the notes