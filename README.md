# 🎬 MovieMate

MovieMate is a personal movie and TV show collection manager.
It allows users to add, track, review, and filter movies and TV shows — with both a React frontend and a Django backend.

## Features

- Add movies/TV shows with details:
  - Title, Director, Genre, Platform (Netflix, Prime, etc.), Status (watching, completed, wishlist).
- Track progress for TV shows (episodes watched).
- Rate & review content after watching.
- Filter/sort list by genre, platform, or status.
- AI-powered review generation from user notes.
- OMDb API integration to auto-fetch movie/show details.
- CRUD operations (Create, Read, Update, Delete) supported in
  - 🎨 React frontend (interactive forms, edit dialogs, delete buttons).
  - 🛠️ Django Admin (edit inline or via detail view).
- Search functionality in both frontend and Django Admin.
- CORS-enabled backend for smooth frontend-backend communication.

## Tech Stack

**Client:** ReactJS (Routing, Form inputs, Filter, Progress UI, MUI)

**Server:** Django + Django REST Framework

**Database:** SQLite

**API Integration:** OMDb API

## Installation

1. Clone the repository
  

```bash
   git clone https://github.com/your-username/MovieMate.git
   cd MovieMate
```

2. Backend Setup (Django)

```bash
   cd STOREFRONT
```
   1.Create virtual environment

  ```bash
     python -m venv venv
     source venv/bin/activate     # macOS/Linux
     venv\Scripts\activate        # Windows
  ```

  2.Install dependencies

  ```bash
     pip install django djangorestframework requests django-cors-headers

  ```

   3.Apply migrations

  ```bash
     python manage.py migrate
  ```

  4.Seed database (optional)

 ```bash
    python manage.py shell < playground/seed.py

 ```

  5.Run backend server

 ```bash
    python manage.py runserver

 ```

3. Frontend Setup (React)
     
     ```bash
        cd Movie
     ```
   1.Install dependencies 
   ```bash
       npm install

     ``` 
    2.Start development server
  
   ``` bash
    npm run dev
   ```

## Usage

 - Open the frontend at:
  
  ```bash
  http://localhost:5173/

  ```

- Backend runs at:

 ```bash
  http://127.0.0.1:8000/

 ```

## 📌 Notes

- Ensure CORS is enabled in Django settings:

```bash
CORS_ALLOW_ALL_ORIGINS = True
# or restrict
# CORS_ALLOWED_ORIGINS = ["http://localhost:5173"]

```

- In Django Admin, you can edit platform, status, and genre inline by updating list_editable in admin.py.

- Frontend update forms send PATCH requests — empty values should be avoided to prevent overwriting.
 


    
    
