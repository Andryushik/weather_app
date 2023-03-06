window.addEventListener('load', () => {
  const temperature = document.querySelector('.temperature');
  const description = document.querySelector('.description');
  const location = document.querySelector('.location');
  const iconImgSet = document.querySelector('img');

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=dbe8033764867f4247db7100905000c1&units=metric`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const descriptionString =
            data.weather[0].description.charAt(0).toUpperCase() +
            data.weather[0].description.slice(1);
          iconImgSet.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          temperature.textContent = Math.round(data.main.temp);
          description.innerHTML = `${descriptionString},<br> wind ${data.wind.speed} m/s`;
          location.textContent = data.name;
        })
        .catch((error) => {
          alert('Cannot get the weather data! Check your internet connection.');
          throw new Error('Cannot get the weather data');
        });
    },
    (error) => {
      console.log('cant get location', error.message);
      alert('Cannot get your location. Check browser settings.');
      location.textContent = 'Cannot find your location';
    },
  );
});
