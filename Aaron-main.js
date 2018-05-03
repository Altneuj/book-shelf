var bookLib = Collection();


var fetch = function(query) {
  lastQuery = encodeURIComponent(query);
  $.ajax({
    method: "GET",
    url: "https://www.googleapis.com/books/v1/volumes?q=" + lastQuery,
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

var addBooks = function(data) {

  for (var i = 0; i < data.items.length; i++) {
    var bookData = data.items[i];

    var author = function () {
      if (bookData.volumeInfo.authors) {
        return bookData.volumeInfo.authors[0];
      } else {
        return null;
      }
    };

    var imageURL = function () {
      if (bookData.volumeInfo.imageLinks) {
        return bookData.volumeInfo.imageLinks.thumbnail;
      } else {
        return null;
      }
    };

    var isbn = function () {
      if (bookData.volumeInfo.industryIdentifiers) {
        return bookData.volumeInfo.industryIdentifiers[0].identifier;
      } else {
        return null;
      }
    };

    var pageCount = function () {
      if (bookData.volumeInfo.pageCount) {
        return bookData.volumeInfo.pageCount;
      } else {
        return null;
      }
    };

    var title = function () {
      if (bookData.volumeInfo.title) {
        return bookData.volumeInfo.title;
      } else {
        return null;
      }
    };

    var bookModel = Model({
      title: title(),
      author: author(),
      imageURL: imageURL(),
      pageCount: pageCount(),
      isbn: isbn()
    });

    var template = Handlebars.compile($('#book-template').html());

    var bookView = View(bookModel, template);

      bookLib.change(function () {
        bookView.render();
      });
    $('.books').append(bookView.render());
    bookLib.add(bookModel)
    };
  }

  $('.search').on('click', function () {
    var search = $('#search-query').val();
    fetch(search);
  });
