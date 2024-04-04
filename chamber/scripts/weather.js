const currentTemp = document.querySelector(".temp");
const weather = document.querySelector(".weather div div");
const captionDesc = document.querySelector("p.forecast strong");
const humidity = document.querySelector(".humidity");
const chill = document.querySelector(".chill");
const dateElements = document.querySelectorAll(".date"); 
const tempRangeElements = document.querySelectorAll(".temp-range");

const baseURL = "https://api.openweathermap.org/data/2.5/";
const parameters = "?lat=32.38&lon=-83.35&units=imperial&appid=0774cd6545e45cccf25365b47a25eb9c";


async function apiFetch(url) 
{
    try
    {
        const response = await fetch(url);

        if (response.ok)
        {
            const data1 = await response.json();
            displayWeatherResults(data1);
        }
        else
        {
            throw Error(await response.text());
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

function displayWeatherResults(data)
{
    if (data.list) {
        let weatherDisplay = [];

        let i = 0;
        let today = new Date();
        let forecastDay = new Date(data.list[i].dt_txt);
        for (let k = 0; k < 3; k++)
        {
            
            let minTemps = [];
            let maxTemps = [];
            while (forecastDay.getDate() <= today.getDate()) 
            {
                i++;
                forecastDay = new Date(data.list[i].dt_txt);
            }
            
            for (let j = i; j < i + 8; j++)
            {
                minTemps.push(data.list[j].main.temp_min);
                maxTemps.push(data.list[j].main.temp_max);
            }
            let minTemp = Math.min(...minTemps);
            let maxTemp = Math.max(...maxTemps);

            weatherDisplay.push
            (
                {
                    date: data.list[i].dt_txt.split(" ")[0],
                    tempRange: `${minTemp.toFixed(0)}°F / ${maxTemp.toFixed(0)}°F`
                }
            )
            today.setDate(today.getDate() + 1);
        }

        weatherDisplay.forEach((day, i) =>
            {
                dateElements[i].textContent = new Date(day.date).toLocaleDateString("en-US", { weekday:"short", month:"short", day:"numeric", timeZone: "UTC"}) ;
                tempRangeElements[i].textContent = day.tempRange;
            })
    }
    else 
    {
        currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;
        const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        
        let desc = data.weather[0].description;

        desc = desc.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
        const weatherIcon = document.createElement("img");
        weatherIcon.src = iconSrc;
        weatherIcon.alt = desc;
        weatherIcon.setAttribute("height", "50px");
        weatherIcon.setAttribute("width", "50px");
        weather.insertBefore(weatherIcon, weather.firstChild);
        captionDesc.textContent = desc;
        humidity.textContent = data.main.humidity;
        chill.textContent = windchill(data.main.temp, data.wind.speed);
    }
}

function windchill(temp, vel)
{
    if (temp <= 50)
    {
        return 35.74 + 0.6215*temp - 35.75*(vel ** 0.16) + 0.4275*temp*(vel ** 0.16).toFixed(0);
    }
    else
    {
        return "N/A";
    }
}

apiFetch(`${baseURL}weather${parameters}`)
apiFetch(`${baseURL}forecast${parameters}`)