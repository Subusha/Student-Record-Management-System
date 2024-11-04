$(function() {
  $('#search-form').on('submit', function(event) {
    event.preventDefault();

    const searchOption = $('#search-option').val();
    const searchQuery = $('#search-input').val();

    $.ajax({
      url: '/search',
      method: 'GET',
      data: {
        option: searchOption,
        query: searchQuery
      },
      success: function(data) {
        displaySearchResults(data);
      },
      error: function(error) {
        console.error(error);
        $('#search-results').html('An error occurred during the search.');
      }
    });
  });

  

  function displaySearchResults(results) {
    let html = '';
    if (results.length > 0) {
      html += '<div class="row">';
      results.forEach(function(result) {
        html += '<div class="col-md-4">';
        html += '<div class="card">';
        html += '<div class="card-body">';
        html += '<h5 class="card-title">Student ID: ' + result.SID + '</h5>';
        html += '<p class="card-text"><b>First Name:</b> ' + result.FirstName + '</p>';
        html += '<p class="card-text"><b>Last Name:</b> ' + result.LastName + '</p>';
        html += '<p class="card-text"><b>Email:</b> ' + result.Email + '</p>';
        html += '<p class="card-text"><b>Near City:</b> ' + result.NearCity + '</p>';
        html += '<p class="card-text"><b>Course:</b> ' + result.Course.join(', ') + '</p>';
        html += '<p class="card-text"><b>Guardian:</b> ' + result.Guardian + '</p>';
        html += '<p class="card-text"><b>Subjects:</b> ' + result.Subjects.join(', ') + '</p>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
      });
      html += '</div>';
    } else {
      html += '<p>No results found.</p>';
    }
    $('#search-results').html(html);
  }
  




});
