(async function(){

    // Promesa del API

    async function getData(url){
        const response = await fetch(url);
        const data = response.json();

        return data
    }

        const BASE_API = 'https://yts.mx/api/v2/';

        const {data: { movies: actionList } } = await getData(`${BASE_API}list_movies.json?genre=action`);
        const {data: {movies: dramaList } } = await getData(`${BASE_API}list_movies.json?genre=drama`);
        const {data: {movies: thrillerList } } = await getData(`${BASE_API}list_movies.json?genre=thriller`);
        const {data: {movies: comedyList } } = await getData(`${BASE_API}list_movies.json?genre=comedy`);
        const {data: {movies: animationList } } = await getData(`${BASE_API}list_movies.json?genre=animation`);
        

    // Promesa del API


    // Template de las peliculas

        function videoTemplate(movie, category){
            return(
                `<div class="playlist-img-container" data-id="${movie.id}" data-category="${category}" >
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

        function addEventClick($element){
            $element.addEventListener('click', () =>
            showModal($element) );
        }

        function renderMovieList(list, $container, category){

        $container.querySelector('.img').remove();
            list.forEach( (movie) => {

                const HTMLString = videoTemplate(movie, category);
                const movieElement = createTemplate(HTMLString);

                $container.append(movieElement);
                addEventClick(movieElement);
            })
        }

        const $actionListContainer = document.getElementById('action');
        renderMovieList(actionList, $actionListContainer, 'action');

        const $dramaListContainer = document.getElementById('drama');
        renderMovieList(dramaList, $dramaListContainer, 'drama');

        const $thrillerListContainer = document.getElementById('thriller');
        renderMovieList(thrillerList, $thrillerListContainer, 'thriller');

        const $comedyListContainer = document.getElementById('comedy');
        renderMovieList(comedyList, $comedyListContainer, 'comedy');
        
        const $animationListContainer = document.getElementById('animation');
        renderMovieList(animationList, $animationListContainer, 'animation');



    // Template de las peliculas



    //  Modal
    const $modalOverlay = document.getElementById('modal');
    const $closeModal = document.getElementById('closeModal');
    const $modalDescription = document.getElementById('modal-description-container');


    function findById(list, id){

        return list.find(movie => movie.id === parseInt(id, 10))

    }

    function findMovie(id, category){
        switch (category){
            case 'action' :{
               return findById(actionList, id)
            }

            case 'drama' :{
              return findById(dramaList, id)
            }

            case 'thriller': {
               return findById(thrillerList, id)
            }

            case 'comedy': {
                return findById(comedyList, id)
            }

            default :{
                return findById(animationList, id)
            }
        }
    }


    const $titleMovie = document.getElementById('title-movie');
    const $movieDescription = document.getElementById('movie-description');
    const $movieImg = document.getElementById('movie-img');
    const $smallDescription= document.getElementById('small-description');

    function showModal($element){
        $modalOverlay.classList.add('active');
        $modalDescription.classList.add('active');
        $modalDescription.style.animation = "modalIn .8s forwards"

        $closeModal.addEventListener('click', () => $modalOverlay.classList.remove('active'));

        const id = $element.dataset.id;
        const category = $element.dataset.category; 
        const data = findMovie (id, category)

        $titleMovie.textContent = data.title;  
        $movieDescription.textContent = data.description_full;
        $movieImg.setAttribute('src', data.medium_cover_image);

    }

    $closeModal.addEventListener('click', closeModal);
    function closeModal(){
        $modalOverlay.classList.remove('active');
    }


    //  Modal

    
    // Searcher

    const $form = document.getElementById('form');
    const $searcher = document.getElementById('searcher');
    const $closeSearcherHeader = document.getElementById('header');
    const $closeSearcherBody = document.getElementById('movies');


    function setAttribures($element, attributes){
        for (const attribute in attributes){
            $element.setAttribute(attribute, attributes[attribute]);
        }
    }

    function formTemplate(movie){
        return(
            `
            <div class="searcher-container">
                <h2>Movie Found:</h2>
                <h3 class="search-movie-title">${movie.title}</h3>
                <picture class="search-img-container">
                    <img class="search-picture" src="${movie.medium_cover_image}" alt="Search image">
                    <img class="star-icon" src="img/star.png" alt="">
                    <figcaption>Rating: ${movie.rating}</figcaption> 
                </picture>
                <small>Duration: ${movie.runtime}</small>
                <small>Year: ${movie.year}</small>
                <a href="#">Watch trailer</a>
            </div>
            `
        )
    }

    $form.addEventListener('submit', async (event) =>{
        event.preventDefault();
        $searcher.classList.add('active');
        $searcher.style.animation = "searchIn .8s forwards"

        const $loader = document.createElement('img');
        setAttribures($loader, {
            src: 'img/loader.gif',
            height: 100,
            width: 100,
        })

        $searcher.append($loader)

        const data = new FormData($form);
        const movie = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)

        const HTMLString = formTemplate(movie.data.movies[0]);
        $searcher.innerHTML = HTMLString
        

        $closeSearcherHeader.addEventListener('click', () => $searcher.style.animation = "searchOut .8s forwards");
        $closeSearcherBody.addEventListener('click', () => $searcher.style.animation = "searchOut .8s forwards");

    })

    // Searcher

 })()
