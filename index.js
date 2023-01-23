// dynamic subLinks for Every navLInk
const tvSubCont = document.querySelector(".tvSubLinksCont");
const movieSubCont = document.querySelector(".movieSubLinksCont");
const sportSubCont = document.querySelector(".sportSubLinksCont");

// navbar position on scroll
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  const scrollHeight = window.scrollY;
  const headerHeight = header.getBoundingClientRect().height;
  if (scrollHeight > headerHeight) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

// to generate the navSublinks
function toGenrateSubLinks(data) {
  return data
    .map((item) => {
      return ` <li class="sub-link"><a href="/">${item.linkName}</a></li>`;
    })
    .join("");
}
// data from data.js
tvSubCont.innerHTML = toGenrateSubLinks(tvShowsData);
movieSubCont.innerHTML = toGenrateSubLinks(movieSubData);
sportSubCont.innerHTML = toGenrateSubLinks(sportSubData);

// To generate slides
function toSetSlider() {
  const slideContainer = document.querySelector(".sliderCont");
  function toGenSlide(slides) {
    return slides
      .map((item) => {
        return `<div class="slide">
                <div class="movieDescp">
                  <h2 class="slideMovName">${item.movieName}</h2>
                  <p class="slideMovGenre">
                  ${item.genre.language} <span>&#x2022;</span> ${item.genre.type} <span>&#x2022;</span>
                    <span>${item.genre.year}</span>
                  </p>
                  <p class="aboutMov">
                  ${item.descp}
                  </p>
                </div>
                <div class="movieImgCont">
                    <img
                    src="${item.movieImg}"
                    alt="${item.movieName}"
                    />
                <div class="movGradient"></div>
                </div>
                </div>`;
      })
      .join("");
  }
  slideContainer.innerHTML = toGenSlide(slidesData);
  const sectionOne = document.querySelector(".section-one");
  const prevBtn = document.createElement("button");
  prevBtn.setAttribute("class", "slideBtn leftSlideBtn");
  prevBtn.innerHTML = ` <i class="bi bi-chevron-left"></i>`;
  sectionOne.appendChild(prevBtn);
  const nextBtn = document.createElement("button");
  nextBtn.setAttribute("class", "slideBtn rightSlideBtn");
  nextBtn.innerHTML = ` <i class="bi bi-chevron-right"></i>`;
  sectionOne.appendChild(nextBtn);

  // to slide the slides on click of buttons and auto

  const slides = document.querySelectorAll(".slide");
  let counter = 0;

  slides.forEach((slide, ind) => {
    slide.style.left = `${ind * 100}%`;
  });

  prevBtn.addEventListener("click", () => {
    counter--;
    toShowSlide();
    clearInterval(timeInterval);
    setTimeout(() => {
      setInterval(() => {
        counter++;
        toShowSlide();
      }, 20000);
    }, 13000);
  });

  nextBtn.addEventListener("click", () => {
    counter++;
    toShowSlide();
    clearInterval(timeInterval);
    setTimeout(() => {
      setInterval(() => {
        counter++;
        toShowSlide();
      }, 20000);
    }, 13000);
  });

  function toShowSlide() {
    if (counter < 0) {
      counter = slides.length - 1;
    } else if (counter >= slides.length) {
      counter = 0;
    }

    slides.forEach((slide) => {
      slide.style.transform = `translateX(-${counter * 100}%)`;
    });
  }

  // to auto slide
  let timeInterval;
  timeInterval = setInterval(() => {
    counter++;
    toShowSlide();
  }, 10000);
}

toSetSlider();

// MOVIE LIST GENERATION
window.addEventListener("DOMContentLoaded", () => {
  CardItems();
});

const movieCardCont = document.querySelector(".movieCardCont");

function CardItems() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "4d1d405e39mshaba9aa484f12d2ep1d8c8ejsnc2601d5c6156",
      "X-RapidAPI-Host": "flixster.p.rapidapi.com",
    },
  };

  fetch(
    "https://flixster.p.rapidapi.com/movies/get-popularity?zipCode=90002&radius=50",
    options
  )
    .then((response) => response.json())
    .then((data) => {
      let list = data.data.popularity;
      return list
        .map((item) => {
          return ` <div class="card">
          <img
            class="moviePoster"
            src="${item.posterImage.url}"
            alt=""
          />
          <div class="descp">
            <span class="posterName">${item.name}</span>
            <p class="about">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad exercitationem doloribus recusandae corrupti, soluta tempora.S
            </p>
            <ul class="cardBtns">
             <a  href="#" class="cardBtn">
              <span>
                <i class="bi bi-play-fill"></i>
                Watch Movie
              </span>
              </a>
            
            <a href="#" class="cardBtn">
              <span>
                <i class="bi bi-plus-lg"></i>
                Add To Playlist
              </span>
            </a>
            </ul>
          </div>
        </div> `;
        })
        .join("");
    })
    .then((trendingData) => {
      movieCardCont.innerHTML = trendingData;
    })
    .catch((err) => console.error(err));

  // popular List
  const popularCont = document.querySelector(".popular");
  const popularData = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "4d1d405e39mshaba9aa484f12d2ep1d8c8ejsnc2601d5c6156",
      "X-RapidAPI-Host": "anime-db.p.rapidapi.com",
    },
  };

  fetch(
    "https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=Fullmetal&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc",
    popularData
  )
    .then((response) => response.json())
    .then((data) => {
      let animeList = data.data;
      return animeList
        .map((item) => {
          let descp = item.synopsis.substring(0, 70) + "...";
          return ` <div class="card">
                      <img
                        class="moviePoster"
                        src="${item.image}"
                        alt=""
                      />
                    <div class="descp">
                      <span class="posterName">${item.title}</span>
                      <p class="about">
                      ${descp}
                      </p>
                      <ul class="cardBtns">
                       <a  href="#" class="cardBtn">
                        <span>
                          <i class="bi bi-play-fill"></i>
                          Watch Movie
                        </span>
                        </a>
                        <a href="#" class="cardBtn">
                       <span>
                        <i class="bi bi-plus-lg"></i>
                        Add To Playlist
                        </span>
                        </a>
                      </ul>
                    </div>
                  </div> `;
        })
        .join("");
    })
    .then((anime) => {
      popularCont.innerHTML = anime;
    })
    .catch((err) => console.error(err));
}

// FOR SCrolling of Movie list
function toScrollMovieList() {
  const listPrevBtn = document.querySelectorAll(".prevBtn");
  const listNextBtn = document.querySelectorAll(".nextBtn");
  let movieCardContainers = document.querySelectorAll(".movieCardCont");
  movieCardContainers.forEach((item, i) => {
    let movieCardContWidth = item.getBoundingClientRect().width;
    listPrevBtn[i].addEventListener("click", () => {
      item.scrollLeft -= movieCardContWidth;
    });
    listNextBtn[i].addEventListener("click", () => {
      item.scrollLeft += movieCardContWidth;
    });
  });
}
toScrollMovieList();
