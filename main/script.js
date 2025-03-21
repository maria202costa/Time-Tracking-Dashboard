const sectionCards = document.querySelector(".dashboard-div");
const dailyBtn = document.querySelector("#daily-btn");
const weeklyBtn = document.querySelector("#weekly-btn");
const monthlyBtn = document.querySelector("#monthly-btn");

document.addEventListener("DOMContentLoaded", function LoadTimeTracking() {
  fetch("/data.json")
    .then((response) => {
      if (!response.ok) return console.log("Something went wrong!");

      return response.json();
    })
    .then((data) => {
      data.map((itens) => {
        //Creating the layout with JavaScript(Daily is default):
        const divCard = document.createElement("div");
        divCard.classList.add("time-tracking-divs");

        const divImage = document.createElement("div");
        divImage.classList.add("card-image");
        divImage.style.backgroundColor = itens.backgroundColor;
        divImage.innerHTML = `<img src=${itens.image} alt=${itens.alt} class="card-img">`;

        const divInfo = document.createElement("div");
        divInfo.classList.add("card-info");

        const divTime = document.createElement("div");
        divTime.innerHTML = `<p class="title">${itens.title}</p>
        <i class="fa-solid fa-ellipsis"><i>`;

        const h2 = document.createElement("h2");
        h2.innerHTML = itens.timeframes.daily.current + "hrs";
        const p = document.createElement("p");
        p.classList.add("timeframes-p");
        p.innerHTML =
          "Last Day" + " - " + itens.timeframes.daily.previous + "hrs";

        divInfo.appendChild(divTime);
        divInfo.appendChild(h2);
        divInfo.appendChild(p);

        divCard.appendChild(divImage);
        divCard.appendChild(divInfo);
        console.log(divCard);

        sectionCards.appendChild(divCard);

        //Making the buttons interative:
        dailyBtn.addEventListener("click", () => {
          h2.innerHTML = itens.timeframes.daily.current + "hrs";
          p.innerHTML =
            "Last Day" + " - " + itens.timeframes.daily.previous + "hrs";
        });

        weeklyBtn.addEventListener("click", () => {
          h2.innerHTML = itens.timeframes.weekly.current + "hrs";
          p.innerHTML =
            "Last Week" + " - " + itens.timeframes.weekly.previous + "hrs";
        });

        monthlyBtn.addEventListener("click", () => {
          h2.innerHTML = itens.timeframes.monthly.current + "hrs";
          p.innerHTML =
            "Last Month" + " - " + itens.timeframes.monthly.previous + "hrs";
        });
      });
    });
});
