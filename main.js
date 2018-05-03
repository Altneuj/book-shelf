var books = null;

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

  }
}

var fetch = function(query) {
  console.log(encodeURIComponent(query));
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=" + encodeURIComponent(query),
    dataType: "json",
    success: function (data) {
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

  fetch(search);
});

var addBooks = function(data) {
  books = data.items;


  renderBooks();
};
