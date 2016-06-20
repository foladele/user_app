$(document).ready(function(){
	var userUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/users';

	if (location.pathname === '/'){

		function allUser() {

			$.ajax({
				url: userUrl,
				type: 'GET',
				dataType: 'JSON'
			}).done(function(data){
			//debugger
					var info = $('#users');
					info.children().remove();
					data.users.forEach(function(user){

						var row = '<tr data-id="' + user.id + '" ><td>' + user.first_name + '</td>';
						    row += '<td>' + user.last_name + '</td>';
		            row += '<td>' + user.phone_number + '</td>';
		            row += '<td>'
		            row += '<button class="btn btn-danger delete">DELETE</button>';
		            row += '<button class="btn btn-primary show">SHOW</button>';
		            row += '</td>';
		            row += '</tr>';
		        info.append(row);
				})

			}).fail(function(err) {
				alert('meh- you trouble shoot');
			});

	}

	allUser();

	$(document).on('click', '.delete', function() {
      var id = $(this).closest('tr').data().id;
      deleteUser(id);
    });


    $(document).on('click', '.show', function(){
    	var id = $(this).closest('tr').data().id;
    	location.pathname ='/users/' + id;
    })

    function deleteUser(id) {
      $.ajax({
        url: userUrl + '/' + id,
        type: 'DELETE'
      }).done( function() {
        allUser();
        // debugger
      }).fail( function(err) {

      })
    }

} // root route

var regex = /\/users\/\d+/;
  if(location.pathname.match(regex)) {
  	var panel = $('#panel');
  	var id = panel.data().id;
  	$.ajax({
  		url: userUrl + '/' + id,
  		type: 'GET',
  		dataType: 'JSON'
  	}).done( function(data) { 
  		//debugger
  		var user = data.user;
  		panel.children('#heading').html(user.first_name);

  		var list = $('#user');
  		var firstName = '<li>First Name: ' + user.first_name + '</li>';
  		var lastName = '<li>Last Name: ' + user.last_name + '</li>';
  		var phoneNumber = '<li>Phone Number: ' + user.phone_number + '</li>';

  		list.append(firstName);
  		list.append(lastName);
  		list.append(phoneNumber);

  	});
  }

  $('#new_user').on('submit', function(e){
  	e.preventDefault();
  	// debugger
  	$.ajax({
	  		url: userUrl, 
	  		type: 'POST',
	  		dataType: 'JSON',
	  		data: $(this).serializeArray()
	  	}).done(function(){
	  		location.pathname = '/';
	  	})
  });


});














