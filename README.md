# event-app

## Installation guide

### 1. Installing dependencies

At the root folder run:

```bash
npm install
```

Then run the following command:

```bash
cd src/server
npm install
```

### 2. Setting up a database

Go to the `database` folder:

```bash
cd server/database
```

Create `.env` file and fill it according to `.env_example`

Create Docker image:

```bash
docker build -t database-name .
```

Create and run Docker container:

```bash
docker run --name container-name -p 5432:5432 --env-file .env database-name
```

If you need to run a created Docker container run:

```bash
docker start container-name
```

To stop the container run:

```bash
docker stop container-name
```

### 3. Setting up the server

Go to the `server` folder:

```bash
cd server
```

Create `.env` file and fill it according to `.env_example`

Run the following command:

```bash
npm start
```

### 4. Running the app

Now at the root folder run:

```bash
expo start
```

and connect via `Expo Go` app in your smartphone or run a web-version.
