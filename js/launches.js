fetch("https://api.spacexdata.com/v3/launches?order=asc&limit=50&order_by=launch_date_local")
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {
        showLaunches(json);
    })
    .catch(function (error) {
        console.log(error);
    });

function showLaunches(launch) {
    console.dir(launch);
    const container = document.querySelector("tbody");
    let newHTML = "";

    // Check if there is a flickr image
    let flickrImage = "";
    for (var i = 0; i < launch.length; i++) {
        if (launch[i].links.flickr_images.length === 0) {
            flickrImage = "No image found";
        } else {
            flickrImage = `${launch[i].links.flickr_images[0]}`;
        }
        // Check if there is a wikipedia link
        let wikiLink = "";
        if (launch[i].links.wikipedia === "") {
            document.querySelector(".wiki-link").style.display = "none";
        } else {
            wikiLink = `${launch[i].links.wikipedia}`;
        }
        // Check if there is a wikipedia link
        let articleLink = "";
        if (launch[i].links.article_link === "") {
            document.querySelector(".article-link").style.display = "none";
        } else {
            articleLink = `${launch[i].links.article_link}`;
        }
        // Shorten/ find date and time
        const longDate = `${launch[i].launch_date_local}`;
        const shortDate = longDate.slice(0, 10);
        const longTime = `${launch[i].launch_date_local}`;
        const shortTime = longTime.slice(11, 19);

        // Create HTML
        const launchDetails = `<tr class="less-info">
        <td>${shortDate}</td>
        <td>${launch[i].mission_name}</td>
        <td>${launch[i].rocket.second_stage.payloads[0].customers[0]}</td>
        <td>${launch[i].rocket.rocket_name}</td>
    </tr> 
    <tr class="show-more-info">
                        <td class="more-info-row" colspan="4">
                            <div class="more-info">
                                <div class="more-info-main">
                                    <h2>Mission name:</h2>
                                    <h3>${launch[i].mission_name}</h3>
                                    <p>${launch[i].details}</p>
                                    <a href="${articleLink}" class="article-link">Article</a><a href="${wikiLink}" class="wiki-link">Wikipedia</a>
                                </div>
                                <img class="patch" src="${launch[i].links.mission_patch}" alt="">
                                <div class="more-info-list">
                                    <h4>Payload:</h4>
                                    <div>
                                        <ul>
                                            <li><span>Type:</span><span>${launch[i].rocket.second_stage.payloads[0].payload_type}</span> </li>
                                            <li><span>Manufacturer:</span><span>${launch[i].rocket.second_stage.payloads[0].manufacturer}</span></li>
                                            <li><span>Nationality:</span><span>${launch[i].rocket.second_stage.payloads[0].nationality}</span> </li>
                                        </ul>
                                        <ul>
                                            <li><span>Customer:</span><span>${launch[i].rocket.second_stage.payloads[0].customers[0]}</span> </li>
                                            <li><span>Launch site:</span><span>${launch[i].launch_site.site_name}</span></li>
                                            <li><span>Vehicle:</span><span>${launch[i].rocket.rocket_name}</span> </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="date-time">
                                    <p>Local launch date/time</p>
                                    <p class="date">${shortDate}</p>
                                    <p class="time">${shortTime}</p>
                                </div>
                                <div class="img"><img src="${flickrImage}" alt="">
                                    <a href="">See more on Flickr ></a>
                                </div>
                                <div class="video"><img class="video" src="img/placeholder-image.png" alt=""><a
                                        href="">See more videos on YouTube ></a></div>
                                <i class="fas fa-chevron-up close-icon less-info"></i>
                            </div>
                        </td>
                    </tr>
  `;
        newHTML += launchDetails;
    }
    container.innerHTML = newHTML;

    const lessInfo = document.querySelectorAll(".less-info");
    for (var i = 0; i < lessInfo.length; i++) {
        lessInfo[i].addEventListener("click", function () {
            const showMoreInfo = document.querySelector(".show-more-info");
            console.log("KLIKK");
            showMoreInfo.classList.toggle("show-row");
        });
    }
}