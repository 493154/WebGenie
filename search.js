$(document).ready(function(){
    
//Mga APIkeys in case na maubusan kasi nililimita nila yung paggamit ng API, gagana naman ulit yung nagamit na ng kinabukasan. 75bb1f2b58654f099bd78b379fd2ecf8 Salina 6ef96dd7b2d24414b60801c38b075d68 Allen 57aaf8685bc748d089eb2714fe445ad4 Youtube 29f8e42efe874ee2be23f0d1edb6844b Github. Pwede mo ding palitan yung category into sports, general dito

    $("#searchbtn").on("click",function(e){
      e.preventDefault();
      
      let query = $("#searchquery").val();
      let url = "https://gnews.io/api/v4/search?q="+query+"&lang=en&country=us&max=10&apikey=30534382d720bae4d2e2c10151742514";
      	  
      if(query !== ""){
        
        $.ajax({
          
          url: url,
          method: "GET",
          dataType: "json",
          
          beforeSend: function(){
            $("#loader").show();
          },
          
          complete: function(){
            $("#loader").hide();
          },
          
          success: function(news){
            let output = "";
            let latestNews = news.articles;
            
            for(var i in latestNews){
              output +=`
                <div class="col l6 m6 s12">
                <br><br><br>
                <h2>${latestNews[i].title}</h2>
                <br><br><br>
                <img src="${latestNews[i].image}" class="responsive-img" style="width:100%; height:100%; object-fit: contain; border:outset 10px;">
                <br><br><br>
                <p>${latestNews[i].description}</p>
                <br>
                <p>${latestNews[i].content}</p>
                <br>
                <p>Published on: ${latestNews[i].publishedAt}</p>
                <br>
                <a href="${latestNews[i].url}" class="btn">Read more</a>
                </div>
              `;
            }
            
            if(output !== ""){
              $("#newsResults").html(output);
               M.toast({
                /*html: "Search Complete!",*/
                classes: 'green'
              });
              
            }else{
              let noNews = `<div style='text-align:center; font-size:36px; margin-top:40px;'>This news isn't available. Sorry about that.<br>Try searching for something else </div>`;
               $("#newsResults").html(noNews);
              M.toast({
               /*html: "This news isn't available",*/
                classes: 'red'
              });
            }
            
          },
          
          error: function(){
             let internetFailure = `
             <div style="font-size:34px; text-align:center; margin-top:40px;">Please check your internet connection and try again.
             <img src="img/internet.png" class="responsive-img">
             </div>`;
             
            $("#newsResults").html(internetFailure);
             M.toast({
                /*html: "We encountered an error, please try again",
                classes: 'red'*/
              });
          }
          
          
        });
        
      }else{
        let missingVal = `<div style="font-size:34px; text-align:center; margin-top:40px;">Please enter any search term in the search engine</div>`;
        $("#newsResults").html(missingVal);
         M.toast({
                /*html: "Please enter something",*/
                classes: 'red'
              });
      }
      
    });
    
});