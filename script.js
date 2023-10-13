document.addEventListener("DOMContentLoaded", function () {
  const passwords = document.querySelector('.passwords');
  const inputForm = document.querySelector('.input-form');
  const submit = document.getElementById('submit');

  // Load saved passwords from localStorage
  const savedPasswords = JSON.parse(localStorage.getItem('passwords')) || [];

  // Function to display passwords and store them in localStorage
  function displayPasswords() {
    const table = passwords.querySelector('table');
    table.innerHTML = '<tr><th>Username</th><th>Website</th><th>Password</th><th>Deletion</th></tr>';

    savedPasswords.forEach((password, index) => {
      const newRow = table.insertRow(-1);
      const cell1 = newRow.insertCell(0);
      const cell2 = newRow.insertCell(1);
      const cell3 = newRow.insertCell(2);
      const cell4 = newRow.insertCell(3);

      cell1.innerHTML = password.username;
      cell2.innerHTML = password.website;

      // Create a span element to display stars for the password
      const passwordSpan = document.createElement('span');
      passwordSpan.textContent = '*'.repeat(password.password.length);
      cell3.appendChild(passwordSpan);

      // Create copy icons for each cell
      const copyIconUsername = document.createElement('img');
      const copyIconWebsite = document.createElement('img');
      const copyIconPassword = document.createElement('img');

      copyIconUsername.src = 'copy.svg';
      copyIconWebsite.src = 'copy.svg';
      copyIconPassword.src = 'copy.svg';

      copyIconUsername.title = 'Copy Username';
      copyIconWebsite.title = 'Copy Website';
      copyIconPassword.title = 'Copy Password';

      // Add click event listeners to copy icons
      copyIconUsername.addEventListener('click', () => {
        copyToClipboard(password.username);
      });

      copyIconWebsite.addEventListener('click', () => {
        copyToClipboard(password.website);
      });

      copyIconPassword.addEventListener('click', () => {
        copyToClipboard(password.password);
      });

      cell1.appendChild(copyIconUsername);
      cell2.appendChild(copyIconWebsite);
      cell3.appendChild(copyIconPassword);

      // Create a delete button for each row
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function () {
        // Remove the row when the delete button is clicked
        savedPasswords.splice(index, 1);
        localStorage.setItem('passwords', JSON.stringify(savedPasswords));
        displayPasswords();
      });
      cell4.appendChild(deleteButton);
    });
  }

  displayPasswords(); // Display existing passwords

  submit.addEventListener('click', () => {
    // Get input values
    const username = document.getElementById('Username').value;
    const website = document.getElementById('Website').value;
    const password = document.getElementById('Password').value;

    if (username && website && password) {
      // Save the new password
      savedPasswords.push({ username, website, password });
      localStorage.setItem('passwords', JSON.stringify(savedPasswords));
      displayPasswords(); // Update the table
    }
  });

  // Function to copy text to the clipboard
  function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert(`Copied: ${text}`);
  }
});