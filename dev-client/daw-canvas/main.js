document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("dawCanvas");
    const ctx = canvas.getContext("2d");

    let letterPositionFromTop = -230;
    let alpha = 0;
    backgroundImage = new Image();
    song = new Audio('assets/bmw-me-gusta-canvas.mp3');
    backgroundImage.src = 'assets/bmw-fons.png';
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

    function drawImage() {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        ctx.translate(0, letterPositionFromTop)
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.beginPath();
        ctx.arc(centerX, centerY, 75, 0, Math.PI * 2);
        ctx.fillStyle = '#AAAAAA';
        ctx.strokeStyle = '#AAAAAA';
        ctx.fill();
        ctx.stroke(); 
        ctx.save();

        ctx.beginPath();
        ctx.arc(centerX, centerY, 69, 0, Math.PI*2);
        ctx.fillStyle = '#000000';
        ctx.fill();

        ctx.restore();
        
        let x = 45;
        for (let i = 0; i < 2; i++) {            
            ctx.beginPath();
            ctx.arc(centerX, centerY, x, 0, Math.PI*2);
            ctx.fill();
            x -= 4;
            ctx.fillStyle = '#FFFFFF';
        }

        let radius = 40;
        ctx.fillStyle = '#00FF00';
        ctx.strokeStyle = '#00FF00';
        
        let begin = 0;
        let end = Math.PI / 2;
        for (let i = 0; i < 2; i++) {
            while (radius > 0) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, begin, end, false)
                ctx.stroke();
                radius -= 1;
            }
            radius = 40;
            begin = Math.PI;
            end = Math.PI + Math.PI /2;
        }

        ctx.fillStyle = '#AAAAAA';
        ctx.font = "20px Arial";

        ctx.save();
        ctx.translate(-50, 250);
        ctx.rotate(-0.75);
        ctx.fillText("B", centerX, centerY, );
        ctx.restore();

        ctx.save();
        ctx.fillText("M", centerX - 9, centerY -48);
        ctx.translate(50, -250);
        // ctx.rotate(0.75);
        ctx.restore();

        ctx.save();
        ctx.rotate(0.75);
        ctx.fillText("Y", centerX - 0, centerY - 328, );
        ctx.restore();

        if (letterPositionFromTop < 0) {
            letterPositionFromTop += 0.13;
            console.log("running");
            console.log(letterPositionFromTop);
            requestAnimationFrame(drawImage);
        } else {
            ctx.globalAlpha = alpha;
            ctx.translate(0, 0)
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '30px Arial';
            ctx.fillText("DAW canvas", 480, 140);
            ctx.font = '15px Arial';
            ctx.fillText("Me gusta canvas", 480, 170);

            if (ctx.globalAlpha < 1) {
                alpha += 0.01;
                requestAnimationFrame(drawImage);
            }
        }
    }
     
    function start() {
        window.requestAnimationFrame(drawImage);
    }
    
    startButton.addEventListener("click", () => {
        start();
        startButton.disabled = true;
        this.song.play();
    });
});