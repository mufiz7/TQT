document.addEventListener('DOMContentLoaded', () => {
    // --- Champions Accordion Logic ---
    const headers = document.querySelectorAll('.accordion-header');

    headers.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');
            const isActive = item.classList.contains('active');

            // Close all others
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle current
            if (isActive) {
                item.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- Read Our Story Toggle ---
    const storyBtn = document.getElementById('read-story-btn');
    const fullStory = document.getElementById('about-full-story');

    if (storyBtn && fullStory) {
        storyBtn.addEventListener('click', () => {
            fullStory.classList.toggle('open');

            if (fullStory.classList.contains('open')) {
                fullStory.style.maxHeight = fullStory.scrollHeight + "px";
                storyBtn.innerHTML = 'Read Less <i class="fas fa-chevron-up" style="margin-left: 10px;"></i>';
            } else {
                fullStory.style.maxHeight = null;
                storyBtn.innerHTML = 'Read Our Story <i class="fas fa-chevron-down" style="margin-left: 10px;"></i>';
            }
        });
    }

    // --- Video Controls Logic ---
    const video = document.getElementById('heroVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const videoContainer = document.getElementById('videoContainer');

    if (video) {
        // Play/Pause
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // Mute/Unmute
        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            updateVolumeIcon();
        });

        // Fullscreen Toggle
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                toggleFullscreen();
            });
        }

        function toggleFullscreen() {
            if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
                // Enter fullscreen
                if (videoContainer.requestFullscreen) {
                    videoContainer.requestFullscreen();
                } else if (videoContainer.webkitRequestFullscreen) {
                    videoContainer.webkitRequestFullscreen();
                } else if (videoContainer.mozRequestFullScreen) {
                    videoContainer.mozRequestFullScreen();
                } else if (video.webkitEnterFullscreen) {
                    // Fallback for iOS Safari
                    video.webkitEnterFullscreen();
                }

                updateFullscreenIcon(true);
            } else {
                // Exit fullscreen
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }

                updateFullscreenIcon(false);
            }
        }

        function updateFullscreenIcon(isFullscreen) {
            if (fullscreenBtn) {
                if (isFullscreen) {
                    fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
                } else {
                    fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
                }
            }
        }

        function updateVolumeIcon() {
            if (video.muted) {
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            } else {
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        }

        // Listen for fullscreen changes
        document.addEventListener('fullscreenchange', () => {
            updateFullscreenIcon(!!document.fullscreenElement);
        });
        document.addEventListener('webkitfullscreenchange', () => {
            updateFullscreenIcon(!!document.webkitFullscreenElement);
        });
        document.addEventListener('mozfullscreenchange', () => {
            updateFullscreenIcon(!!document.mozFullScreenElement);
        });
        document.addEventListener('msfullscreenchange', () => {
            updateFullscreenIcon(!!document.msFullscreenElement);
        });

        // Initialize state
        video.muted = false; // Ensure starts unmuted
        updateVolumeIcon();
    }
});
