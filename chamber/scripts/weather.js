const currentTemp = document.querySelector(".temp");
const weatherIcon = document.querySelector("img.forecast");
const captionDesc = document.querySelector("p.forecast strong");
const humidity = document.querySelector(".humidity");
const chill = document.querySelector(".chill");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=32.38&lon=-83.35&units=imperial&appid=0774cd6545e45cccf25365b47a25eb9c";

async function apiFetch() 
{
    try
    {
        const response = await fetch(url);

        if (response.ok)
        {
            const data = await response.json();
            displayResults(data);
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

function displayResults(data)
{
    currentTemp.innerHTML = `${data.main.temp.toFixed(0)}&deg;F`;
    const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    
    let desc = data.weather[0].description;

    desc = desc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    weatherIcon.src = iconSrc;
    weatherIcon.alt = desc;
    captionDesc.textContent = desc;
    humidity.textContent = data.main.humidity;
    chill.textContent = windchill(data.main.temp, data.wind.speed);

}

function windchill(temp, vel)
{
    if (temp <= 50)
    {
        return 35.74 + 0.6215*temp - 35.75*(vel ^ 0.16) + 0.4275*temp*(vel ^ 0.16).toFixed(0);
    }
    else
    {
        return "N/A";
    }
}

apiFetch();
