// Hamburguer Menu

const $hamburguerIcon = document.getElementById("hamburguer-menu")
const $closeHeader = document.getElementById('menuClose');
const $buguerguerMenu = document.getElementById('hamburguerMenu-options-container');
const $closeHamburguerMenu= document.getElementById('close-hamburguerMenu');

$hamburguerIcon.addEventListener('click', menuIn);

function menuIn(){
   $buguerguerMenu.classList.add('active-menu');
   $hamburguerIcon.style.display = "none";
   $closeHamburguerMenu.style.display= "flex";
   $buguerguerMenu.style.animation = "hamburguerIn .3s forwards";


   $closeHamburguerMenu.addEventListener('click', () =>{
    $hamburguerIcon.style.display = "flex";
    $closeHamburguerMenu.style.display= "none";
    $buguerguerMenu.style.animation = "hamburguerOut .3s forwards";
   });
};

$closeHeader.addEventListener('click', closeMenu);
function closeMenu(){
    $hamburguerIcon.style.display = "flex";
    $closeHamburguerMenu.style.display= "none";
    $buguerguerMenu.style.animation = "hamburguerOut .3s forwards";
    $notificationBellContainer.classList.remove('active')
}
// Hamburguer Menu

// Notification bell

const $notificationBell = document.getElementById('notification-bell');
const $notificationBellContainer = document.getElementById('notification-bell-container');

$notificationBell.addEventListener('click', () => $notificationBellContainer.classList.toggle('active') );


// Notification bell