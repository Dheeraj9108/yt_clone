const videoCardContainer = document.querySelector('.video_container');

let api_key = "AIzaSyCB0ud192bRIkKo4r0cv_4-jNrItQmXxk8";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

fetch(video_http + new URLSearchParams({ //use new URLSearchParams to add parameters after the link
    key:api_key,
    part:'snippet',         //set part to snippet so,we'll get video related data
    chart:'mostPopular',    //set chart param to mostPopular,to fetch popular videos
    maxResults:48,            //it should be maResults with "s",set this to 1 for now, so we can understand the data structure easily
    regionCode:'IN',        //regionCode is specify from which region we are fetching data
})).then(res => res.json())
.then(data =>{ 
    // console.log(data);
    data.items.forEach(item =>{
        getChannelIcon(item);
    })
}).catch(err => console.log(err));

const getChannelIcon = (video_data) =>{
    fetch(channel_http + new URLSearchParams({
        key:api_key,
        part:'snippet',
        id:video_data.snippet.channelId
    })).then(res => res.json())
    .then( data => {
        // console.log(data);
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        console.log(video_data);
        makeVideoCard(video_data);
    })
}
const makeVideoCard = (data) =>{
    videoCardContainer.innerHTML +=`
    <div class="video" onclick = "location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel_icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel_name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div> 
    `;
}

// Search bar
const searchInput  = document.querySelector('.search_bar');
const searchBtn = document.querySelector('.search_btn');

let searchLink = "https://www.youtube.com/results?search_query=";

searchBtn.addEventListener('click',()=>{
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})