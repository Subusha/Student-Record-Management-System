const tableBody = document.getElementById("table-body");

// Fetch the data from the JSON file using Fetch API
fetch('/data')
  .then(response => response.json())
  .then(data => {
    // Loop through the data and create a row for each object
    data.forEach(obj => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${obj.SID}</td>
        <td>${obj.FirstName}</td>
        <td>${obj.LastName}</td>
        <td>${obj.Email}</td>
        <td>${obj.NearCity}</td>
        <td>${obj.Course.join(", ")}</td>
        <td>${obj.Guardian}</td>
        <td>${obj.Subjects.join(", ")}</td>
        <td><button type="button" class="btn btn-danger" data-id="${obj.SID}">Delete</button></td>
        <td><button type="button" class="btn btn-success" data-id="${obj.SID}" onclick="updateEntry('${obj.SID}')">Update</button></td>
      `;
      tableBody.appendChild(row);
    });
  })
  .catch(error => console.error(error));

// Function to update the entry
function updateEntry(id) {
  // Redirect to the update.html page with the ID as a query parameter
  window.location.href = `/update.html?id=${id}`;
}

// Delete
tableBody.addEventListener('click', function(event) {
  if (event.target.classList.contains('btn-danger')) {
    const id = event.target.dataset.id;

    fetch('/data/' + id, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          const row = event.target.closest('tr');
          row.remove();
          alert(`Student with the SID ${id} has been deleted successfully!`);
        } else {
          throw new Error('Error deleting user!');
        }
      })
      .catch(error => {
        console.error(error);
        alert('Error deleting user!');
      });
  }
});
