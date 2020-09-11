(async function(){

    // Promesa del API
    
    async function getData(url){
        const response = await fetch(url);
        const data = response.json();

        return data
    }

    // Buscador

    const $form = document.getElementById('form');

    $form.addEventListener('submit', (event) =>{
        event.preventDefault();
    })

    // Buscador

        const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action');
        const dramaList = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama');
        const thrillerList = await getData('https://yts.mx/api/v2/list_movies.json?genre=thriller');
        console.log( 'actionList', actionList, 'dramaList', dramaList, 'thrillerList', thrillerList);
    
    // Promesa del API

    
    // Template de las peliculas
        
        function videoTemplate(movie){
            return(
                `<div class="playlist-img-container">
                    <figure class="img-container">
                        <img class="img-movie" src="${movie.medium_cover_image}" alt="">
                    </figure>
                    <h4 class="movie-title">${movie.title}</h4>
                </div>`
            )
        }


        function createTemplate(HTMLString){
            const html = document.implementation.createHTMLDocument();
            html.body.innerHTML = HTMLString;

            return html.body.children[0]
        }

        function addEventClick(event){
            event.addEventListener('click', () =>
            alert('qlq'));
        }

        function renderMovieList(list, $container){
        
        $container.querySelector('.img').remove();
            list.forEach( (movie) => {
  
                const HTMLString = videoTemplate(movie);
                const movieElement = createTemplate(HTMLString);
                
                $container.append(movieElement);
                addEventClick(movieElement);
            })
        }
        

        const $actionListContainer = document.getElementById('action');
        renderMovieList(actionList.data.movies, $actionListContainer);

        const $dramaListContainer = document.getElementById('drama');
        renderMovieList(dramaList.data.movies, $dramaListContainer);

        const $thrillerListContainer = document.getElementById('thriller');
        renderMovieList(thrillerList.data.movies, $thrillerListContainer);


    // Template de las peliculas



// Posible Modal         const $modalContainer = document.getElementById('modal');
//         const $imgContainer = document.getElementById('img');
//         const $descriptionContainer = document.getElementById('description');
 })()