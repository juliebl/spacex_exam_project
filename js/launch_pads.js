// Fetch API
apiURL = "https://api.spacexdata.com/v3/launchpads";
fetch(apiURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (json) {

        showLaunchPads(json);
    })
    .catch(function (error) {
        console.log(error);
    });

function showLaunchPads(launchPad) {

    container = document.querySelector("tbody");
    let newHTML = "";
    for (var i = 0; i < launchPad.length; i++) {

        // Check if there is a wikipedia link
        let wikiLink = "";
        if (launchPad[i].wikipedia === null) {
            wikiLink = `<a href="" class="wiki-link non-clickable-link">Read more on Wikipedia</a>`;

        } else {
            wikiLink = `<a href="${launchPad[i].wikipedia}" class="wiki-link">Read more on Wikipedia</a>`;
        }


        // function vehiclesLaunched() {
        //     for (i = 0; i < launchPad[i].vehicles_launched.length; i++) {
        //         const vehicle = launchPad[i].vehicles_launched[i];
        //         console.log(vehicle)
        //     }
        // }
        // vehiclesLaunched();


        const launchPadDetails = `<tr class="less-info">
        <td>${launchPad[i].location.name}</td>
        <td>${launchPad[i].location.region}</td>
        <td>${launchPad[i].status.slice(0,1).toUpperCase() + launchPad[i].status.slice(1,launchPad[i].status.length)}</td>
    </tr> 
    <tr class="show-more-info">
                        <td class="more-info-row" colspan="4">
                            <div class="more-info">
                                <div class="more-info-main">
                                    <h2>${launchPad[i].site_name_long}</h2>
                                    <h3>${launchPad[i].location.region}</h3>
                                    <div>
                                    <div class="launch-pad-details"><p>${launchPad[i].details}</p>
                                    
                                    <div class="more-info-list">
                                    <div>
                                        <ul>
                                        <li><span>Status:</span><span>${launchPad[i].status}</span></li>
                                        <li><span>Successful launches:</span><span>${launchPad[i].successful_launches} / ${launchPad[i].attempted_launches}</span> </li>
                                        <li><span>Vehicles launched:</span><span>${launchPad[i].successful_launches} / ${launchPad[i].attempted_launches}</span> </li>
                                        </ul>

                                    </div>
                                </div>
                                ${wikiLink} </div>  
                                    <iframe class="patch full-width" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBVm2T6LbGNuBCTPR3fQPdQBaQdhpe3pkk&q=${launchPad[i].location.latitude},${launchPad[i].location.longitude}&zoom=8" title="Map showing position for ${launchPad[i].site_name_long} launch site" allowfullscreen></iframe>
                                    </div>

                                </div>

                                <i class="fas fa-chevron-up close-icon less-info"></i>
                           
                        </td>
                    </tr>
  `;


        newHTML += launchPadDetails;
    }

    container.innerHTML = newHTML;

    // Expand info about each launch pad
    const lessInfo = document.querySelectorAll(".less-info");
    for (var i = 0; i < lessInfo.length; i++) {
        lessInfo[i].addEventListener("click", function (event) {
            const target = event.currentTarget
            if (target.classList.contains("close-icon")) {
                const rowParent = target.closest(".show-more-info.show-row")
                if (rowParent) {
                    rowParent.classList.toggle("show-row");
                }
                return
            }

            const showMoreInfo = event.currentTarget.nextElementSibling;
            if (showMoreInfo) {
                showMoreInfo.classList.toggle("show-row");
            }
        });

    }
}