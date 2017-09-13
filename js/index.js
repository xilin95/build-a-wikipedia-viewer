(function() {

  var displayResults = document.getElementById("result");
 
  
  // Gets pages whose titles contain the searchItem
  // Uses a proxy to overcome cross domain origin issue
  function getRelevantPages() {
    var searchRequest = new XMLHttpRequest();
    var searchItem = document.getElementById("searchItem").value.toLowerCase();
    
    var url = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchItem + "&format=json&utf8=";
    
    if (searchItem.length < 1) {
      url = "https://en.wikipedia.org/wiki/Special:Random";
      window.open(url,'_blank');
      document.getElementById("searchItem").focus();
    } else {
      searchRequest.open("GET", url, true);
      searchRequest.send();
    }
    
    searchRequest.onreadystatechange = function() {
      if (searchRequest.readyState == 4 && searchRequest.status == 200) {
        var relevantPages = JSON.parse(searchRequest.responseText);
        displayResults.innerHTML = "";
        displayRelevantPages(relevantPages);
      }
    };
    
    
  }

  function displayRelevantPages(relevantPages) {
    var resultArray = relevantPages.query.search;
    for (var i = 0; i < resultArray.length; i++) {
      var result = resultArray[i];
      var newElement = document.createElement('div');
      newElement.className = 'result-item'
      var title = result.title;
      title = title.replace(/\s+/g, "%20");
      console.log(title);
      var url = 'https://en.wikipedia.org/wiki/' + title;
      
      newElement.innerHTML = "<a href=" + url + " target='_blank'><div style='padding: 15px 30px 5px 30px; font-size: 10px;' class='well'><h3><b>" + result.title + "</b></h3><h5>" + result.snippet + "</h5></div></a>";
      displayResults.appendChild(newElement);
    }
  }
  
  $( "#search" ).click(function() {

    getRelevantPages(); // starts the whole program
    
  });
  
  $("#searchItem").keyup(function(event){
    if(event.keyCode == 13){
        $("#search").click(); // starts the whole program
    }
  });
  
})();