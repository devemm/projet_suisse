
    // le preloader


    document.onreadystatechange = function() { 
        if (document.readyState !== "complete") { 
            document.querySelector( 
              "body").style.visibility = "hidden"; 
            document.querySelector( 
              "#loader").style.visibility = "visible"; 
        } else { 
            document.querySelector( 
              "#loader").style.display = "none"; 
            document.querySelector( 
              "body").style.visibility = "visible"; 
        } 
    }; 


// -----------------------

// le lazyload


    let options = {
        root: null,
        rootMargin: '0px',
        threshold: 1
    };

    let lazyload = function(entrees, observeur) {
        entrees.forEach(entree => {
            if (entree.isIntersecting) {
                let urlImage = entree.target.getAttribute('data-img');
                if(urlImage) {
                    entree.target.src = urlImage;
                }
            }
        });
    }

    let observeur = new IntersectionObserver(lazyload, options);

    var lazImage = document.querySelectorAll('[data-img]');


    lazImage.forEach(image => {
    observeur.observe(image);
    });

 
    // ---


    // EXPLORE MAP

    function showMap() {
        document.getElementById("exploreMap").style.display = "block";
        document.getElementById("homepage").style.display = "none";
        document.getElementById("pageDeux").style.display = "none";

    }


    function retourHome() {
        document.getElementById("exploreMap").style.display = "none";
        document.getElementById("homepage").style.display = "block";
        document.getElementById("pageDeux").style.display = "block";
        document.getElementById("contentRa").innerHTML = '';
        document.getElementById("more").style.display = "block";
    }

    // ----

    // function showInfos() {
    //     var pointsMap = document.getElementsByClassName("pointCarte");
        
    // }


    //---------------------------------
    // ZOOM 

    var element = document.querySelector('.mapI');

    // +/-

  var pzm = panzoom(element, 
        {
            maxZoom: 1.3,
            minZoom: 0.3
        }
    );

    // pzm.setMinZoom(0,3); 

    function zoomToo(x,y,ratio) {
        pzm.zoomTo(x,y,ratio);    
    }

    // console.log(pzm.getMaxZoom());
    
    // function refresh(){
    //     window.location.reload();
    // } 

    function resetMapZoom() {
        pzm.zoomAbs(
            700, // initial x position
            400, // initial y position
            0.7  // initial zoom 
          );
    }

    // ----


    // Multiple eventListener 

    var tousPoints = document.querySelectorAll('.pointCarte');

    var infoPopup = document.getElementById("infoPopup");
    
    tousPoints.forEach(item => {
        item.addEventListener('click', popUp => {
            // console.log(item.dataset.popup);
            
            getPopup(item.dataset.popup);

            var pops = document.getElementById("infoPopup");
            pops.style.display = "block";
            pops.setAttribute('data-hidden', 'false')

            // document.getElementById("popup").style.transitionProperty = "top";


        })
      })

      
    function getPopup(index) {
        fetch( 'popups/' + index + '.html?' + Date.now())
        .then(function (response){
            // console.log(response);
            return response.text()
        })
        .then(function (html) {
            // console.log(html)
            var content = document.getElementById("contentPopup");
            content.innerHTML = html;
        })
    }

    // onclick
    function closeIt() {
        //document.getElementById("infoPopup").style.visibility = "hidden";
        document.getElementById("infoPopup").setAttribute('data-hidden', 'true')
    }


    document.getElementById("green").addEventListener("click", function(){
        laCarteRa();

      });


    //   Les fonctions

      function laCarteRa() {

        fetch( 'ra.html?' + Date.now())
        .then(function (response){            
            return response.text()
        })
        .then(function (html) {
            var content = document.getElementById("contentRa");
            content.innerHTML = html;
        })

        document.getElementById("green").style.opacity = "0";
        document.getElementById("more").style.display = "none";
      }

