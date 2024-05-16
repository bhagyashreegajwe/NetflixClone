const cl=console.log;
const newMovies = document.getElementById("newMovies");
const BASE_URL = `https://api.themoviedb.org/3`;
const API_KEY = `11d5e7e95631db77b04e9227addbaf49`;
const IMG_URL = `https://image.tmdb.org/t/p`;
const NEW_MOVIES_URL = `${BASE_URL}/trending/all/week?api_key=${API_KEY}`;

const slider = () =>{
    $('#newMovies').owlCarousel({
        loop:true,
        margin:0,
        nav:false,
        dots:false,
        responsive:{
            0:{
                items:1
            },
            1000:{
				
                items:1
            }
        }
    });
    
}

const moviesTemplating = (arrofMovies) => {
    newMovies.innerHTML = arrofMovies.map(movie =>{
        return `<div class="item">
                    <figure class="movieCard mb-0">
                        <img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}" alt="">
                        <figcaption>
                            <h3 class="display-3">
                                ${movie.original_title || movie.title || movie.original_name}
                            </h3>
                            <em class="my-5">
                                ${movie.overview}
                            </em>
                            <p>
                                <button class="btn btn-large radial-out" 
                                data-id="${movie.id}" onclick="loadQparams(this)">View More</button>
                            </p>
                        </figcaption>
                    </figure>
                </div>`
    }).join("");
}

const loadQparams = (ele) =>{
    let id = ele.dataset['id'];
    let currentUrl = new URL(window.location.href);
    let queryParams = new URLSearchParams(currentUrl.searchParams);
    queryParams.set("movieid", id);
    currentUrl.search = queryParams.toString();
    let movieRedirectUrl = `${currentUrl.origin}/movieinfo.html${currentUrl.search}`;
    window.location.href = movieRedirectUrl;
}

const callAPI = async (apiUrl, methodName, msgBody) =>{
    msgBody = msgBody ? JSON.stringify(msgBody) : null;
    let res = await fetch(apiUrl, {
        method : methodName,
        body : msgBody,
    });

    return res.json();
}

const getMovieData = async() =>{
    let res = await callAPI(NEW_MOVIES_URL, "GET")
    moviesTemplating(res.results);
    slider();
}

getMovieData();