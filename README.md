# 🎵 TuneVault - Music Library Manager

A simple, elegant music library application built with vanilla HTML, CSS, and JavaScript. Browse, search, and organize your favorite albums.

## Features

- **Search**: Find albums by artist, album name, or genre
- **Filter**: Browse albums by genre
- **Sort**: Organize by artist, album, or year
- **Statistics**: View total albums, artists, and genres
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- HTML5
- CSS3 (with modern grid and flexbox)
- Vanilla JavaScript (ES6+)
- Jest for testing
- ESLint for code quality

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tunevault-music-library
```

2. Install dependencies:
```bash
npm install
```

### Running Locally

Start a local server:
```bash
npm start
```

Then open your browser to `http://localhost:8080`

### Running Tests

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Project Structure

```
tunevault-music-library/
├── index.html          # Main HTML file
├── styles.css          # Styling
├── app.js              # Application logic
├── data.json           # Album data
├── __tests__
      └── app.test.js.  # Test suite
├── package.json        # Dependencies and scripts
└── README.md           # Documentation
```

## Adding Albums

Edit `data.json` to add new albums. Each album should follow this structure:

```json
{
  "id": 1,
  "artist": "Artist Name",
  "album": "Album Title",
  "year": 2024,
  "genre": "Genre",
  "emoji": "🎵"
}
```

## Testing

The application includes comprehensive tests covering:
- Data loading and error handling
- Album card generation
- Search and filter functionality
- Statistics calculation
- Edge cases and special characters

## Deployment

This application can be deployed to any static hosting service:
- GitHub Pages
- Vercel
- Netlify
- AWS S3
- Any web server