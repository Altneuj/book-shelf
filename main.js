var books = null;
var paginator =0;
var lastQuery = null;
var pageCount = 0;

var renderBooks = function(){
  $('.books').empty();


  for (var i =0; i < books.length; i++) {
    var obj = {};
     obj.author = books[i].volumeInfo['authors'];
     obj.title = books[i].volumeInfo['title'];
     if(books[i].volumeInfo.imageLinks !== undefined){
       obj.imageURL = books[i].volumeInfo.imageLinks['thumbnail'];
     } else {
       obj.imageURL = "https://www.entrustdatacard.com/-/media/images/video-thumbnails_images/thumb-not-available.png";
     }
     obj.isbn = books[i].volumeInfo.industryIdentifiers[0].identifier;
     obj.pageCount = books[i].volumeInfo['pageCount'];

    var source = $('#book-template').html();
    var template = Handlebars.compile(source);
    var newHtml = template(obj);

    $('.books').append(newHtml);
    $('.next-page').show();


  }
}

var fetch = function(query) {
  lastQuery = encodeURIComponent(query);
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=" + lastQuery + "&startIndex=" + paginator,
    dataType: "json",
    beforeSend: function() {
      $('#loaderDiv').show();
    },
    success: function (data) {
        $('#loaderDiv').hide();
      addBooks(data);
      console.log("We are the winner!");
    },
    error: function(jqXHR,textStatus,errorThrown) {
      console.log(textStatus);
      console.log('FAIL!');
    }
  })
};

$('.search').on('click', function () {
  var search = $('#search-query').val();
  paginator = 0;
  pageCount = 0;
  $('.page-counter').text("Page Number: " + pageCount);
  fetch(search);
  $('.previous-page').hide();
});

$('.next-page').on('click', function() {
  paginator += 10;
  pageCount += 1;
  $('.page-counter').text("Page Number: " + pageCount);
  fetch(lastQuery);
  $('.previous-page').show();
});

  $('.previous-page').on('click', function() {
    if(pageCount == 1) {
      $('.previous-page').hide();
    }
    paginator -= 10;
    pageCount -= 1;
    $('.page-counter').text("Page Number: " + pageCount);
    fetch(lastQuery);
})
var addBooks = function(data) {
  books = data.items;


  renderBooks();
};

$('.books').on('click', '.book', function() {
  var bookIndex = $(this).index()
  renderShelf(bookIndex);
  console.log($(this).index());

})
var renderShelf = function(index) {
  var shelfObj = {};
  shelfObj.author = books[index].volumeInfo['authors'];
  shelfObj.title = books[index].volumeInfo['title'];
  if(books[index].volumeInfo.imageLinks !== undefined){
    shelfObj.imageURL = books[index].volumeInfo.imageLinks['thumbnail'];
  } else {
    shelfObj.imageURL = "https://www.entrustdatacard.com/-/media/images/video-thumbnails_images/thumb-not-available.png";
  }
  shelfObj.isbn = books[index].volumeInfo.industryIdentifiers[0].identifier;
  shelfObj.pageCount = books[index].volumeInfo['pageCount'];

  var shelfSource = $('#shelf-template').html();
  var shelfTemplate = Handlebars.compile(shelfSource);
  var newShelfHtml = shelfTemplate(shelfObj);


$('.shelves').append(newShelfHtml);
}

var deleteShelfItem = function(index) {
  index.remove();
}
$('.shelves').on('click', '.shelf-item', function(){
  deleteShelfItem($(this));
})
