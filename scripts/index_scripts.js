const API_KEY = "8734593b5800b5b7ca836222dc3d53a4"
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=1`

function mostrarCarrusel()
{
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            const film = data.results.slice(0,5); // solo toma 5 peliculas
            const container = document.getElementById("carruselContenido");

            film.forEach((movie, index) => {
            const item = document.createElement("div");
            item.className = `carousel-item ${index === 0 ? "active" : ""}`;
            item.innerHTML = `
                <img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" class="d-block w-100" alt="${movie.title}">
                <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
                <h5>${movie.title}</h5><p>${movie.overview}</p>
                </div>
            `;
            container.appendChild(item);
            });
        })
        .catch(error => {
            document.getElementById("movies-container").innerHTML = "¡Oh no! Algo salió mal 😢";
            console.error("Error:", error);
        })
    ;
};

function mostrarCartas()
{
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById('container') ;              
            const res = data.results
            res.forEach(movie => {
                const item = document.createElement("div");
                item.className = "col-6 col-md-4 col-lg-3 mb-4";

                item.innerHTML = `
                    <div id="cartas_peliculas" class="card"><a class="text-reset" href="pelicula.html?id=${movie.id}">
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top " alt="${movie.title}">
                        <div class="card-body">
                            <h5 class="card-title">${movie.title}</h5>
                        </a></div>
                    </div>
                `;

                container.appendChild(item);
                });

            })
        .catch(err => {
            console.log('Error:',err)
        });
    ;
};

mostrarCarrusel();
mostrarCartas();