const container = document.getElementById('videoContainer');

fetch('videos.json')
  .then(res => res.json())
  .then(videos => {
    container.innerHTML = '';

    videos.forEach(video => {
      let videoId = '';

      if(video.videoLink.includes('youtu.be/')) {
        videoId = video.videoLink.split('youtu.be/')[1].split('?')[0];
      } else if(video.videoLink.includes('youtube.com/watch?v=')) {
        videoId = video.videoLink.split('v=')[1].split('&')[0];
      }

      const embedLink = `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;

      const videoDiv = document.createElement('div');
      videoDiv.classList.add('video');

     videoDiv.innerHTML = `
  <iframe id="video-${videoId}" src="${embedLink}" 
    title="${video.title}" frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
  </iframe>

  <h3>${video.title}</h3>
  <p>${video.description}</p>

  <div class="video-stats">
    <span><i class="fas fa-star" style="color:gold;"></i> ${video.rating} Rating</span>
    <span><i class="fas fa-eye" style="color:#555;"></i> ${video.views} Views</span>
    
  </div>
`;

      container.appendChild(videoDiv);
    });

    // --- Only one video plays at a time ---
    const iframes = container.querySelectorAll('iframe');
    let players = [];

    // Load YouTube Iframe API
    let tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = function() {
      iframes.forEach((iframe) => {
        const player = new YT.Player(iframe.id, {
          events: {
            'onStateChange': (event) => {
              if(event.data === YT.PlayerState.PLAYING) {
                // Pause other videos
                players.forEach(p => {
                  if(p !== player) p.pauseVideo();
                });
              }
            }
          }
        });
        players.push(player);
      });
    }
  })
  .catch(err => console.error(err));

// Explode Text Animation
document.querySelectorAll('.explode-text').forEach(el=>{
    const text = el.textContent;
    el.textContent='';
    text.split('').forEach((char,idx)=>{
        const span = document.createElement('span');
        span.textContent = char===' '?' ':char;
        const x = (Math.random()*200-100)+'px';
        const y = (Math.random()*200-100)+'px';
        const r = (Math.random()*60-30)+'deg';
        span.style.setProperty('--x', x);
        span.style.setProperty('--y', y);
        span.style.setProperty('--r', r);
        span.style.animationDelay = `${0.05*idx}s`;
        el.appendChild(span);
    });
});

// Header Text Explode Animation
const headerH1 = document.querySelector('header h1');
const headerP = document.querySelector('header p');

function explodeText(element) {
    const text = element.textContent;
    element.textContent = '';
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.setProperty('--i', index);
        element.appendChild(span);
    });
}

explodeText(headerH1);
explodeText(headerP);

function splitText(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.setProperty('--i', index);
            el.appendChild(span);
        });
    });
}

splitText('header h1.explode-text');
splitText('header p.explode-text');