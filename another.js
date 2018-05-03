var bookLib = Collection();

var fetch = function(query){
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
  for (i = 0; i < data.items.length; i++){
    var author = function(){
      if(data.items[i].volumeInfo.authors){
        return data.items[i].volumeInfo.authors[0]
      }
      else{
        return null;
      }
    }
    var title = function(){
      if(data.items[i].volumeInfo.title){
        return title = data.items[i].volumeInfo.title
      }
      else {
        return null
      }
    }
    var pageCount = function(){
      if(data.items[i].volumeInfo.pageCount){
        return data.items[i].volumeInfo.pageCount
      }
      else {
        return null
      }
    }
    var isbn = function(){
      if(data.items[i].volumeInfo.industryIdentifiers){
        return data.items[i].volumeInfo.industryIdentifiers[0].identifier
      }
      else {
        return null;
      }
    }
    var imageURL = function(){
      if(data.items[i].volumeInfo.imageLinks){
        return imageURL = data.items[i].volumeInfo.imageLinks.thumbnail
      }
      else {
        return null
      }
    }
    var bookModel = Model({
      author: author,
      title: title,
      pageCount: pageCount,
      isbn: isbn,
      imageURL: imageURL
    });
    var template = Handlebars.compile($('#book-template').html())

    var bookView = View(bookModel, template);

    bookLib.add(bookModel);

    $('.books').append(bookView.render());
  }
}


$('.search').on('click', function(){
  var search = $('#search-query').val();

  fetch(search);
})

$('.books').on('click','.book', function(){
  debugger;
  var arrayIndex = $(this).index();
  var bookItem = bookLib.models[arrayIndex];
  var shelfTemplate = Handlebars.compile($('#shelf-template').html());
  var shelfModel = Model(bookItem.getAttributes();
  var shelfView = View(shelfModel, shelfTemplate);
  var shelf = Collection();
  shelf.change(function(){
    shelfView.render();
});
$('.shelves').append(shelfView.render());
  shelf.add(shelfModel);
});
