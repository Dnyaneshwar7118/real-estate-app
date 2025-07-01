# Real Estate Property Management Web Application

This is a full-stack web application designed to manage real estate properties efficiently. It allows users to register, login, add new properties, and view a listing of all available properties.

---

## Features

-  User Registration & Login with authentication
-  Add New Property (Title, Rent, Description, City, Type)
-  View All Listed Properties
-  Form Validations & Error Handling
-  Backend connected to JSON-SERVER ( D:\Users\Admin\Rbrickks\client\public\Data\database.json )
-  Built using React.js, Node.js, Express, and MySQL

---

## Tech Stack

| Technology | Usage |
|------------|--------|
| **Frontend** | React.js, Axios, React Router |
| **Backend** | Node.js, Express.js |
| **Database** | JSON-SERVER |
| **Styling** | CSS / Tailwind / Bootstrap |

---

## Getting Started

### 1. Clone the Repository

### bash
    git clone https://github.com/Dnyaneshwar7118/real-estate-app.git
    cd real-estate-app

## How to Start the React Server (Frontend)
1. Open Terminal
   Open your terminal or command prompt.

2. Navigate to the frontend folder
   If your project has a folder structure like this:
   real-estate-app/
   ├── client/
   └── client/public/Data/database.json

Then run:
    cd client

3. Install dependencies
   Make sure all required React packages are installed:
   npm install

4. Start the React development server
   Run the following command to start the frontend server:
   npm run dev

5. Open in Browser
   After successful start, React will automatically open in your default browser at:
   http://localhost:5173


## How to Start the backend Json-Server (backend)

1. Open Terminal
   Open your terminal or command prompt.
 
2. Navigate to the backend database.json folder
   If your project has a folder structure like this:
   real-estate-app/
   ├── client/
   └── client/public/Data/database.json

Then run:
    cd client

3. Install npm json-server
   npm i json-server

4. Start the React development server
   Run the following command to start the json-server:
   npx json-server ./client/public/Data/database.json

5. Open in Browser
   After successful start, React will automatically open in your default browser at:
   http://localhost:3000/users
   http://localhost:3000/rentProperties
