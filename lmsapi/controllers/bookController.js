const Book = require("../models/Book");
exports.addBook = async (req, res) => {
  try {
    const { name } = req.body;
    const bookTakenDate = new Date();
    const bookReturnDate = new Date(bookTakenDate.getTime() + 60 * 60 * 1000);
    const book = await Book.create({
      name,
      bookTakenDate,
      bookReturnDate,
      status: "taken",
      fine: 0,
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Failed to add book" });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const actualReturnDate = new Date();
    const book = await Book.findByPk(bookId);
    if (!book || book.status === "returned") {
      return res
        .status(404)
        .json({ error: "Book not found or already returned" });
    }
    const timeDifference =
      (actualReturnDate - book.bookTakenDate) / (1000 * 60 * 60);
    let fine = 0;
    if (timeDifference > 1) {
      fine = Math.ceil(timeDifference - 1) * 10;
    }
    await book.update({
      status: "returned",
      bookReturnDate: actualReturnDate,
      fine,
    });
    res.json({
        message:'Book returned Successfully',
        bookId:book.id,
        fine,
        bookReturnDate:actualReturnDate,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update book return status" });
  }
};
exports.getReturnedBooks = async (req, res) => {
  try {
    const returnedBooks = await Book.findAll({ where: { status: "returned" } });
    res.json(returnedBooks);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve returned books" });
  }
};
exports.getTakenBooks = async (req, res) => {
  try {
    const takenBooks = await Book.findAll({
      where: {
        status: "taken",
      },
    });

    res.json(takenBooks);
  } catch (error) {
    console.error("Error fetching taken books:", error);
    res.status(500).json({ error: "Failed to fetch taken books" });
  }
};
