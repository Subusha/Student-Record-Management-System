// Retrieve the ID from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Fetch the data for the specific ID
fetch(`/data/${id}`)
  .then(response => response.json())
  .then(data => {
    // Pre-fill the form fields with the existing data
    document.getElementById('id').value = data.SID;
    document.getElementById('fname').value = data.FirstName;
    document.getElementById('lname').value = data.LastName;
    document.getElementById('email').value = data.Email;
    document.getElementById('ncity').value = data.NearCity;
    document.getElementById('course').value = data.Course;
    document.getElementById('guardian').value = data.Guardian;
    
    // Pre-check the subjects checkboxes based on existing data
    const subjects = data.Subjects;
    subjects.forEach(subject => {
      document.getElementById(`chk${subject.toLowerCase()}`).checked = true;
    });
  })
  .catch(error => console.error(error));










document.querySelector('#update-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const updateId = document.querySelector('#id').value;
  const updateFirstName = document.querySelector('#fname').value;
  const updateLastName = document.querySelector('#lname').value;
  const updateEmail = document.querySelector('#email').value;
  const updateNearCity = document.querySelector('#ncity').value;
  const updateCourse = document.querySelector('#course').value;
  const updateGuardian = document.querySelector('#guardian').value;
  
  // Retrieve the selected subjects checkboxes
  const subjects = [];
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  checkboxes.forEach(checkbox => {
    subjects.push(checkbox.value);
  });
  
  const updateData = {
    id: updateId,
    fname: updateFirstName,
    lname: updateLastName,
    email: updateEmail,
    ncity: updateNearCity,
    course: updateCourse,
    guardian: updateGuardian,
    subjects: subjects
  };

  fetch('/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateData)
  })
    .then(function (response) {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Error: ' + response.status);
      }
    })
    .then(function (data) {
      alert(data);
    })
    .catch(function (error) {
      console.error(error);
    });
});
