$(document).ready(function() {
  $('form').on('submit', function(event) {
    event.preventDefault()
    $.ajax({
      url: '/shorten_link',
      method: 'post',
      data: $(this).serialize(),

      success: function(data) {
        console.log(data)
        res = JSON.parse(data)
     
        $('#error').fadeOut()
        
        tocopy = "http://mybitly88.herokuapp.com/" + res.short_url
        $('<span>YOUR SHORTEN LINK : </span><span style="border: 2px solid gray;padding: 0px 20px;font-size:20px;background-color:#000"><a onclick="clickCounter()" href="' + res.short_url + '" target="_blank">http://mybitly88.herokuapp.com/' + res.short_url + '</a></span><button class="btn btn-info btn-xs" onclick="copyToClipboard(tocopy)">Copy Link</button>').hide().appendTo('#show').fadeIn(1000);
      },

      error: function(data) {
      	$('#error').html(data.responseText)
      }
    })
  })
  
  //attach click event onto a href links (inside table)
  $('#tbody td:nth-child(2) a').on('click', function(e){
    // ele is the click count td next to the clicked link
    ele = $(e.target).parent().next()
    // current click count + 1
    num = parseInt(ele.text()) + 1 
    // update click count value
    ele.text(num)
  })

    $('#signup').on('submit', function(event) {
    $.ajax({
      url: '/create_user',
      method: 'post',
      data: $(this).serialize(),

      error: function(data) {
      	$('.errorMessages').html(data.responseText)
      }
    })
  })
});

// function clickCounter() {
// 	initial_clicks = parseInt($('#result').html())
//     clicks = initial_clicks + 1
//     $('#result').html(clicks)
// }

function copyToClipboard(elementId) {
	var aux = document.createElement("input");
  // aux.setAttribute("value", document.getElementById(elementId).innerHTML);
  aux.setAttribute("value", elementId);
  document.body.appendChild(aux);
  aux.select();
  document.execCommand("copy");

  document.body.removeChild(aux);

}

$(function() {
    var createAllErrors = function() {
        var form = $(this);
        var errorList = $('ul.errorMessages', form);
        
        var showAllErrorMessages = function() {
            errorList.empty();
            
            //Find all invalid fields within the form.
            form.find(':invalid').each(function(index, node) {

                //Find the field's corresponding label
                var label = $('label[for=' + node.id + ']');

                //Opera incorrectly does not fill the validationMessage property.
                var message = node.validationMessage || 'Invalid value.';
                errorList
                    .show()
                    .append('<li><span>' + label.html() + '</span> ' + message + '</li>');
            });
        };
        
        $('input[type=submit], button', form).on('click', showAllErrorMessages);
        $('input[type=text]', form).on('keypress', function(event) {
            //keyCode 13 is Enter
            if (event.keyCode == 13) {
                showAllErrorMessages();
            }
        });
    };
    
    $('form').each(createAllErrors);
});