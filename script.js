
var nav = document.querySelector("nav");
var projInfo = document.getElementsByClassName("proj-info");
    
//LOADING
function startLoader(){
    let counterElement = document.querySelector(".counter");
    let currentValue = 0;
    

    function updateCounter(){
        if(currentValue === 100){
            return;
        }

        currentValue += Math.floor(Math.random()*20)+1;

        if(currentValue > 100){
            currentValue=100;
            //document.body.style.overflow.innerHTML = "";
        }

        counterElement.textContent = currentValue;

        let delay = Math.floor(Math.random() * 10) + 50;
        setTimeout(updateCounter, delay);
    }
    updateCounter();

}

startLoader();

gsap.to(".counter", 0.25, {
    delay:0.8,
    opacity:0,
});

gsap.to(".bar", 1.5,{
    delay:0.8,
    height:0,
    stagger:{
        amount:0.5,
    },
    ease:"power4.inOut",
});

gsap.from(".h1", 1.5, {
    delay:1,
    y:200,
    stagger:{
        amount:0.5,
    },
    ease: "power4.inOut",
});
gsap.from(".hero", 2, {
    delay:1,
    y:200,
    ease:"power4.inOut",
});

gsap.from(".info", 2, {
    delay:1,
    y:200,
    ease:"power4.inOut",
});

gsap.from(".weather-box", 2, {
    delay:1,
    y:200,
    ease:"power4.inOut",
});



//CALENDAR PART
const date = document.getElementById("date");
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

const today = new Date();

const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const monthname = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

date.innerHTML = (today.getDate()<10?"0":"") + today.getDate();
day.innerHTML = week[today.getDay()-1];
month.innerHTML = monthname[today.getMonth()-1];
year.innerHTML = today.getFullYear();


let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

setInterval(()=>{
    let currentTime = new Date();

    sec.innerHTML = (currentTime.getSeconds()<10?"0":"") +currentTime.getSeconds();       
    hrs.innerHTML = (currentTime.getHours()<10?"0":"") + currentTime.getHours();
    min.innerHTML = (currentTime.getMinutes()<10?"0":"") +currentTime.getMinutes();

},1000)


//WEATHER PART
const api_key = "b82723997d4db11aa730f9ea0d9ad0ec";
const api_url = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const city_name = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const card = document.getElementsByClassName("card");

//const website = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=b82723997d4db11aa730f9ea0d9ad0ec&q=mumbai";

async function checkWeather(city_name){
    const response = await fetch(api_url + `&appid=${api_key}` + `&q=${city_name}`)

    console.log(response)
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();

        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    
        if (data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";
            card.style.background = "red"

        }
        else if (data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png"
        }
        else if (data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png"
        }
        else if (data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/drizzle.png"
        }
        else if (data.weather[0].main == "Mist"){
            weatherIcon.src = "images/mist.png";
            card.style.background = "red";
        }
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}
searchBtn.addEventListener("click",()=>{
    checkWeather(city_name.value);
});

checkWeather("mumbai");



//Quotes
const quote_url = "https://dummyjson.com/quotes/random";

async function getQuote(url){
    const resp = await fetch(url);
    var data = await resp.json();
    //console.log(data.quote);
    quote = document.getElementById("quote");
    quote.innerHTML = data.quote;
    author = document.getElementById("author");
    author.innerHTML = data.author;
}
getQuote(quote_url);
function tweetQuote(){
    window.open("https://twitter.com/intent/tweet?text="+ quote.innerHTML + " ---- by " + author.innerHTML , "Tweet Window", "width = 600, height=300");
}




