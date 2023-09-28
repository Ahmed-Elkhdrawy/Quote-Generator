const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorName = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const copyBtn = document.getElementById('copy');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Sow New Quote
function newQuote() {
    showLoader();
    // Pick a Randome Quote From apiQuotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
    // Check if Author  Field Is Blank And Replace It With 'Unknown'
    if (!quote.author) {
        authorName.textContent = "Unknown";
    } else {
        quote.author.split(",")[0];
        if (quote.author == "type.fit") {
            authorName.textContent = "Unknown";
        } else {
            authorName.textContent = quote.author.split(",")[0];
        }
    }
    // Check Quote Length Te Determine Styling
    if (quote.text.length > 100 ) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text; 
    hideLoader();
}

// Get Quotes From API
async function getQuotes() {
    showLoader();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json(); 
        newQuote();
    } catch (error) {
        // catch Error 
    }
}

// Copy Quote 
function copyQuote() {
    navigator.clipboard.writeText(`${quoteText.textContent} ${authorName.textContent}`);
    copyBtn.innerHTML = '<i class="fa-regular fa-clipboard"></i>';
    let copiedPop = document.getElementById('copied');
    copiedPop.classList.add('pop');
    setTimeout( () => {
        copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
    },3000);
    setTimeout( () => {
        copiedPop.classList.remove('pop');
    },1000);
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorName.textContent}`;
    window.open(twitterUrl, '_black');
}

function showLoader() {
    loader.style.visibility = 'visible';
}
function hideLoader() {
    loader.style.visibility = 'hidden';
}

// Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
copyBtn.addEventListener('click', copyQuote);

// On Load
getQuotes();