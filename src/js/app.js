$(document).ready(function() {
  const topics = ['Movies', 'Music', 'Sports'];
  const moviesArr = ['Ron Burgundy', 'James Bond', 'Jack Sparrow'];
  const musicArr = ['guitar', 'piano', 'drums'];
  const sportsArr = ['skiing', 'surfing', 'rock climbing'];
  let imageStill;
  let imageAnimate;
  for (let i = 0; i < topics.length; i++) {
    const newDropdownItem = $('<option>');
    newDropdownItem.text(topics[i]);
    $('#topicSelect').append(newDropdownItem);
  }
  // Changing dropdown
  $('#topicSelect').change(function() {
    const chosenTopic = $(this).val();
    $('#searchButtonsArea').empty();
    $('#gifSearchResultsArea').empty();

    if (chosenTopic === 'Movies') {
      for (let i = 0; i < moviesArr.length; i++) {
        const newDisplayButton = $('<button>');
        newDisplayButton.text(moviesArr[i]);
        newDisplayButton.addClass('btn btn-primary m-2 searchButton');
        newDisplayButton.attr('data-type', moviesArr[i]);
        $('#searchButtonsArea').append(newDisplayButton);
      }
    } else if (chosenTopic === 'Music') {
      for (let i = 0; i < musicArr.length; i++) {
        const newDisplayButton = $('<button>');
        newDisplayButton.text(musicArr[i]);
        newDisplayButton.addClass('btn btn-primary m-2 searchButton');
        newDisplayButton.attr('data-type', musicArr[i]);
        $('#searchButtonsArea').append(newDisplayButton);
      }
    } else {
      for (let i = 0; i < sportsArr.length; i++) {
        const newDisplayButton = $('<button>');
        newDisplayButton.text(sportsArr[i]);
        newDisplayButton.addClass('btn btn-primary m-2 searchButton');
        newDisplayButton.attr('data-type', sportsArr[i]);
        $('#searchButtonsArea').append(newDisplayButton);
      }
    }
  });
  // Submit search query
  $('#buttonAdderForm').submit(function() {
    event.preventDefault();
    const newSearchInput = $('#searchInput')
      .val()
      .trim();
    if (newSearchInput !== '') {
      const newSearchButton = $('<button>');
      newSearchButton.addClass('btn btn-primary m-2 searchButton');
      newSearchButton.text(newSearchInput);
      newSearchButton.attr('data-type', newSearchInput);
      $('#searchButtonsArea').append(newSearchButton);
    }
    $('#buttonAdderForm')[0].reset();
  });
  // Click gif button
  $(document).on('click', '.searchButton', function() {
    $('#gifSearchResultsArea').empty();

    const q = $(this).attr('data-type');
    const apiKey = '&api_key=bUgYu06Jd684HgnEUeAGbmwxdEiAHwMg';
    const queryURL = `https://api.giphy.com/v1/gifs/search?q=${q}${apiKey}`;

    $.ajax({
      url: queryURL,
      method: 'GET',
    }).then(function(response) {
      const results = response.data;

      for (let i = 0; i < results.length; i++) {
        imageStill = results[i].images.fixed_height_small_still.url;
        imageAnimate = results[i].images.fixed_height_small.url;
        const { title } = results[i];
        const { rating } = results[i];

        const newCard = $('<div>');
        newCard.addClass('card shadow');

        const newImg = $('<img>');
        newImg.addClass('card-img-top cardImage');
        newImg.attr('src', imageStill);
        newImg.attr('data-still', imageStill);
        newImg.attr('data-animate', imageAnimate);
        newImg.attr('data-state', 'still');
        newImg.attr('alt', title);
        $(newCard).append(newImg);

        const newCardBody = $('<div>');
        newCardBody.addClass('card-body');
        $(newCard).append(newCardBody);

        const newTitle = $('<h5>');
        newTitle.addClass('card-title');
        newTitle.text(title);
        $(newCardBody).append(newTitle);

        const newRating = $('<p>');
        newRating.addClass('card-text');
        newRating.text(`Rating: ${rating}`);
        $(newCardBody).append(newRating);

        $('#gifSearchResultsArea').append(newCard);
      }
    });
  });
  // Pause and Play gif
  $(document).on('click', '.cardImage', function() {
    const state = $(this).attr('data-state');
    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  });
});
