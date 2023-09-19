const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-btn");

const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const getMovies = async (api) => {
  const response = await fetch(api);
  const data = await response.json();
  showMovies(data);
};

const movies = document.getElementById("movie-cards");
const showMovies = (data) => {
  console.log(data.results);

  movies.innerHTML = "";
  data.results.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <img src="${IMGPATH + element.poster_path}"
        alt="" id="card-img">
    <div class="bottom">
        <div class="title-rating">
            <p id="title">${element.title}</p>
            <p id="desc">${element.overview} </p>
        </div>
        <div class="fotter">
            <p id="rating">Imdb:<p id="rt">${element.vote_average}</p> </p>
            <button id="card-btn">more</button>
        </div>
    </div>
`;
    movies.appendChild(card);
  });
};

searchInput.addEventListener("keyup", function (event) {
  if (event.target.value != "") {
    getMovies(SEARCHAPI + event.target.value);
  } else {
    getMovies(APIURL);
  }
});

getMovies(APIURL);

const moreBtn = document.getElementById("card-btn");