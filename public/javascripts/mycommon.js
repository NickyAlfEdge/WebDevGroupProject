'use strict';

/**
 * form data to json
 * @param form jQuery object form
 */
function formDataToJson(form) {
    const formArr = form.serializeArray();
    const json = {};
    for (const element of formArr) {
        json[element['name']] = element['value'];
    }
    return json;
}

/**
 * send json request
 * @param url
 * @param data  json
 */
function sendAjaxJsonQuery(url, data) {
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: 'POST',
        contentType: 'application/json',
        success: function(result) {
            alert(JSON.stringify(result));
            return result;
        },
        error: function(xhr, status, err) {
            alert(JSON.stringify(err));
            return err;
        },
    });
}

/**
 * back to top method, used for the back to top bottom functionality located on
 * the page footer
 * @param ele
 */
function backToTop(ele) {
    console.log('backto top');
    // Make sure this.hash has a value before overriding default behavior
    // Prevent default anchor click behavior
    event.preventDefault();
    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
        scrollTop: 0,
    }, 800, function() {
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = '';
    });
}
