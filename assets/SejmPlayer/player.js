(function () {
  function loadCSS(href) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`link[href="${href}"]`)) {
        resolve();
        return;
      }
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Unable to load CSS: ${href}`));
      document.head.appendChild(link);
    });
  }
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Unable to load JS: ${src}`));
      document.head.appendChild(script);
    });
  }
  async function initPlayer() {
    const videoEl = document.querySelector('video.video-js');

    if (!videoEl) {
      console.warn('<video> element not found');
      return;
    }

    if (typeof videojs === 'undefined') {
      console.error('video.js not available');
      return;
    }

    const shouldBeFluid = window.innerWidth < 768;

    const player = videojs(videoEl, {
      controls: true,
      fluid: shouldBeFluid,
      liveui: true,
      preload: 'auto',
      playsinline: true,
      nativeControlsForTouch: false,
      html5: {
        vhs: {
          overrideNative: true
        }
      }
    });

    const data = await getData(`https://api.sejm.gov.pl/sejm/term10/videos/${unid}`);
    const src = data.videoLink;
    const type = videoEl.dataset.type;
    hideLoadingOverlay();

    if (src && type) {
      player.src({ src, type });
    } else {
      console.warn('No data-src or data-type');
    }

    player.ready(() => {
      const techEl = player.tech(true)?.el();
      if (techEl && 'remote' in techEl) {
        techEl.remote.watchAvailability(() => {
          console.log('Remote Playback available');
        });
      }
    });
  }

  (async function bootstrap() {
    try {
      await loadCSS('https://vjs.zencdn.net/8.10.0/video-js.css');
      await loadScript('https://vjs.zencdn.net/8.10.0/video.min.js');

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPlayer);
      } else {
        initPlayer();
      }
    } catch (err) {
      console.error('Error:', err);
    }
  })();
})();
