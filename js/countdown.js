 // Countdown timer based on https://www.educative.io/edpresso/how-to-create-a-countdown-timer-using-javascript

 // Fetch API
 fetch("https://api.spacexdata.com/v3/launches/next")
     .then(function (response) {
         return response.json();
     })
     .then(function (json) {
         countdownTimer(json);
     })
     .catch(function (error) {
         console.log(error);
     });

 function countdownTimer(nextLaunch) {
     const nextLaunchTime = nextLaunch.launch_date_utc;
     const countdownDate = new Date(nextLaunchTime).getTime();
     document.querySelector(".countdown").style.color = "white";

     // Run timer every second
     setInterval(function () {
         const timeNow = new Date().getTime();
         const timeleft = countdownDate - timeNow;

         // Calculating the days, hours, minutes and seconds left
         let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
         let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
         let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

         // Add zero before if only one digit
         if (days.toString().length < 2) {
             days = ("0" + days);
         }
         if (hours.toString().length < 2) {
             hours = ("0" + hours);
         }
         if (minutes.toString().length < 2) {
             minutes = ("0" + minutes);
         }
         if (seconds.toString().length < 2) {
             seconds = ("0" + seconds);
         }

         // Add HTML
         const countdownContainer = document.querySelector(".countdown");
         countdownContainer.innerHTML = `
         <div class="countdown-numbers"><div>${days}<span>Days</span></div><div>${hours}<span>Hours</span></div><div>${minutes}<span>Minutes</span></div><div>${seconds}<span>Seconds</span></div></div>`;
     }, 1000);

     // Add delay to other elements in container so they load together with timer (quick fix)
     setTimeout(function () {
         document.querySelector(".small-text").style.display = "block";
         document.querySelector(".arrow-link").style.display = "block";
         document.querySelector(".header-content-countdown").style.opacity = "1";
         document.querySelector(".header-content").style.opacity = "1";
     }, 1000)

 }