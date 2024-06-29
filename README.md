HDB Data Visualization Application

This application retrieves and visualizes HDB (Housing and Development Board) resale flat data based on various queries such as town, flat type, and month-year.

Installation

Install Node.js and npm:
Ensure you have Node.js (version 14.x or higher) installed. npm (Node Package Manager) will be installed automatically with Node.js. You can download Node.js from nodejs.org.

Install dependencies:
    npm install

Running the Server

To start the server, run:

node server.js

This will start the server at http://localhost:8081.
Running the Client

Open index.html in your web browser. This file is located in the root directory of the project.
Usage

    Select a Town: Choose a town from the dropdown menu and click "Submit" to view HDB data specific to that town.
    Data Visualization: The application visualizes HDB data by displaying highest and lowest prices, mean, and median prices for different flat types in the selected town.

Technologies Used

    Frontend: HTML, CSS (Bootstrap), JavaScript (ES6)
    Backend: Node.js, Express.js
    Data Parsing: csv-parse (Node.js module)
    Custom Elements: Web Components (used for custom <hdb-card> component)

Server Endpoints

    /allhdbdata: GET endpoint to retrieve all HDB resale flat data.
    /bytown/:town: GET endpoint to retrieve HDB resale flat data filtered by town name.

Programming Languages

The application primarily uses JavaScript (ES6) for both frontend and backend development. Node.js is used on the server-side to handle requests and responses, while client-side operations are managed with vanilla JavaScript along with custom web components."# HDB-Data-Visualization-Application" 
