
$('#signup_button').on('click', function(){
  let emailField = document.getElementById("email");
  let passwordField = document.getElementById("password");
  let ageField = document.getElementById("age");
  let nameField = document.getElementById("name");

  json_to_send = {
    "password" : passwordField.value,
    "email": emailField.value,
    "name": nameField.value,
    "age": parseInt( ageField.value, 10)
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: 'https://final-exam-988.herokuapp.com/users',
    headers: {
        'Content-Type':'application/json'
    },
    method: 'POST',
    dataType: 'json',
    data: json_to_send,
    success: function(data){
      alert("Usuario creado con exito");
      console.log('success: '+ data);
      window.location = './index.html'
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });

});
