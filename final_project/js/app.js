// Get a reference to the root of the Database
var database = firebase.database()
// Create a section for messages data in your db
var entries = database.ref('entries')

//code to post messages to firebase database
$('#entry-form').submit(function(event) {
		event.preventDefault()

		var entry = $('#entry').val()
    console.log(entry)

		entries.push({  
    	entry: entry,
    	user: firebase.auth().currentUser.displayName,
	})

		$('#entry').val('') //place empty string in textarea after Post to Board button is pressed
})


entries.on('value', function (results) {
  $('#list-entries').empty()  //empties message board element

  results.forEach(function (ent) {
    var entry = ent.val().entry
    var user = ent.val().user
    var id = ent.key
    var $li = $('<li>').text(entry + ' - ' + user)

    $('.list-entries').append($li)
  })
})


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
    $('#entry-form').show()
    $('#inspirationSideBar').show()
    $('#signIn-container').hide()
    $('#list-of-entries').show()
    $('#journal').show()
  } else {
    $('#entry-form').hide()
    $('#inspirationSideBar').hide()
    $('#signIn-container').show()
    $('#list-of-entries').hide()
    $('#journal').hide()
  }
})