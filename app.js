const form = document.querySelector(".form");
const inputs = document.querySelectorAll("input");
const button = document.querySelector(".btn");
const table = document.querySelector(".table");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = inputs[0].value;
  const author = inputs[1].value;
  const price = inputs[2].value;

  if (title && author && price) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${title}</td>
    <td>${author}</td>
    <td>$${price}</td>
    <td>
    <button class="btn btn-danger btn-sm delete">Delete</button>
    <button class="btn btn-success btn-sm edit">Edit</button>
    </td>
    `;
    table.appendChild(tr);
    form.reset();
  } else {
    alert("Please fill in all fields");
  }
});

table.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
  }
});

// define this variable outside of the event to keep track of the currently editing row
let currentEditingRow = null;
table.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    // assign the current row to the variable
    currentEditingRow = e.target.parentElement.parentElement;
    inputs[0].value = currentEditingRow.children[0].textContent;
    inputs[1].value = currentEditingRow.children[1].textContent;
    inputs[2].value = currentEditingRow.children[2].textContent.replace(
      /^\$/,
      ""
    ); // remove the dollar sign

    button.removeEventListener("click", update); // Remove the previous listener to ensure only one is active
    button.addEventListener("click", update); // Add the listener for the update function
  }
});

function update() {
  const title = inputs[0].value;
  const author = inputs[1].value;
  const price = inputs[2].value;

  if (title && author && price) {
    currentEditingRow.children[0].textContent = title;
    currentEditingRow.children[1].textContent = author;
    currentEditingRow.children[2].textContent = `$${price}`;
    form.reset(); // Reset the form after updating the row
    currentEditingRow = null; // Reset the currentEditingRow variable
  } else {
    alert("Please fill in all fields");
  }
  button.removeEventListener("click", update); // Remove the event listener after updating
}
