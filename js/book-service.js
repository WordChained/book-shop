'use strict';

const KEY = 'books';
const PAGE_SIZE = 5;
var gPageIdx = 0;

var gBooks;
var gSortBy = {
    title: '',
    price: 0
};
var gBookTitleBank = [
    'Sage Of Silver',
    'Criminal Of The Great',
    'Agents Of The Eclipse',
    'Horses With Wings',
    'Priests And Doctors',
    'Rebels And Gangsters',
    'Disruption Of Utopia',
    'Termination With Pride',
    'Taste Of The Dungeons',
    'Escaping The Universe',
    'Learning Laravel',
    'Beginning with Laravel',
    'Java for Developers'
];



function _createBook(title, price, rate = 0) {

    var book = {
        id: _makeId(),
        title,
        price,
        rate
    }
    return book;
}

function _makeId(length = 4) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function getRandTitle() {

    return gBookTitleBank[getRandomInt(0, gBookTitleBank.length - 1)]
}

function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;

    var books = gBooks.slice(startIdx, startIdx + PAGE_SIZE);

    return books
}

function _createBooks() {
    // debugger
    var books = loadFromStorage(KEY)
    if (!books || !books.length) {
        books = [];
        for (var i = 0; i < 21; i++) {
            books.push(_createBook(getRandTitle(), getRandomInt(5, 100)))
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return book.id === bookId
    })
    if (bookIdx === -1) return;

    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function addBook(title, price) {
    var newBook = _createBook(title, price)
    gBooks.push(newBook)
    _saveBooksToStorage()
}

function getBookByIdForPrice(bookId, bookPrice) {
    var bookIdx = gBooks.findIndex(function(book) {
        return bookId === book.id
    })
    gBooks[bookIdx].price = bookPrice;
    _saveBooksToStorage()
}

function setCurrBook(bookId) {
    var currBook = gBooks.find(function(book) {
        return bookId === book.id
    })
    saveToStorage('currBook', currBook);
}

function changeRating(elBtn) {
    var currBook = loadFromStorage('currBook');
    var elAmount = document.querySelector('.amount')

    if (elBtn.classList.contains(`plus`)) {
        elAmount.value++;
    } else {
        if (elAmount.value === '0') return;
        elAmount.value--;
    }
    var bookIdx = gBooks.findIndex(function(book) {
        return currBook.id === book.id
    })

    gBooks[bookIdx].rate = elAmount.value;
    _saveBooksToStorage()
    console.log(gBooks)
}

function movePage(diff) {
    gPageIdx += diff;
    if (gPageIdx * PAGE_SIZE > gBooks.length) gPageIdx = 0;
    setPageNumber()
}

function setPageNumber() {
    var elPageNumSpan = document.querySelector('.pageCount');
    elPageNumSpan.innerText = (gPageIdx + 1) + '/' + PAGE_SIZE;
}

function setSort(sortBy) {
    gSortBy = sortBy
    sortByTxt(gSortBy.txt)
}

function sortByTxt(text) {

    return gBooks.sort(function(a, b) {
        if (text === 'title') {
            // debugger
            var c = a.title;
            var d = b.title;
            var e = c.localeCompare(d);
            return e
        }
        if (text === 'price') {
            return b.price - a.price
        }
    })
}