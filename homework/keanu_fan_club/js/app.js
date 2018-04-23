// Get a reference to the root of the Database
  var messageAppReference = firebase.database()
  // Create a section for messages data in your db
  var messagesReference = messageAppReference.ref('messages')


//code to post messages to firebase database
  $('#message-form').submit(function(event) {
  		event.preventDefault()

  		var message = $('#message').val()

  		messagesReference.push({  //this is where we create the structure of the database's object - what would be columns in a relational db
	    	message: message,
	    	votes: 0,
	    	user: firebase.auth().currentUser.displayName,
		})

  		$('#message').val('') //place empty string in textarea after Post to Board button is pressed
  })




// code to retrieve messages from firebase object (firebase database)
  function getFanMessages() {


    // listens for changes to the `messages` node in the DB
    messageAppReference.ref('messages').on('value', function (results) {
    	$('.message-board').empty()  //empties message board element

      results.forEach(function (msg) {
      	//unwrap data from firebase using .val()
        var message = msg.val().message 
        var votes = msg.val().votes
        var user = msg.val().user
        var id = msg.key //key will be used to update records
        //console.log(message, id) 
        var $li = $('<li>').text(message + ' - ' + user)


        // Create up vote element
		  var $upVoteElement = $('<i class="fa fa-thumbs-up pull-right">')

		  $upVoteElement.on('click', function () {
		    updateMessage(id, ++votes)
		  })

		  // Create down vote element
		  var $downVoteElement = $('<i class="fa fa-thumbs-down pull-right">')

		  $downVoteElement.on('click', function () {
		    updateMessage(id, --votes)
		  })


		  // create delete element
		  var $deleteElement = $('<i class="fa fa-trash pull-right delete"></i>')

		  $deleteElement.on('click', function () {
		    deleteMessage(id)
		  })

		  $li.append($deleteElement)

		  //end of adding delete functionality

		  $li.append($downVoteElement)
		  $li.append($upVoteElement) 
		  $li.append('<div class="pull-right">' + votes + '</div>')

        $('.message-board').append($li)

      })
    })
  }


  function updateMessage (id, votes) {
    // find message whose objectId is equal to the id we're searching with
    var messageReference = messageAppReference.ref('messages/' + id)

    // update votes property
    messageReference.update({
      votes: votes,
    })
  }



function deleteMessage(id) {
    // find message whose objectId is equal to the id we're searching with
    var messageReference = messageAppReference.ref('messages/' + id)   //finds within messages object the id

    messageReference.remove()
  }



// Initialize the FirebaseUI Widget using Firebase.
		  var ui = new firebaseui.auth.AuthUI(firebase.auth())

		  var uiConfig = {
		    callbacks: {
		      signInSuccessWithAuthResult: function() {
		        return false;
		      },
		    },
		    signInOptions: [
		      firebase.auth.EmailAuthProvider.PROVIDER_ID,
		    ],
		  }

		  ui.start('#firebaseui-auth-container', uiConfig)

		 //show and hide HTML elements based on results of authentication
		firebase.auth().onAuthStateChanged(function(user) {
	    if (user) {
	      $('#sign-in-container').hide()
	      $('#message-board-container').show()
	    } else {
	      $('#sign-in-container').show()
	      $('#message-board-container').hide()
	    }
	  })




getFanMessages()


//sign-out code 

 $('#sign-out').click(function() {
    firebase.auth().signOut()
  })