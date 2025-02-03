const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const greetingText = document.getElementById('greeting');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then(response => response.json())
        .then(result => {
            /* Filter only artists whose names begin with "searchTerm" */
            const filteredResults = result.filter(artist => 
                artist.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            );
            if (filteredResults.length > 0) {
                displayResults(filteredResults);
            } else {
                showNoResults();  /* If there are no results, a message will be shown to the user */
            }
        });
}

function displayResults(result) {
    /* Display artist results and hide the "No artists found" message */
    resultPlaylist.classList.add("hidden");
    resultArtist.classList.remove('hidden');
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    greetingText.innerText = 'Boas vindas'; /* Restores the original welcome text */
}

function showNoResults() {
    /* When no results are found, we show the message "No artists found" and the playlists */
    resultArtist.classList.add('hidden');
    resultPlaylist.classList.remove('hidden');
    greetingText.innerText = '"Nenhum artista encontrado."';  /* Replace the welcome text with the error message */
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm === '') {
        /* If the search field is empty, we show playlists */
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        greetingText.innerText = 'Boas vindas';  /* Restore welcome text when field is empty */
    } else {      
        /* Perform the search with the typed letter */
        requestApi(searchTerm);
    }
});