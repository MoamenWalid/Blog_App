# Blog App

## How to `Clone` and `Start` the Project

Follow these steps to clone the project and start both the frontend and backend.
<br>

### First Step: Clone the Project

To clone the project, run the following command:

```bash
git clone https://github.com/MoamenWalid/Blog_App.git
```

<br>



### Before start `frontend` and `backend` you must:
Follow these steps to add file `.env` in `backend` folder

```bash
cd Blog_App
```

```bash
cd backend
```

```
Add file named .env
```

<br>

Fill it by this following code
```
PORT=8000
MONGO_URL=YOUR_MONGO_URL
NODE_ENV=development
JWT_SECRET=YOUR_SECRET_KEY
CLOUDINARY_NAME=YOUR_CLOUDINARY_NAME
CLOUDINARY_KEY=YOUR_CLOUDINARY_KEY
CLOUDINARY_SECRET=YOUR_CLOUDINARY_SECRET

```
<br>

### Second Step: Start the Frontend

1. Navigate to the project directory:

```bash
cd Blog_App
```

2. Move into the `Frontend` directory:
```bash
cd frontend
```

3. Install the necessary dependencies:
```bash
npm i
```

4. Start the `Frontend` server:
```bash
npm start
```

<br>

### Last Step: Start the Backend

1. Navigate to the `Backend` directory:

```bash
cd ../backend
```

2. Install the necessary dependencies:
```bash
npm i
```

3. Start the `backend` server:
```bash
npm start
```