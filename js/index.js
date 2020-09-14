(async function(){

    // Promesa del API

    async function getData(url){
        const response = await fetch(url);
        const data = response.json();

        return data
    }

    // Buscador

    // const $closeModalContainer = document.getElementById('cerrarModal');
    const $form = document.getElementById('form');


    $form.addEventListener('submit', (event) =>{
        event.preventDefault();
        $modalContainer.style.transform = "transitionX(0)";
    })

    // Buscador

        const {data: { movies:actionList} } = await getData('https://yts.mx/api/v2/list_movies.json?genre=action');
        const {data: {movies: dramaList} } = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama');
        const {data: {movies: thrillerList} } = await getData('https://yts.mx/api/v2/list_movies.json?genre=thriller');
        console.log( 'actionList', actionList, 'dramaList', dramaList, 'thrillerList', thrillerList);

    // Promesa del API


    // Template de las peliculas

        function videoTemplate(movie, category){
            return(
                `<div class="playlist-img-container" data-id="${movie.id}" data-category ="${category}" >
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



    // Template de las peliculas



    //  Modal
    const $modalContainer = document.getElementById('modal');
    
    const $closeModal = document.getElementById('closeModal');

    function findById(list, id){
        return list.find(movie => movie.id === parseInt(id, 10))
    }

    function findMovie(id, category){
        switch (category){
            case 'action' :{
               return findById(actionList, id)
            }
            case 'drama' :{
              return  findById(dramaList, id)
            }

            default: {
               return findById(thrillerList, id)
            }
        }
    }

    function showModal($element){
        $modalContainer.classList.add('active');
        $modalContainer.style.animation = "modalIn .8s forwards"
        const id = $element.dataset.id;
        const category = $element.dataset.category; 

         $imgContainer.setAttribute('src', data.medium_cover_image)
         $descriptionContainer = document.getElementById('description');
    }

    $closeModal.addEventListener('click', closeModal);
    function closeModal(){
        $modalContainer.classList.add('active');
        $modalContainer.style.animation = "modalOut .8s forwards"
    }



    //  Modal

    // Hamburguer Menu

    const $hamburguerIcon = document.getElementById("hamburguer-menu")
    const $closeModalheader = document.getElementById('menuClose');
    const $buguerguerMenu = document.getElementById('hamburguerMenu-options-container');

    $hamburguerIcon.addEventListener('click', menuIn);

    function menuIn(){
       $buguerguerMenu.classList.add('active-menu');
       $buguerguerMenu.style.animation = "hamburguerIn .8s forwards";
    };


     $closeModalheader.addEventListener('click', closeMenu);
     function closeMenu(){

         $buguerguerMenu.classList.add('active-menu');
         $buguerguerMenu.style.animation = "hamburguerOut .8s forwards";
    }
    // Hamburguer Menu


 })()
