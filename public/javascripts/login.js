/**
 * post ajax method for login method
 * @param url
 * @param data
 */
function sendAjaxQuery(url, data) {
    console.log(data);
    $.ajax({
        url: url ,
        data: data,
        dataType: 'json',
        type: 'POST',
        success: function(dataR) {
        //     // no need to JSON parse the result, as we are using
        //     // dataType:json, so JQuery knows it and unpacks the
        //     // object for us before returning it
        //     var ret = dataR;
        //     // in order to have the object printed by alert
        //     // we need to JSON stringify the object
        //     document.getElementById('results').innerHTML= JSON.stringify(ret);
            if (dataR.role === 'user') {
                alert('Dear client ' + dataR.name + ', login successfully!');
                window.location.href = '/';
            } else if (dataR.role === 'admin') {
                alert('Dear admin ' + dataR.name + ', login successfully!');
                window.location.href = '/admin/pet_list_waiting';
            } else {
                alert('Wrong username or password or role, try again');
            }
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

/**
 * ajax post initialiser method, used for login functionality
 */
function login() {
    var formArray= $("form").serializeArray();
    var data={};
    for (index in formArray){
        data[formArray[index].name]= formArray[index].value;
    }
    console.log(data);
    // const data = JSON.stringify($(this).serializeArray());
    sendAjaxQuery('/login', data);
    event.preventDefault();
}
