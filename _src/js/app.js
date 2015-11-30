// App Script
(function($) {

  $(document).ready(function(){

    // Initialize Parse with your Parse application & javascript keys
    Parse.initialize("iMjNMIuFn4JVT1zmAyrmC6dMU7mTWpRj7NR9rhkP", "0yXGXWN2eqg7mObIsMFgYvQk4gyqUyBJicort2Yi");

    // Setup the form to watch for the submit event
    $('.contact-form form').submit(function(e){
      e.preventDefault();

      // Grab the elements from the form to make up
      // an object containing name, email and message
      var data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      }

      // Run our Parse Cloud Code and
      // pass our 'data' object to it
      Parse.Cloud.run("sendEmail", data, {
        success: function(object) {
          $('#form-response').html('Email sent!').addClass('success').fadeIn('fast');
        },

        error: function(object, error) {
          console.log(error);
          $('#form-response').html('Error! Email not sent!').addClass('error').fadeIn('fast');
        }
      });
    });

  });

})(jQuery);
