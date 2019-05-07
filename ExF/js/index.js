$('#login_button').on('click', function(){
    let emailField = document.getElementById("email");
    let passwordField = document.getElementById("password");

  json_to_send = {
    "email": emailField.value,
    "password" : passwordField.value
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'https://final-exam-988.herokuapp.com/users/login',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      // guardar token en localstorage o cookie
      localStorage.setItem('token', data.token)
      window.location = './todo.html'
    },
    error: function(error_msg) {
      alert((error_msg["responseText"]));
    }
  });
})
