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
    // const countdownContainer = document.querySelector(".countdown");
    // const dateNow = new Date();
    // console.log(dateNow.getTime());

    const nextLaunchTime = (nextLaunch.launch_date_local);
    console.log(nextLaunchTime);


    //     const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    //     const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //     const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    //     const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
}