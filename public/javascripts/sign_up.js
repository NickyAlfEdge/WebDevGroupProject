/**
 * ajax post method for sign-up/register functionality
 */
$(function() {
    $('#signUpForm').submit(function() {
        event.preventDefault();
        const json = formDataToJson($('#signUpForm'));
        $.ajax({
            url: '/users/signUp',
            data: JSON.stringify(json),
            type: 'POST',
            contentType: 'application/json',
            success: function(result) {
                alert(result.message);
                location.href = '/';
            },
            error: function(xhr, status, err) {
                alert(xhr.responseJSON.message);
            },
        });
    });
});
