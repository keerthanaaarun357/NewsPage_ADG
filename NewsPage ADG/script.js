document.getElementById('fetch-news').addEventListener('click', fetchNews);
document.getElementById('toggle-dark-mode').addEventListener('click', toggleDarkMode);

async function fetchNews() {
    const region = document.getElementById('region-select').value;
    const category = document.getElementById('category-select').value;
    const searchQuery = document.getElementById('search-input').value;
    const apiKey = 'a946b8814c534c7ca79eec1ebe74a2a2';

    let url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&category=${category}`;

    if (region !== 'worldwide') {
        url += `&country=${region}`;
    }

    if (searchQuery) {
        url = `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${searchQuery}&sortBy=publishedAt`;
    }

    displayLoadingSpinner(true);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    } finally {
        displayLoadingSpinner(false);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    if (!articles.length) {
        newsContainer.innerHTML = '<p>No news articles found.</p>';
        return;
    }

    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';

        const img = document.createElement('img');
        img.src = article.urlToImage || 'https://via.placeholder.com/150';
        newsCard.appendChild(img);

        const title = document.createElement('h2');
        title.textContent = article.title;
        newsCard.appendChild(title);

        const description = document.createElement('p');
        description.textContent = article.description;
        newsCard.appendChild(description);

        newsContainer.appendChild(newsCard);
    });

    applyDarkMode();
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    applyDarkMode();
}

function applyDarkMode() {
    const darkModeEnabled = document.body.classList.contains('dark-mode');
    document.querySelectorAll('.news-card').forEach(card => {
        if (darkModeEnabled) {
            card.classList.add('dark-mode');
        } else {
            card.classList.remove('dark-mode');
        }
    });
}

function displayLoadingSpinner(show) {
    const spinner = document.getElementById('loading-spinner');
    spinner.style.display = show ? 'block' : 'none';
}
