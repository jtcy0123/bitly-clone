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
        $('#long_link').html($('<td>').append($('*', '#long_link')).html());
        $('#short_link').html($('<td>').append($('*', '#short_link')).html());
        $('#result').html($('<td>').append($('*', '#result')).html());
        $('#long_link').html(res.long_url)
        $('#short_link').html('<a id="to-copy" onclick="clickCounter()" href="' + res.short_url + '" target="_blank">http://mybitly88.herokuapp.com/' + res.short_url)
        $('#result').html(res.click_count)
        // $('tr:first-child').after('<tr><td>' + res.long_url + '</td><td>' + 'http://localhost:9393/' + res.short_url + '</td><td>'+ res.click_count +'</td></tr>')
      }
    })
  })
});

function clickCounter() {
	initial_clicks = parseInt($('#result').html())
    // $('#result').html($('<td>').append($('*', '#result')).html());
    clicks = initial_clicks + 1
    $('#result').html(clicks)
}

function copyToClipboard(elementId) {
	var aux = document.createElement("input");
  aux.setAttribute("value", document.getElementById(elementId).innerHTML);
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