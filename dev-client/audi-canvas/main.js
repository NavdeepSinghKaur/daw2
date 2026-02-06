document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('audi');

    let ctx = canvas.getContext('2d');
    let x = 180;

    ctx.save();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(0, 100);
    ctx.lineTo(500, 100);
    ctx.stroke();
    ctx.restore();

    for(counter = 0; counter<4; counter++) {

        ctx.beginPath();
        ctx.lineWidth = 4;

        ctx.arc(x, 100, 30, 0, Math.PI*2);
        ctx.stroke();
        ctx.save();
        
        ctx.moveTo(x, 200);
        
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.lineTo(x, 0);
        x+=45;
        
        ctx.stroke();
        ctx.restore();
    }
});