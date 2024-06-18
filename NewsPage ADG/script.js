document.getElementById('fetch-news').addEventListener('click', fetchNews);

async function fetchNews() {
    const region = document.getElementById('region-select').value;
    const category = document.getElementById('category-select').value;
    const apiKey = 'a946b8814c534c7ca79eec1ebe74a2a2'; // Replace with your NewsAPI key

    let url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&category=${category}`;
    
    if (region !== 'worldwide') {
        url += `&country=${region}`;
    }

    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
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
}
