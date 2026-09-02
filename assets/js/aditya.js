/*!
 * Aditya Prayitno — Personal Portfolio
 * 2026 Aditya Prayitno. All rights reserved.
 */

// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// protfolio filters
$(window).on("load", function() {
    var t = $(".portfolio-container");
    t.isotope({
        filter: "*",
        animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1
        }
    }), $(".filters a").click(function() {
        $(".filters .active").removeClass("active"), $(this).addClass("active");
        var i = $(this).attr("data-filter");
        return t.isotope({
            filter: i,
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        }), !1
    });
});

// portfolio popup with swipe support
$(document).ready(function(){
    if ($.fn.magnificPopup) {
        $('.portfolio-container').magnificPopup({
            delegate: 'a.portfolio-popup',
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1],
                tCounter: '<span class="mfp-counter">%curr% of %total%</span>'
            },
            image: {
                titleSrc: 'title'
            },
            removalDelay: 300,
            mainClass: 'mfp-fade',
            callbacks: {
                elementParse: function(item) { item.src = item.el.attr('href'); }
            }
        });
        // swipe to navigate on mobile
        var startX = 0, endX = 0;
        $(document).on('touchstart', '.mfp-container', function(e){ startX = e.originalEvent.touches[0].clientX; });
        $(document).on('touchend', '.mfp-container', function(e){
            endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) { $.magnificPopup.instance.next(); }
            else if (endX - startX > 50) { $.magnificPopup.instance.prev(); }
        });
    }
});


// contact form Web3Forms handler (landing-page, no DB)
$(document).ready(function(){
    var form = document.getElementById('contact-form');
    var result = document.getElementById('form-result');
    if(form){
        form.addEventListener('submit', function(e){
            e.preventDefault();
            var formData = new FormData(form);
            var object = Object.fromEntries(formData);
            var json = JSON.stringify(object);
            result.style.display = 'block';
            result.innerHTML = 'Sending...';
            result.style.color = '#6c757d';
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: json
            }).then(async function(response){
                var res = await response.json();
                if(response.status === 200){
                    result.innerHTML = '✓ Message sent successfully! I will reply soon via email.';
                    result.style.color = '#28a745';
                    form.reset();
                } else {
                    result.innerHTML = '✗ ' + (res.message || 'Something went wrong. Please try again or contact via WhatsApp.');
                    result.style.color = '#F85C70';
                }
                setTimeout(function(){ result.style.display='none'; }, 6000);
            }).catch(function(){
                result.innerHTML = '✗ Network error. Please try WhatsApp: <a href="https://wa.me/6285155236343" target="_blank">+62 851-5523-6343</a>';
                result.style.color = '#F85C70';
            });
        });
    }
});

// google maps
function initMap() {
// Styles a map in night mode.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.674, lng: -73.945},
        zoom: 12,
        scrollwheel:  false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
}
