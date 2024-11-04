const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use('/css', express.static(path.join(__dirname,'node_modules','bootstrap','dist','css')));
app.use('/js', express.static(path.join(__dirname,'node_modules','bootstrap','dist','js')));
app.use('/jquery', express.static(path.join(__dirname,'node_modules','jquery','dist')));





// Post request

// Post request
app.post("/submit", (req, res) => {
  // Get form data from the request
  const formData = req.body;

  // Read the existing data from data.json
  const dataFilePath = path.join(__dirname, "data.json");
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data.json: " + err);
      return res.status(500).send("Server error");
    }

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseError) {
      console.error("Error parsing data.json: " + parseError);
      return res.status(500).send("Server error");
    }

    // Add the new form data to the JSON array
    jsonData.push(formData);

    // Write the updated data back to data.json
    fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2), err => {
      if (err) {
        console.error("Error writing to data.json: " + err);
        return res.status(500).send("Server error");
      }

      // Send success response
      res.send("Form data submitted successfully!");
    });
  });
});




  

  // Get json data to display

app.get('/data', (req, res) => {
  fs.readFile(path.join(__dirname, 'data.json'), (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    } else {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    }
  });
});




// Put request
app.put('/update', (req, res) => {
  const updateData = req.body;
  const dataFilePath = path.join(__dirname, 'data.json');

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }

    let parsedData = [];
    if (data) {
      try {
        parsedData = JSON.parse(data);
      } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
      }
    }

    const updatedData = parsedData.map(entry => {
      if (entry.SID === updateData.id) {
        entry.FirstName = updateData.fname;
        entry.LastName = updateData.lname;
        entry.Email = updateData.email;
        entry.NearCity = updateData.ncity;
        entry.Course = [updateData.course];
        entry.Guardian = updateData.guardian;
        entry.Subjects = updateData.subjects;

      }
      return entry;
    });

    fs.writeFile(dataFilePath, JSON.stringify(updatedData), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
      }
      res.status(200).send('Data updated successfully');
    });
  });
});






// GET request for specific data by ID
app.get('/data/:id', (req, res) => {
  const id = req.params.id;
  const dataFilePath = path.join(__dirname, 'data.json');

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }

    let parsedData = [];
    if (data) {
      try {
        parsedData = JSON.parse(data);
      } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
      }
    }

    const entry = parsedData.find(obj => obj.SID === id);
    if (entry) {
      res.json(entry);
    } else {
      res.status(404).send('Entry not found');
    }
  });
});








// DELETE request to delete data
app.delete('/data/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data file!');
    } else {
      const jsonData = JSON.parse(data);
      const updatedData = jsonData.filter(obj => obj.SID !== id);
      fs.writeFile('data.json', JSON.stringify(updatedData), err => {
        if (err) {
          console.error(err);
          res.status(500).send('Error writing data file!');
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});






// GET request for search 

app.get('/search', (req, res) => {
  const searchOption = req.query.option;
  const searchQuery = req.query.query;
  const dataFilePath = path.join(__dirname, 'data.json');

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Internal server error');
    }

    let parsedData = [];
    if (data) {
      try {
        parsedData = JSON.parse(data);
      } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
      }
    }

    const searchResults = parsedData.filter(entry => {
      const fieldValue = entry[searchOption];
      if (Array.isArray(fieldValue)) {
        return fieldValue.includes(searchQuery);
      }
      return fieldValue === searchQuery;
    });

    res.status(200).json(searchResults);
  });
});





const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});