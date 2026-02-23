// Global state
let albums = [];
let filteredAlbums = [];

// DOM Elements
const albumGrid = document.getElementById('albumGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const genreFilter = document.getElementById('genreFilter');
const sortBy = document.getElementById('sortBy');
const noResults = document.getElementById('noResults');

// Initialize app
async function init() {
    await loadAlbums();
    populateGenreFilter();
    updateStats();
    renderAlbums(albums);
    attachEventListeners();
}

// Load albums from JSON
async function loadAlbums() {
    try {
        const response = await fetch('data.json');
        albums = await response.json();
        filteredAlbums = [...albums];
    } catch (error) {
        console.error('Error loading albums:', error);
        albums = [];
        filteredAlbums = [];
    }
}

// Populate genre filter dropdown
function populateGenreFilter() {
    const genres = [...new Set(albums.map(album => album.genre))].sort();
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre;
        option.textContent = genre;
        genreFilter.appendChild(option);
    });
}

// Update statistics
function updateStats() {
    const totalAlbums = filteredAlbums.length;
    const totalArtists = new Set(filteredAlbums.map(album => album.artist)).size;
    const totalGenres = new Set(filteredAlbums.map(album => album.genre)).size;

    document.getElementById('totalAlbums').textContent = totalAlbums;
    document.getElementById('totalArtists').textContent = totalArtists;
    document.getElementById('totalGenres').textContent = totalGenres;
}

// Render albums to the grid
function renderAlbums(albumsToRender) {
    albumGrid.innerHTML = '';
    
    if (albumsToRender.length === 0) {
        noResults.style.display = 'block';
        albumGrid.style.display = 'none';
        return;
    }

    noResults.style.display = 'none';
    albumGrid.style.display = 'grid';

    albumsToRender.forEach(album => {
        const card = createAlbumCard(album);
        albumGrid.appendChild(card);
    });
}

// Create album card element
function createAlbumCard(album) {
    const card = document.createElement('div');
    card.className = 'album-card';
    card.innerHTML = `
        <div class="album-cover">${album.emoji}</div>
        <div class="album-info">
            <h3>${album.album}</h3>
            <p class="artist">${album.artist}</p>
            <div class="album-details">
                <span class="genre-tag">${album.genre}</span>
                <span class="year">${album.year}</span>
            </div>
        </div>
    `;
    return card;
}

// Search functionality
function searchAlbums() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedGenre = genreFilter.value;

    filteredAlbums = albums.filter(album => {
        const matchesSearch = searchTerm === '' || 
            album.artist.toLowerCase().includes(searchTerm) ||
            album.album.toLowerCase().includes(searchTerm) ||
            album.genre.toLowerCase().includes(searchTerm);

        const matchesGenre = selectedGenre === '' || album.genre === selectedGenre;

        return matchesSearch && matchesGenre;
    });

    sortAlbums();
    updateStats();
    renderAlbums(filteredAlbums);
}

// Sort albums
function sortAlbums() {
    const sortValue = sortBy.value;

    filteredAlbums.sort((a, b) => {
        switch(sortValue) {
            case 'artist':
                return a.artist.localeCompare(b.artist);
            case 'album':
                return a.album.localeCompare(b.album);
            case 'year':
                return b.year - a.year;
            default:
                return 0;
        }
    });
}

// Attach event listeners
function attachEventListeners() {
    searchBtn.addEventListener('click', searchAlbums);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchAlbums();
        }
    });
    genreFilter.addEventListener('change', searchAlbums);
    sortBy.addEventListener('change', () => {
        sortAlbums();
        renderAlbums(filteredAlbums);
    });
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadAlbums,
        searchAlbums,
        sortAlbums,
        createAlbumCard,
        updateStats
    };
}

// Start the app when DOM is ready (but NOT during testing)
if (typeof process === 'undefined' || process.env.NODE_ENV !== 'test') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}