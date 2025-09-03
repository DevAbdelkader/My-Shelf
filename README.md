# My-Shelf

Welcome to **My-Shelf**, a simple web application for displaying and managing a collection of books.

## Project Overview

My-Shelf is a books management web application that provides an interface to view, search, and add books using their ISBN. It fetches book details from the ISBN Search API and stores data locally for offline access.

## Features

- **Search Functionality**: A search bar allows users to filter the book collection by title or keyword.
- **Book Display**: Books are shown as cards with covers and titles. If a cover is unavailable, a "NO COVER" placeholder is displayed.
- **ISBN Search**: Users can add books by entering their ISBN, which fetches title, authors, and cover image from the ISBN Search API.
- **Offline Access**: All book data is stored in local storage, allowing access without an internet connection after initial fetch.
- **Cover Handling**: Book covers are transcoded into Base64 and stored as data URLs.

## Project Structure

The project is organized as follows:

- **core/**
  - `cover.js`: Handles the management of book covers, including storing them as base64-encoded strings in localStorage.
  - `storage.js`: Manages the rest of the book data storage in localStorage.
  - `api.js`: Manages ISBN Search API.
  - `ISBN.js`: Structuring and organizing the output from the ISBN Search API.
  - `shelf.js`: Manages DOM operations.
- `index.html`: The main HTML file for the application's structure.
- `styles.css`: CSS file for styling the user interface.
- Other assets and files as needed for the application.

## Installation

In case you would like to try it:

1. Clone the repository:
   ```bash
   git clone https://github.com/DevAbdelkader/My-Shelf.git
   ```
2. Navigate to the project directory:
   ```bash
   cd My-Shelf
   ```
3. Open `index.html` in a web browser to view the application.

## Usage

- Use the search bar to filter the books by typing a title or keyword.
- Add a new book by entering its ISBN in the provided input field (if implemented in the UI), which will fetch and store the details.
- View the book covers and titles on the shelf. Data persists across sessions via local storage.

## Favicon

The favicon for this project is provided by [Icons8](https://icons8.com/).

---

## Technical

- **Scalability**: The implementation uses client-side storage with localStorage in JSON format. Scalability is limited by the browser's localStorage size constraint (typically 5-10 MB). For larger collections, transitioning to a server-side database would be a good idea.
- **Cover Storage**: Book covers are stored in `localStorage` as base64-encoded strings, managed by the `cover.js` file. They are converted to data URLs for rendering, with a "NO COVER" placeholder if data is missing.
- **Implementation**: The project uses HTML for structure, CSS for styling the shelf layout, and JavaScript for functionality like API fetching, search, and local storage handling. It is a single-page application with no backend, relying on client-side processing and the ISBN Search API for data retrieval.
