

$.ajax({
    url : "data/grammys.json",
    type : "GET",
    dataType : "json",
    success : function(data) {
        let new_html = "<option value=\"0\" selected disabled>Select a field</option>";
        for( let i = 0; i < data.fields.length; i++ ){
            new_html += `<option value="${data.fields[i].field_id}">${data.fields[i].field}</option>`;
        }
        $("#category_types").append(new_html);
        $("#category_types").on('change', function(event){
            let id = $(this).val();
            let content = "";
            for(  let i = 0; i < data.fields.length; i++ ) {
                if( id == data.fields[i].field_id ) {
                    content += `<h2>${data.fields[i].field}</h2>`;
                    if ( typeof data.fields[i].description !== 'undefined' ){
                        content += `<p class="description">${data.fields[i].description}</p>`;
                    }
                    for( let j = 0; j< data.fields[i].categories.length; j++ ){
                        let winner = data.fields[i].categories[j].winner_id;
                        content += `<h3>${data.fields[i].categories[j].category_name}</h3>`;
                        content += `<ul>`;
                        for( let k = 0; k < data.fields[i].categories[j].nominees.length; k++ ){
                            if( k == winner ){
                                content += `<li><i><h4 class="winner">${data.fields[i].categories[j].nominees[k].nominee}</h4><h4>          WINNER!</h4></i></li>`;
                            } else{
                                content += `<li><h4>${data.fields[i].categories[j].nominees[k].nominee}</h4></li>`;
                            }
                            content += `<p>${data.fields[i].categories[j].nominees[k].artist}</p>`;
                            content += `<p>${data.fields[i].categories[j].nominees[k].info}</p>`;
                        }
                        content += "</ul>"
                        if( j != data.fields[i].categories.length - 1 ){
                            content += "<hr>"
                        }

                    }
                }
            }
            $('#nominees_section').html(content);
        });
    },
    error : function(error_msg) {
        console.log(error_msg)
    }
})
