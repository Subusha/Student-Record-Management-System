$(function() {
  // Handle form submission
  $(document).on("submit", "#upload-form", function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Collect form data
    var formData = {
      SID: $("#id").val(),
      FirstName: $("#fname").val(),
      LastName: $("#lname").val(),
      Email: $("#email").val(),
      NearCity: $("#ncity").val(),
      Course: [$("#course").val()],
      Guardian: $("#guardian").val(),
      Subjects: getSelectedSubjects()
    };

    // Send AJAX request to the server
    $.ajax({
      type: "POST",
      url: "/submit",
      data: JSON.stringify(formData),
      contentType: "application/json",
    })
      .done(function(response) {
        // Handle success response
        console.log("Form data submitted successfully!");
        alert("Data Submitted SuccessFully !!!");
        // Clear form fields
        $("#upload-form")[0].reset();
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        // Handle error response
        console.error("Error submitting form data: " + errorThrown);
        alert("Error submitting form data: " + errorThrown);
      });
  });

  // Get selected subjects
  function getSelectedSubjects() {
    var subjects = [];
    $(".form-check-input:checked").each(function() {
      subjects.push($(this).next().text());
    });
    return subjects;
  }
});
