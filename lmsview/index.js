document
  .getElementById("addBookForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const bookName = document.getElementById("bookName").value;
    try {
      const response = await fetch("http://localhost:3000/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: bookName }),
      });
      const newBook = await response.json();
    //   alert(`Book "${newBook.name}" added!`);
      loadTakenBooks();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  });
document.getElementById("booksContainer").addEventListener('click',async (event)=>{

    if(event.target.classList.contains("btn-success")){
        
        const bookToReturn =event.target.parentElement;
        const id= bookToReturn.getAttribute("book-id");
        const response = await returnBook(id);
        loadReturnedBooks()
    }
})
function displayTakenBooks(books) {
  const container = document.getElementById("booksContainer"); // Make sure this ID matches your HTML
  container.innerHTML = ""; // Clear existing content

  books.forEach((book) => {
    const fine = calculateFine(book); // Calculate fine
    const card = document.createElement("div");
    card.className = "book-card";
    card.setAttribute("book-id",book.id);
    card.innerHTML = `
        <h3>${book.name}</h3>
        <p>Taken Date: ${new Date(book.bookTakenDate).toLocaleString()}</p>
        <p>Return Date: ${new Date(book.bookReturnDate).toLocaleString()}</p>
        <p>Fine: $${fine}</p>
        <button class='btn btn-success'>Return</button>
      `;
    container.appendChild(card);
  });
}
function calculateFine(book) {
  const currentTime = new Date();
  const takenTime = new Date(book.bookTakenDate);
  const timeDifference = (currentTime - takenTime) / (1000 * 60 * 60); // Time difference in hours

  let fine = 0;
  if (timeDifference > 1) {
    // More than one hour late
    fine = Math.ceil(timeDifference - 1) * 10; // Fine of 10 units for each hour beyond the first
  }

  return fine;
}

async function returnBook(bookId) {
  try {
    const response = await fetch(`http://localhost:3000/api/books/${bookId}/return`, {
      method: "PUT",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    alert(`Book returned successfully! Fine: $${data.fine}`);
    loadTakenBooks(); // Refresh the list of taken books after returning
  } catch (error) {
    console.error("Error returning book:", error);
    alert("Failed to return book");
  }
}

async function loadReturnedBooks() {
  try {
    const response = await fetch("http://localhost:3000/api/books/returned");
    const returnedBooks = await response.json();
    const returnedBooksList = document.getElementById("returnedBooksList");
    returnedBooksList.innerHTML = "";

    returnedBooks.forEach((book) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `Book: ${book.name}, Return Date: ${
        book.bookReturnDate
      }, Fine: ${book.fine || 0}`;

      returnedBooksList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error loading returned books:", error);
  }
}
async function loadTakenBooks() {
  try {
    const response = await fetch("http://localhost:3000/api/books/taken"); // Adjust the endpoint accordingly
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const takenBooks = await response.json();
    displayTakenBooks(takenBooks);
  } catch (error) {
    console.error("Error loading taken books:", error);
  }
}

loadTakenBooks();

loadReturnedBooks();
