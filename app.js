// This data is derived from the json file contents.
// In the future we'll learn how to import this from a file.

// This is our "state" container for this app
let data = [
  {
    callsign: "N4XAE",
    frequency: 14.252,
    mode: "SSB",
    timestamp: "2021-04-23T18:25:43.511Z",
  },
  {
    callsign: "KN4QNT",
    frequency: 14.1,
    mode: "SSB",
    timestamp: "2021-04-23T18:37:11.211Z",
  },
  {
    callsign: "K1JT",
    frequency: 14.078,
    mode: "FT8",
    timestamp: "2021-04-24T09:08:19.154Z",
  },
  {
    callsign: "N4XAE",
    frequency: 14.078,
    mode: "FT8",
    timestamp: "2021-04-24T09:11:42.123Z",
  }
];

/**
 * Output a contact list to the screen.
 * @param {object[]} contacts An array of contacts to output
 */
let outputContacts = (contacts) => {

  // Get a reference to the contact list table
  let list = document.getElementById("contact-list");

  // Clear out existing content in the table
  list.innerHTML = '';

  // For each contact in our data
  for (let i = 0; i < contacts.length; i++) {
  
    // Convert the ISO 8601 formatted string to a native Date object
    // This lets us format it appropriately for display
    const timestamp = new Date(contacts[i].timestamp);

    // Create a row and bulk load the HTML in as a string
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <tr>
        <td>${timestamp.toLocaleDateString('en-US')}</td>
        <td>${timestamp.toLocaleTimeString('en-US')}</td>
        <td>${contacts[i].callsign}</td>
        <td class="d-none d-md-table-cell">${contacts[i].frequency}</td>
        <td class="d-none d-md-table-cell">${contacts[i].mode}</td>
      </tr>
    `;

    // Create the td to hold the button programmatically
    const buttonTd = document.createElement('td');

    // Create and format the button programmatically
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-dark', 'btn-sm', 'delete-contact');
    button.attributes.type = 'button';
    button.innerText = 'Delete';

    // This click listener will delete the appropriate data entry
    // Since we are inside a loop at this point, we give it the correct 'i' value
    button.addEventListener('click', () => {
      console.log('button clicked, removing id ' + i);
      data.splice(i, 1); // Trims one element from the array at location 'i'

      // Redraw the contacts after the data is deleted
      outputContacts(data);
    });

    // Add the button to the buttonTd
    buttonTd.appendChild(button);

    // Add the buttonTd to the end of the row
    tr.appendChild(buttonTd);

    // Finally, append the row we've built up to the parent element
    list.appendChild(tr);
  }
}

// Draw the contacts initially
outputContacts(data);

/**** Form submit listener ****/

// Listen for new contacts and add them to the data
const form = document.getElementById('new-contact');
form.addEventListener('submit', (event) => {

  // Build a new contact object
  const newContact = {
    callsign: document.getElementById('callsign').value,
    frequency: document.getElementById('frequency').value,
    mode: document.getElementById('mode').value,
    timestamp: new Date().toISOString()
  };

  // Push the new contact into the data array
  data.push(newContact);

  // Redraw the contacts after a new one is submitted
  outputContacts(data);

  // Tell the form not to submit as normal
  event.preventDefault();
  event.stopPropagation();
});