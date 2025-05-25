//Key para la API
const API_KEY = "8734593b5800b5b7ca836222dc3d53a4";

// obtener el ID de la peli desde la URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

function mostrarDetalle() {
    const movieURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=es`;
    // Llamar a la API de TMDB
    fetch(movieURL)
    .then(res => res.json())
    .then(movie => {
        const container = document.getElementById('detalle-pelicula');
        const puntuacion = movie.vote_average.toFixed(1);
        container.innerHTML = `
            <div class="card my-3 bg-dark" style="color: #d9d9d9" >
                <div class="row g-0 p-3">
                    <div class="col-md-4">
                    <img src="https://image.tmdb.org/t/p/w1280${movie.poster_path}" class="img-fluid rounded" alt="${movie.title}">
                    </div>
                    <div class="col-md-8 p-3">
                        <div class="card-body ">
                            <h1 class="card-title">${movie.title}</h1>
                            <p class="card-text">${movie.overview}</p>
                            <p><strong>Fecha de estreno:</strong> ${movie.release_date}</p>
                            <p><strong>Puntuación:</strong> 
                                <i class="bi bi-star-fill" style="color: yellow"></i>
                                 ${puntuacion}</p>
                           
                            <button class="btn btn-outline-danger">
                                <i class="bi bi-heart"></i>
                                Me gusta
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    })
    //mostrar los detalles
    .catch(err => console.error('Error al obtener los detalles:', err))
}

function mostrarReviews()
{
    const reviewsURL = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`
    fetch(reviewsURL)
      .then(res => res.json())
      .then(data => {
        const reviews = document.getElementById('resena_contenido'); //apuntamos al div "reviews"
            data.results.forEach(results => {
                //creamos al contenido del div con cada una de las instancias.
                const item = document.createElement("div")
                item.innerHTML = `
                <hr>
                <div id="review">
                    <div class="card mt-3" style="border: none">
                        <div class="card-header" style="background-color: #A60842; color: white;">
                            <h5>${results.author}</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">${results.content}</p>
                        </div>
                    </div>
                </div>
                `
        reviews.appendChild(item);
        ;
        })
      })
      .catch(err => {console.log('Error:',err)})
      ;
    
    
};

mostrarDetalle();
mostrarReviews();