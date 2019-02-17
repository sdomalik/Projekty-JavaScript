

function playSound(path) {
    let audio = new Audio(path)
    audio.play();
    return audio;
}

class Sound {
    constructor(path) {
        this.path = path
        this.delay = 0;
    }

    play() {
        let audio = new Audio(this.path)
        audio.play()
        console.log(this.delay)
        return audio
    }
}

class Track {
    constructor() {
        this.sounds = []
        this.lastSoundDate = null;
    }

    // method used to add sound to array and sets delay, if there was sound before, 
    // if not its set current time     
    addSound(sound) {
        let dateNow = new Date();
        if (this.lastSoundDate) {
            sound.delay = dateNow - this.lastSoundDate
        }
        this.lastSoundDate = dateNow
        this.sounds.push(sound);
    }

    // method used to clear sounds
    clear() {
        this.sounds = [];
    }


    //when previous sound is finished 
    play(onPlaybackFinished = null) {
        let self = this;

        
        function _playSound(sound) {
            sound.play()
            currentSound++;
            let nextSound = self.sounds[currentSound];
            if (!nextSound) {
                if (onPlaybackFinished) {
                    onPlaybackFinished();
                }
                return;
            }

            setTimeout(function () {
                _playSound(nextSound)
            }, nextSound.delay)
        }
        if (!this.sounds.length) {
            return false
        }
        let currentSound = 0;
        _playSound(this.sounds[currentSound])
    }

}


$(function () {
    let trackToRecord = null;
    
    $(window).keyup(function (e) {
        let key = e.key.toUpperCase();
        let $soundButton = $(`[data-soundKey='${key}']`)
        let soundPath = $soundButton.data("soundpath")

        $soundButton.addClass("isEnabled");

        sound = new Sound(soundPath)
        sound.play().addEventListener("ended", function () {
            $soundButton.removeClass("isEnabled");
        })

        if (trackToRecord) {
            trackToRecord.addSound(sound)
            console.log(trackToRecord.sounds)
        }

    });

    //execute track recording
    $(".recordButton").click(function (e) {
        let $el = $(this)
        let trackId = $el.data("trackid")

        let isEnabled = Boolean($el.data("isenabled"))
        let $icon = $el.find("i");

        //changing icon after click and sets value to trackToRecord
        if (isEnabled) {
            $icon.removeClass("stop");
            $icon.addClass("circle");

            $el.data("isenabled", 0)
            trackToRecord = null;
        } else {
            $icon.removeClass("circle");
            $icon.addClass("stop");

            $el.data("isenabled", 1)
            trackToRecord = tracks[trackId]
        }

    })

    //remove sounds from track
    $(".clearButton").click(function (e) {
        let $el = $(this)
        let trackId = $el.data("trackid")

        let track = tracks[trackId];
        track.clear();

    })

    //if track have some sounds it's start playing and button is changing icon
    $(".playButton").click(function (e) {
        let $el = $(this);
        let trackId = $el.data("trackid");
        let track = tracks[trackId]
        if (!track.sounds.length)
            return

        function togglePlayButton(isEnabled) {
            let $icon = $el.find("i");
            if (!isEnabled) {
                $icon.removeClass("stop");
                $icon.addClass("play");

                $el.data("isenabled", 0)
            } else {
                $icon.removeClass("play");
                $icon.addClass("stop");

                $el.data("isenabled", 1)
            }
        }

        track.play(function () {
            togglePlayButton(false)
        });

        let isEnabled = Boolean($el.data("isenabled"))
        togglePlayButton(!isEnabled);

    })

    //starts playing all tracks in one time
    $(".playAllButton").click(function () {
        tracks.forEach(track => {
            track.play();
        });
    })


    tracks = [new Track(), new Track(), new Track(), new Track()]

});




