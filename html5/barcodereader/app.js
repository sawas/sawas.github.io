
requirejs(['BarcodeReader'],
    function(BarcodeReader) {
        var result = document.getElementById("Result");
        BarcodeReader.Init();
        var localized = [];
        var streaming = false;
        
        BarcodeReader.StreamCallback = function(result) {
            alert('result');
          if (result.length > 0) {
            var tempArray = [];
            for (var i = 0; i < result.length; i++) {
              tempArray.push(result[i].Format + " : " + result[i].Value);
            }
            Result.innerHTML = tempArray.join("<br />");
          }
        };
        
        BarcodeReader.SetLocalizationCallback(function(result) {
          localized = result;
        });
        
        BarcodeReader.SwitchLocalizationFeedback(true);
        
        var videoElement = document.querySelector('video');
        var audioSelect = document.querySelector('select#audioSource');
        var videoSelect = document.querySelector('select#videoSource');
        var decodeBtn = document.querySelector('button#decode');
        var stopDecodeBtn = document.querySelector('button#stopDecode');
        
        navigator.getUserMedia = navigator.getUserMedia ||
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
        function gotSources(sourceInfos) {
          for (var i = 0; i !== sourceInfos.length; ++i) {
            var sourceInfo = sourceInfos[i];
            var option = document.createElement('option');
            option.value = sourceInfo.id;
            if (sourceInfo.kind === 'audio') {
              option.text = sourceInfo.label || 'microphone ' +
                (audioSelect.length + 1);
              audioSelect.appendChild(option);
            } else if (sourceInfo.kind === 'video') {
              option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
              videoSelect.appendChild(option);
            } else {
              console.log('Some other kind of source: ', sourceInfo);
            }
          }
        }
        
        if (typeof MediaStreamTrack === 'undefined' ||
            typeof MediaStreamTrack.getSources === 'undefined') {
          alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
        } else {
          MediaStreamTrack.getSources(gotSources);
        }
        
        function successCallback(stream) {
          window.stream = stream; // make stream available to console
          videoElement.src = window.URL.createObjectURL(stream);
          videoElement.play();
          streaming = true;
        }
        
        function errorCallback(error) {
          console.log('navigator.getUserMedia error: ', error);
        }
        
        function start() {
          if (window.stream) {
            videoElement.src = null;
            window.stream.stop();
          }
          var audioSource = audioSelect.value;
          var videoSource = videoSelect.value;
          var constraints = {
            audio: {
              optional: [{
                sourceId: audioSource
              }]
            },
            video: {
              optional: [{
                sourceId: videoSource
              }]
            }
          };
          navigator.getUserMedia(constraints, successCallback, errorCallback);
        }
        
        function Decode() {
          if (!streaming) return;
          alert('streaming');
          BarcodeReader.DecodeStream(videoElement);
        }
    
        function StopDecode() {
            alert('stop streaming');
            BarcodeReader.StopStreamDecode();
        }
        
        audioSelect.onchange = start;
        videoSelect.onchange = start;
        decodeBtn.onclick = Decode;
        stopDecodeBtn.onclick = StopDecode;
        
        start();
    }
);
