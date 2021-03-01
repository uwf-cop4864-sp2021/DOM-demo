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
  },
];


let elem = document.querySelector('tbody#contact-list');


for(d of data) {
  const contactDate = new Date(d.timestamp);
  console.log(contactDate);
  elem.innerHTML += `<tr>
  <td>${contactDate.toLocaleDateString('en-US')}</td>
  <td>${contactDate.toLocaleTimeString('en-US')}</td>
  <td>${d.callsign}</td>
  <td class="d-none d-md-table-cell">${d.frequency.toFixed(3)}</td>
  <td class="d-none d-md-table-cell">${d.mode}</td>
  <td><button type="button" class="btn btn-outline-dark btn-sm">Edit</button></td>
  </tr>`;
}