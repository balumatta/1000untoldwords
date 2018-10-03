//-----------------------------------------------------------------------------------------------//

/* Custom AJAX POST method to avoid http 403 as csrf token needs to be copied before sending the request
 Use this method to POST data (in case you arent using form for the post)
 Inputs: url > same domain url
        data > no string, only JSON Object
        success > a function which provides as a return point if POST is a success
        error > a function which provides as a return point if POST is a failure
 e.g:post_with_csrf("/company/recruiter/apply_for_job/",
                   {'hdnJobPostingId': hdnJobPostingId},
                   function(json) {
                        showNotification(json.message);
                    },
                    function(xhr,errmsg,err) {
                        console.log(xhr.status + ": " + xhr.responseText);
                    });
*/
function post_with_csrf(url, data, success, error){
    $.ajax({
        url : url,
        type : "POST",
        dataType: "json",
        data : JSON.stringify(data),
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
        },
        success : success,
        error : error
    });
};

function get_with_csrf(url, success, error){
    $.ajax({
        url : url,
        type : "GET",
        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
        },
        success : success,
        error : error
    });
};

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};


//-----------------------------------------------------------------------------------------------//
$(document).ready(function() {
    // Display alerts when lpage loads, if any
    if($('#alertMessage').length > 0) {
        $.notify({
            // options
            icon: 'glyphicon ' + $('#alertIcon').val(),
            message: $('#alertMessage').val(),
            target: '_blank'
        },{
            // settings
            type: $('#alertMessageType').val(),
            z_index: 10000,
            delay: 5000,
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
        });
    };
});