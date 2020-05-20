// fetch("https://api.spacexdata.com/v3/launches/next")
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (json) {
//         countdownTimer(json);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

// function countdownTimer(nextLaunch) {
//     // const countdownContainer = document.querySelector(".countdown");
//     console.log(new Date().getTime());

//     const countdown = setInterval(function () {
//         const nextLaunchTime = nextLaunch.launch_date_unix;
//         const currentTime = new Date().getTime();

//         const timeleft = nextLaunchTime - currentTime;
//         console.log(nextLaunchTime + " current time");

//         var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
//         var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
//         var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
//         console.log(`${days} days`);
//     }, 1000)

// }