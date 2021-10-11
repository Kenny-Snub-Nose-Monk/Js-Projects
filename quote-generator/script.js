//Get Quotes From API
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQutoeBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

// Loading complete or loading
function showLoadingSpinner(){
    loader.hidden = true
    quoteContainer.hidden = false
}

function removeLoadingSpinner(){
    if (!loader.hidden){
        loader.hidden = false
        quoteContainer.hidden = true
    }
}

//Show New Quote
function newQuote(){
    showLoadingSpinner()
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    

    if (!quote.author){
        authorText.textContent = 'Unknown'
    }else{
        authorText.textContent = quote.author   
     }

    //Check Quote length to determine styling
    if (quote.text.length > 80){
        quoteText.classList.add('long-quote')
    }else{
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text
    removeLoadingSpinner()
}       

async function getQuotes(){
    showLoadingSpinner()
    const apiUrl = "https://type.fit/api/quotes";
    try{
        // means this constant will not be populated until it 
        // has some data fetched from our API.
        const response = await fetch(apiUrl)
        apiQuotes = await response.json(apiQuotes)
        newQuote()
    }catch(error){
        //Catch Error Here
        console.log("fail")
    }
}

// On Load
getQuotes();


// Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    window.open(twitterUrl, '_blank')
}

//Event Listener
newQutoeBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)


// let f = fetch("https://jsonplaceholder.typicode.com/users")

// f
// .then(function(userData){
//     return userData.json()
// })
// .then(function(jsonData){
//     console.log(jsonData)
// })


// async function getUsername(){
//     try{
//         let username = await fetch("https://jsonplaceholder.typicode.com")
//         username = await username.json()
//         console.log(username)
//     }catch(message){
//         console.log(`Error : ${message}`)
//     }
// }


// console.log("test 123")