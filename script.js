const searchBar = document.getElementById('searchBar');
var url= "https://yh-finance.p.rapidapi.com/auto-complete?q=tesla&region=US"

searchBar.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    url = "https://yh-finance.p.rapidapi.com/auto-complete?q="       + e.target.value + "&region=US"
    const settings = {
  	"async": true,
  	"crossDomain": true,
  	"url": url,
  	"method": "GET",
  	"headers": {
  		"x-rapidapi-host": "yh-finance.p.rapidapi.com",
  		"x-rapidapi-key":  "2ef34893cbmshb1d06ec33148af5p17e20fjsn4edff4386ef8"
  	}
    };
    $.ajax(settings).done(async function (response) {
      //console.log(response.quotes[0].quoteType)
    	if(response.quotes.length < 1 || response.quotes[0].quoteType.localeCompare('CRYPTOCURRENCY') != 0) {
        console.log("Not a valid cryptocurrency!");
      }
      else {
        //console.log(e.target.value)
        //console.log(response)
        //console.log(response.news)
        console.log(response.quotes[0].shortname + '\n')
        ticker = e.target.value
        i = 0
        while(response.news[i].title.length > 0) {
          var utcTime = response.news[i].providerPublishTime
          var date = new Date(0)
          date.setUTCSeconds(utcTime)
          console.log(response.news[i].title)
          //console.log(date)
          console.log('Publisher: ' + response.news[i].publisher)
          console.log('Link: ' + response.news[i].link)
          console.log('\n')
          i++;
        }
      }
    });
  }
});

