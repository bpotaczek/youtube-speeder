var speed = 1;
var storage = chrome.storage.local;

document.addEventListener('DOMContentLoaded', function() { 
  var div = document.getElementById('display');
  var slider = document.getElementById('slider');
  storage.get('speed', function(items) {
    if (items.speed) {
      speed = items.speed;
      chrome.tabs.executeScript({code:'console.log("speed: ' + speed + '");'});
    }
    chrome.tabs.executeScript({code:'console.log("loaded");'});
    setSpeed(speed);
    slider.addEventListener('change', function(e) {
      setSpeed(slider.value, true);
    });
  });

  function setSpeed(value, persist) {
    slider.value = value;
    div.innerHTML = value + 'x';
    if (persist) {
      storage.set({'speed': value}, function() {
        console.log('settings saved');
      });
    }
    chrome.tabs.executeScript({
      code: 'vid = document.getElementsByClassName("video-stream html5-main-video")[0];' +
            'if (vid) { vid.playbackRate = ' + value + '; }'
    });
  }
});

