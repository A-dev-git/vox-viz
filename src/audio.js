// ***************** Audio ******************
let audioContext, analyser, dataArray, source, rafId, meter;
let audioData;

const initAudioContext = () => {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();    
    analyser.fftSize = 256;        
    analyser.smoothingTimeConstant = 1;
    dataArray = new Uint8Array(analyser.frequencyBinCount);              
    
    source = audioContext.createMediaStreamSource(micAudio);
    source.connect(analyser);                 

    meter = createAudioMeter(audioContext);
    source.connect(meter);   

    rafId = requestAnimationFrame(tick);              
}        

const createAudioMeter = (audioContext,clipLevel,averaging,clipLag) => {
    var processor = audioContext.createScriptProcessor(512);
    processor.onaudioprocess = volumeAudioProcess;
    processor.clipping = false;
    processor.lastClip = 0;
    processor.volume = 0;
    processor.clipLevel = clipLevel || 0.98;
    processor.averaging = averaging || 0.95;//0.95;
    processor.clipLag = clipLag || 750;

    // this will have no effect, since we don't copy the input to the output,
    // but works around a current Chrome bug.
    processor.connect(audioContext.destination);

    processor.checkClipping =
        function(){
            if (!this.clipping)
                return false;
            if ((this.lastClip + this.clipLag) < window.performance.now())
                this.clipping = false;
            return this.clipping;
        };

    processor.shutdown =
        function(){
            this.disconnect();
            this.onaudioprocess = null;
        };

    return processor;
}

function volumeAudioProcess( event ) {
    var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
    var sum = 0;
    var x;

    // Do a root-mean-square on the samples: sum up the squares...
    for (var i=0; i<bufLength; i++) {
        x = buf[i];
        if (Math.abs(x)>=this.clipLevel) {
            this.clipping = true;
            this.lastClip = window.performance.now();
        }
        sum += x * x;
    }

    // ... then take the square root of the sum.
    var rms =  Math.sqrt(sum / bufLength);

    // Now smooth this out with the averaging factor applied
    // to the previous sample - take the max here because we
    // want "fast attack, slow release."
    this.volume = Math.max(rms, this.volume*this.averaging);                        
}

const tick = () => {
    analyser.getByteTimeDomainData(dataArray);            
    //analyser.getByteFrequencyData(dataArray);
    audioData = dataArray;
    rafId = requestAnimationFrame(tick);     
}

const unInitContext = () => {
    cancelAnimationFrame(rafId);
    analyser.disconnect();
    source.disconnect();
}

async function getMicrophone () {
    micAudio = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
    });
    initAudioContext();
}

const stopMicrophone = () => {
    micAudio.getTracks().forEach(track => track.stop());
    micAudio = null;
}

const toggleMicrophone = () => {
    if (micAudio) {      
        stopMicrophone();
    } else {
        getMicrophone();
    }
}                

// ***************** Audio End ******************  