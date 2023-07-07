document.addEventListener('DOMContentLoaded', function() {
  var inputField = document.getElementById('inputFieldWB');
  var submitButton = document.getElementById('submitButtonWB');
  var resultDiv = document.getElementById('resultWB');

  // Load the stored array from storage, if available
  chrome.storage.local.get('savedArray', function(data) {
    if (data.savedArray) {
      var savedArray = data.savedArray;
      displayArray(savedArray);
    }
  });

  submitButton.addEventListener('click', function() {
    var inputValue = inputField.value;

    // Retrieve the existing array from storage
    chrome.storage.local.get('savedArray', function(data) {
      var savedArray = data.savedArray || [];

      // Add the new input value to the array
      savedArray.push(inputValue);

      // Save the updated array to storage
      chrome.storage.local.set({ 'savedArray': savedArray }, function() {
        console.log('Array saved to storage: ' + savedArray);
        displayArray(savedArray);
      });

      // Clear the input field after submitting
      inputField.value = '';
    });
  });

  // Function to display the array with delete buttons
  function displayArray(savedArray) {
    resultDiv.innerHTML = '';

    savedArray.forEach(function(element, index) {
      var elementDiv = document.createElement('div');
      elementDiv.textContent = element;

      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', function() {
        // Remove the element from the array
        savedArray.splice(index, 1);
        // Save the updated array to storage
        chrome.storage.local.set({ 'savedArray': savedArray }, function() {
          console.log('Array updated: ' + savedArray);
          displayArray(savedArray);
        });
      });

      elementDiv.appendChild(deleteButton);
      resultDiv.appendChild(elementDiv);
    });
  }
});
