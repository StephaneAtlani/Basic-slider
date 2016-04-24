/*
 * Basic jQuery Slider 
 * version : 1
 *
 * Authored by John Cobb
 * http://www.stephaneatlani.com
 * @stephane_atlani
 *
 * Copyright 2016, Stéphane ATLANI
 * License: GNU General Public License, version 3 (GPL-3.0)
 * http://www.opensource.org/licenses/gpl-3.0.html
 *
 */

/*
 * SETUP
 * imageRedim = true/false - If true image in data-image take all width
 * animation = fade/slide - Choise animation typeof
 * slideWidth = int - Choise max-With for your slide
 * slideHeight = int - Choise max-height for you slide
 * slideRatio = int - You can enter your ratio Width/height or use slideWidth/slideHeight
 *                     If you enter your ratio slideHeight is not use
 * StartSlide = int - N° slide to start. dafault 1
 * controlBar = true/false - Display or not controlBar
 * controlPrevNext = true/false - Display or not control previous or next
 * interval = int - Value in ms (3000 equal 3 seconds) If 0 slider dont change automaticly
*/
var imageRedim = true;
var animation = 'fade'
var slideWidth = 750;
var slideHeight = 400; 
var slideRatio = slideWidth/slideHeight;
var StartSlide = 1 ;
var controlBar = true;
var controlPrevNext = true ;
var interval = 3000;

// Variables
var slideCurent = StartSlide;
var nbSlide = $("div[id^='SA-slider-']").length;

/*
 * function user for animation = slide 
 * move slide center to left and right to center
 * 
 * Fonction utilisé lorsque animation = slide
 * Permet l'animation des slide
*/
function  slideMove(slide,preSlide){  
    var responsiveWidth  = $('#SA-slider').outerWidth();
    var responsiveOffSet = $('#SA-slider').offset();
    
    // Move active slide
    // on bouge la slide active
    preSlide.animate({
        left: -responsiveWidth,

        opacity : 0,
    },500,function(){
        preSlide.css({
            left : responsiveWidth + responsiveOffSet.left,
            position : 'absolute',
            display : 'none',
        });
    });
    preSlide.attr('data-active','false');
    slide.attr('data-active','true');
    slide.animate({
        left :  responsiveOffSet.left, 
        opacity : 1,
    });
    slide.css({
        display : 'block',
    });
    
}

/*
 * Display new slide
 * 
 * Affiche la nouvelle slide 
*/
function affiche(slideId){
    
    // Variables
    var slide =  $('#SA-slider-' + slideId );
    var preSlide = $('.SA-slide[data-active="true"]');
    var preSlideID = preSlide.prop('id');
    slideCurent = slideId;

    // If previous and call slide is same dont launch function
    // Si la slide précédente et le suiviant sont identique on ne change rien
    if('SA-slider-'+slideId != preSlideID ){  
        if (animation=='fade'){     
            slide.attr('data-active','true'); 
            preSlide.attr('data-active','false'); 
            preSlide.fadeOut();
            slide.fadeIn();               
        }
        if (animation=='slide'){      
            slideMove(slide,preSlide); 
        }
        
        // Barre de controle
        if(controlBar == true){
            $("li[id^='SA-control-']").removeClass('SA-controlBarLiActive');
            $("#SA-control-"+slideId).addClass('SA-controlBarLiActive');
        }
    }
}

/* RESPONSIVE
 * Update slide position
 * 
 * Met à jour la position des slide
*/
function position(responsiveRatio){
    var responsiveWidth   = $('#SA-slider').outerWidth();
    var responsiveHeight  = $('#SA-slider').outerHeight();
    var responsiveOffSet  = $('#SA-slider').offset();

    $('#SA-slider').css({
            height : responsiveWidth/responsiveRatio,
    });
    
    if (animation=='slide'){
        $('.SA-slide[data-active="false"]').css({
            left : responsiveWidth + responsiveOffSet.left,
        });
        $('.SA-slide[data-active="true"]').css({
            left : responsiveOffSet.left
        });
        
        $("div[id^='SA-slider-']").css({
            position : 'absolute',
            width : responsiveWidth,
            height : responsiveHeight,
            opacity: 0,
        });
    }
    if (animation=='fade'){
        $("div[id^='SA-slider-']").css({
            position : 'absolute',
            left : responsiveOffSet.left,
            width : responsiveWidth,
            height : responsiveHeight,
        });
    }
}

/* 
 * Preparation slide Image background (data-image) and place legend (data-legend)
 * 
 * Prepare les div en ajoutant l'image en arrière plan (data-image) et met la legende (data-legend)
*/
function slidePrep(){
    $("div[id^='SA-slider-']").each(function(index){
        // Image background
        $(this).css({
                backgroundImage : 'url('+$(this).data('image')+')',
        }); 
        if (imageRedim==true){
             $(this).css({
                backgroundSize: '100%',
                backgroundRepeat: 'repeat',
            }); 
        }       
        
        // Legende
        var legend = $(this).data('legend');
       
        if(legend != ''){
             console.log(legend);
            $(this).append('<div class="SA-legend">'+legend+'</div>');
        }         
    });
}

/* 
 * Display controles (round bottom slide)
 * 
 * Affiche les contoles (Rond en dessous de la slide) 
*/
function afficheControls(){
    var i =1;
    $('#SA-controlBar').append('<ul id="SA-controlBarUl"></ul>')
     $("div[id^='SA-slider-']").each(function(index){
         $('#SA-controlBar ul').append('<li class="SA-controls" id="SA-control-'+i+'" data-id="'+i+'"></li>')
         i++;
    });
}

/* 
 * Display controles prev/next 
 * 
 * Affiche les contoles prev/next
*/
function afficheControlPrevNext(){
    $('#SA-controlNext').css({
        display : 'block'
    });
    $('#SA-controlePrev').css({
        display : 'block'
    });
}

/* 
 * When we click on controle Prev/next this function call affiche-() with good ID slide
 * 
 * Quand ont clique  sur le controle prev/next la fonction appel affiche() avec le bon id 
*/
function changeSlidePrevNext(nb){   
    var slideId = slideCurent+nb;
     if(slideId > nbSlide){
         console.log('1');
          affiche(1);
     } else  if(slideId < 1){
         console.log('2');
          affiche(nbSlide);
     } else {
         console.log('3');
         slideId= slideId;
         affiche(slideId);
     }
}

// Lancement des fonctions
$( document ).ready(function() {
    
    
    /* 1- INITIALIZATION
    * Initisizing slides and controls
    * 
    * On initialise les slides et les controles
    */
    position(slideRatio); 
    
    if(controlBar == true){
        afficheControls(); 
    }
    
    if(controlPrevNext == true){
        afficheControlPrevNext();
    }
    
    slidePrep(); // init slides
    

    /*  RESPONSIVE */
    $(window).resize(function() {     
        position(slideRatio); // update les positions
    });
       
     /* 2 - POSITION SLIDES */
     $('#SA-slider').css({
         maxWidth : slideWidth,
         maxHeight : slideWidth/slideRatio,
     });     
     
     /* 3 - FIRST SLIDE
    * Display first slide
    * 
    * On affiche la première slide 
    */
     affiche(StartSlide); 
       
    if (animation=='fade'){
           $("div[id^='SA-slider-']").css({
                display : 'none',
                position: 'absolute',
                opacity: 1,
            });
            
            // If none slide has been loaded then display default slide
            // Si aucun slide est chargé alors on affiche le slide par defaut
            if (typeof preSlideID === 'undefined') {
                 $('#SA-slider-'+StartSlide).css({
                    display: 'block',
                    opacity: 1,
                });
                console.log('fff');
            }
            position(slideRatio); 
    }
    if (animation=='slide'){
        position(slideRatio); 
    }

    /* 4 - LEGENDE
    * When data-legende is used and mouse over slide display text
    * 
    * Quand data-legend est utilisé and que la souris passe sur le slide on affiche le texte
    */
   
    $("div[id^='SA-slider-']").hover(function(){
        $(this).find('.SA-legend').filter(':not(:animated)').animate({
            bottom : 0,
            opacity : 1
        });
        $(this).find('.SA-legend').css({
             display : 'block',
        });
    }, function() {
        $(this).find('.SA-legend').animate({
            bottom : "-20px",
            opacity : 0
         },200,function(){
             $(this).find('.SA-legend').css({
                display : 'none',
             });
         });
         
    });

    /* 5 - CONTROLS
    * Call differents controls
    * 
    * On appale les différents controles 
    */
    $("li[id^='SA-control-']").on('click',function(){
        affiche($(this).data("id"));
    });
    $('#SA-controlePrev').on('click',function(){
        changeSlidePrevNext(-1);
    });
     $('#SA-controlNext').on('click',function(){
        changeSlidePrevNext(1);
    });
    
    /* 6 - INTERVALS
    * Slides change automaticly. var interval set time change
    * 
    * Les slides change automatiquement. la variable interval permet de régler l'espacement
    */
    if(interval != 0){
        setInterval(function(){ 
            changeSlidePrevNext(1);
        }, interval);
    }
    
});