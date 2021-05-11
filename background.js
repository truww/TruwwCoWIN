
(async () => {
  var age = "18+";
  var paid = true;
  var search_frequency = 60;

  search_count = 0;
  function checkSlots(){
      if (  $('.district-search').length == 0 ) { 
        console.log("Unable to search. Will check again after 1 minute.")
        $( '#truww_cowin' ).html("Truww COWIN is unable to search!");
        return;
      }
      search_count++;
      $( '#truww_cowin' ).html("Truww COWIN is working! Searched " + search_count + " times.");

      var zero = new Audio("https://cdn.truww.com/no_slots_available.mp3");
      var typeWriter = new Audio("https://cdn.truww.com/slots_available.mp3");
      $('.district-search').click();

      if (paid) {
        $('#c5').click();
        $('#flexRadioDefault7').click();
      }

      var avl_count = 0;
      setTimeout(function(){ 
        $( '.mat-list-item' ).hide();
        $('.row.ng-star-inserted').hide();
        $('.age-limit').each( function( ) {
          console.log("Searching for Age: " + age);
          if ( $(this).html() == "Age " + age ) {
              $(this).parents('.row.ng-star-inserted').show();
              $(this).parents('.mat-list-item').show();
              if( $( this ).parent().parent().find('a').html().trim() != "Booked" && parseInt( $( this ).parent().parent().find('a').html().trim() ) > 5 ) { 
                typeWriter.play(); 
                avl_count++; 
                $(this).parents('.mat-list-item').show();
              } 
          } 
        } );
        if ( avl_count == 0 ) {
//          zero.play();
        }
        console.log( "Slots available at " + avl_count + " locations" ); 
      }, 2000);
  }

  function checkPossibility() {
      var typeWriter = new Audio("https://cdn.truww.com/truww_cowin_intro.mp3");
      if (  $('.district-search').length == 0 ) {
        console.log("Unable to search. To check back after 4 minutes")
        typeWriter.play(); 
        return;
      }
      if ( $('#truww_cowin').data('status') != "active" ) {
        $( "#truww_cowin").data('status', 'active');
        $( '#truww_cowin' ).html("Truww COWIN is working!");
        checkSlots();
        var intervalId = window.setInterval(function(){
            checkSlots()
            console.log("Will check again after "+ search_frequency +" seconds");
        }, search_frequency * 1000);
      }
  }

  if ( $('#truww_cowin').length == 0 ) {
    $('body').append( '<a id="truww_cowin" style="color:white;padding-top: 22px;text-align: center;position: fixed;bottom: 1rem;right: 2rem;width: 6rem;height: 6rem;background: blue;border-radius: 50%;background: #126ee2;box-shadow: 0px 5px 20px #81a4f1;transition: all 0.3s ease;z-index: 1;border-bottom-right-radius: 6px;border: 1px solid #0c50a7;font-size: 11px;">CLICK HERE to Start Truww COWIN Helper</a>' )
  }
  document.querySelector('#truww_cowin').addEventListener('click', function() {
    if ( $('#truww_cowin').data('status') != undefined ) {
      checkSlots();
      return;
    }

    prompt_reply = prompt("Please specify age bracket (Only choose between 18+ and 45+)", "18+");
    if ( prompt_reply == "18+" ) {
      age = "18+";
    } else if ( prompt_reply == "45+" ) {
      age = "45+";
    } else {
      alert( "Invalid Selection. Please try again!" );
      return;
    }

    prompt_reply = prompt("Please specify type of slots (Only choose between Paid and Both)", "Paid");
    if ( prompt_reply == "Paid" ) {
      paid = true;
    } else if ( prompt_reply == "Both" ) {
     paid = false;
    } else {
      alert( "Invalid Selection. Please try again!" );
      return;
    }

    search_frequency = prompt("Please specify search frequency in seconds", "60");

    checkPossibility();
    $('#truww_cowin').data("status", "initiated");
    var intervalId = window.setInterval(function(){
        checkPossibility()
    }, 120000);
  });
  return; 
})()
