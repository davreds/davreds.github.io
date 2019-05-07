var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}


var todos = document.querySelectorAll("input[type=checkbox]");

function updateTodo(id, completed) {
  // revisen si completed es booleano o string
  json_to_send = {
    "completed" : completed
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
      url: 'http://localhost:3000/todos/' + id,
      // url: 'https://tuapp.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'PATCH',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log("UPDATE!!")
      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
}


function loadTodos() {
  $.ajax({
    url: 'https://final-exam-988.herokuapp.com/todos',
    headers: {
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
    },
    method: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data)

      let finished = document.getElementById('finished-list')
      let unfinished = document.getElementById('unfinished-list')
      finished.innerHTML = ''
      unfinished.innerHTML = ''
      for( let i = 0; i < data.length; i++) {
        console.log(data[i])
        addTodo(data[i]._id, data[i].description, data[i].completed, i)
      }
    },
    error: function(error_msg) {
      alert((error_msg['responseText']));
    }
  });
}

loadTodos()


// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener('keypress', function (event) {
  if (event.charCode === 13) {
    json_to_send = {
      "description" : input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: 'https://final-exam-988.herokuapp.com/todos',
      headers: {
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token
      },
      method: 'POST',
      dataType: 'json',
      data: json_to_send,
      success: function(data){
        console.log(data)

      },
      error: function(error_msg) {
        alert((error_msg['responseText']));
      }
    });
    input.value = '';
  }
  loadTodos()
})

function addTodo(id, todoText, completed,count) {
    if(completed){
        let finished = document.getElementById('finished-list')
        finished.innerHTML += '<li><input type="checkbox" name="todo" value="'+count+'" id="'+id+'"><span class="done">'+todoText+'</span></li>\n'
    } else{
        let unfinished = document.getElementById('unfinished-list')
        unfinished.innerHTML += '<li><input type="checkbox" name="todo" value="'+count+'" id="'+id+'"><span>'+todoText+'</span></li>\n'
    }
}
