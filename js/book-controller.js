'use strict';

function onInit() {
    _createBooks();
    setPageNumber()
    renderBooks()
}

function renderBooks() {
    // debugger
    var books = getBooks();
    var strHTMLs = books.map(function(book) {

        return `
        <tr class = "rows" id = "row">
            <td class = "id">${book.id}</td>
            <td class = "title">${book.title}</td>
            <td class = "price">${book.price}</td>
            <td class = "rate">${book.rate}</td>
            <td class = "actions">
            <button class="Read" onclick="onReadBook('${book.id}')">Read</button>
            <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
            <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
            </td>
            </tr>`
    })
    var elTableBody = document.querySelector('.table-body')
    return elTableBody.innerHTML = strHTMLs.join('');
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}


function onUpdateBook(bookId) {
    var newBookPrice = +prompt('New Book Price?');
    if (!newBookPrice) return;
    getBookByIdForPrice(bookId, newBookPrice);
    renderBooks();
}

function onAddBook() {
    var title = document.querySelector('.title-input')
    var price = document.querySelector('.price-input')

    if (!title.value || !price.value) return;

    addBook(title.value, price.value);
    renderBooks();
    title.value = '';
    price.value = '';
}

function onReadBook(bookId) {
    _openModal(bookId);
}

function _openModal(bookId) {
    var elModal = document.querySelector('.details-modal');
    _changeModalDetails(bookId);
    setCurrBook(bookId);
    elModal.classList.remove('hide');
    console.log(elModal)
}

function _changeModalDetails(bookId) {

    var elImg = document.querySelector('.book-image');
    var elTitle = document.querySelector('.details-title');
    var elPrice = document.querySelector('.details-price');
    var elRate = document.querySelector('.amount');

    var currBook = gBooks.find(function(book) {
        return book.id === bookId;
    })


    elImg.src = `../img/${currBook.title}.jpg`;
    elTitle.innerText = currBook.title;
    elPrice.innerText = currBook.price;
    elRate.value = currBook.rate
}

function closeModal() {
    var elModal = document.querySelector('.details-modal');
    console.log(elModal)
    elModal.classList.add('hide');
}

function onChangeRate(elBtn) {
    changeRating(elBtn)
    renderBooks()
}

function onNextPage() {
    movePage(1);
    renderBooks();
}

function onSortBy(txt) {
    // debugger
    txt = txt.classList[1];
    setSort({ txt: txt });
    renderBooks();
}