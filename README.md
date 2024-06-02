# React Go Todos App

## How to start Golang API server ?

1. Clone Project
   ```bash
   git clone https://github.com/mk46/todos.git
   ```
2. Install Go dependency
    ```bash
    cd todos
    go mod tidy
    ```
3. Create a .env file in the Todos directory and set `PORT` and `MONGODB_URL` like below
   ```bash
   PORT=8000
   MONGODB_URI=mongodb://mongoadmin:secret@localhost:27017
   ```
   
4. Start the Go API server
   ```bash
    go run main.go
   ```
## How to start the React app?

1. Navigate to the `client` directory and run npm install to download dependencies.
   ```
    cd client
    npm install
   ```
3. Run React app
   ```bash
    npm run dev
   ```
