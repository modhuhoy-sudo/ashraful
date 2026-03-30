const container = document.getElementById('videoContainer');

fetch('videos.json')
  .then(res => res.json())
  .then(videos => {
    container.innerHTML = ''; // clear container

    videos.forEach(video => {
      let videoId = '';

      // YouTube link থেকে videoId বের করা
      if(video.videoLink.includes('youtu.be/')) {
        videoId = video.videoLink.split('youtu.be/')[1].split('?')[0];
      } else if(video.videoLink.includes('youtube.com/watch?v=')) {
        videoId = video.videoLink.split('v=')[1].split('&')[0];
      }

      const embedLink = `https://www.youtube.com/embed/${videoId}`;
      const videoDiv = document.createElement('div');
      videoDiv.classList.add('video');

      // ভিডিও কার্ড HTML
      videoDiv.innerHTML = `
        <iframe src="${embedLink}" 
          title="${video.title}" frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
        </iframe>

        <h3>${video.title}</h3>
        <p>${video.description}</p>

        <div class="video-stats">
          <span>⭐ ${video.rating}K Rating</span>
          <span>👁 ${video.views} Views</span>
        </div>

        <div class="rating">
          <span data-value="1">&#9733;</span>
          <span data-value="2">&#9733;</span>
          <span data-value="3">&#9733;</span>
          <span data-value="4">&#9733;</span>
          <span data-value="5">&#9733;</span>
        </div>
      `;

      container.appendChild(videoDiv);

      // Star rating logic
      const stars = videoDiv.querySelectorAll('.rating span');
      let selectedRating = localStorage.getItem(videoId) || 0;

      stars.forEach(s => {
        if(s.dataset.value <= selectedRating) s.classList.add('selected');
      });

      stars.forEach(star => {
        star.addEventListener('mouseover', () => {
          stars.forEach(s => s.classList.toggle('hover', s.dataset.value <= star.dataset.value));
        });

        star.addEventListener('mouseout', () => {
          stars.forEach(s => s.classList.remove('hover'));
          stars.forEach(s => {
            if(s.dataset.value <= selectedRating) s.classList.add('selected');
          });
        });

        star.addEventListener('click', () => {
          selectedRating = star.dataset.value;
          stars.forEach(s => s.classList.toggle('selected', s.dataset.value <= selectedRating));
          localStorage.setItem(videoId, selectedRating);
        });
      });
    });
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