document.addEventListener('DOMContentLoaded', () => {
    var x = new PhotoDAW('divname');
});

class PhotoDAW {
    constructor(divName) {
        this.divName = divName;
        this.canvas;
        this.ctx;
        this.option;
        this.onClickText = '';
        
        [this.canvas, this.ctx] = this.createDiv(this.divName);
        this.createButtons(this.divName, this.canvas, this.ctx);
        this.playGame(this.canvas, this.ctx);

        this.canvas.addEventListener('mousemove', (e) => {
            this.ctx.save();
            this.ctx.fillStyle = '#000000';
            this.ctx.clearRect(260, 138, 300, 150);
            this.ctx.fillText([e.clientX - 10, e.clientY - 10], 264, 147);
            this.ctx.restore();
        })
    }

    createDiv(divName) {
        const div = document.getElementsByClassName(divName)[0];
        const canvas = document.createElement('canvas');
        div.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 300, 150);
        ctx.restore();
        return [canvas, ctx];
    }

    createButtons(divName, canvas, ctx) {
        const div = document.getElementsByClassName(divName)[0];
        const dots = document.createElement('button');
        const rectangle = document.createElement('button');
        const line = document.createElement('button');
        const circle = document.createElement('button');
        const clean = document.createElement('button');
        const download = document.createElement('button');
        const color = document.createElement('input');
        const radius = document.createElement('select');
        const thickness = document.createElement('input');
        const thicknessText = document.createElement('span');
        const optionsDiv = document.createElement('div');
        this.onClickText = document.createElement('p');

        div.appendChild(this.onClickText);
        
        div.appendChild(dots);
        dots.innerText = 'Punts';
        dots.addEventListener('click', () => {
            this.option = 0;
            optionsDiv.style.display = 'block';
            this.changeOnClick('Punts');
        });

        div.appendChild(rectangle);
        rectangle.innerText = 'Rectangle';
        rectangle.addEventListener('click', () => {
            this.option = 1; 
            optionsDiv.style.display = 'none'
            this.changeOnClick('Rectangle');
        })

        div.appendChild(line);
        line.innerText = 'Linea';
        line.addEventListener('click', () => {
            this.option = 2; 
            optionsDiv.style.display = 'none';
            this.changeOnClick('Linea');
        })

        div.appendChild(circle);
        circle.innerText = 'Cercle';
        circle.addEventListener('click', () => {
            this.option = 3; 
            optionsDiv.style.display = 'none';
            this.changeOnClick('Cercle');
        })

        div.appendChild(clean);
        clean.innerText = 'Netejar';
        clean.addEventListener('click', () => {ctx.clearRect(0, 0, canvas.width, canvas.height);})

        div.appendChild(color);
        color.type = 'color';
        color.addEventListener('input', (e) => {
            ctx.fillStyle = e.target.value;
            ctx.strokeStyle = e.target.value;
            ctx.save();
        });

        div.appendChild(download);
        download.innerText = 'Descarregar';
        download.addEventListener('click', () => {this.downloadCanvas(canvas)})

        div.appendChild(thickness);
        thickness.type = 'range';
        thickness.id = 'slider';
        thickness.name = 'px';
        thickness.min = '1';
        thickness.value = 1;
        thickness.max = '10';
        thickness.addEventListener('change', () => {
            thicknessText.innerText = `Gruix: ${thickness.value} px`
        });

        thicknessText.innerText = `Gruix: 1px`;
        div.appendChild(thicknessText);

        const text = document.createElement('p');
        text.innerText = 'Opcions punt (px):';
        optionsDiv.appendChild(text);
        div.appendChild(optionsDiv);
        optionsDiv.style.display = 'none';

        optionsDiv.appendChild(radius);
        radius.id = 'radius';
        for (let i = 1; i < 100; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.innerText = i;
            radius.appendChild(option);
        }
    }

    playGame(canvas, ctx) {
        let start, end;

        canvas.addEventListener('mousedown', (e) => {
            start = [e.clientX -10, e.clientY -10]
        });

        canvas.addEventListener('mouseup', (e) => {
            
            ctx.lineWidth = document.getElementById('slider').value;

            end = [e.clientX -10, e.clientY -10]

            ctx.beginPath();
            switch(this.option) {
                case 0:
                    ctx.arc(start[0], start[1], document.getElementById('radius').value, 0, 2 * Math.PI);
                    ctx.fill();
                    break;

                case 1:
                    ctx.rect(start[0], start[1], end[0]-start[0], end[1]-start[1]);
                    break;
                case 2:
                    ctx.moveTo(start[0], start[1]);
                    ctx.lineTo(end[0], end[1]);
                    break;
                case 3:
                    const resX = Math.abs(start[0] - end[0]);
                    const resY = Math.abs(start[1] - end[1]);
                    const distance = Math.sqrt(resX**2 + resY**2);
                    ctx.arc(start[0], start[1], distance, 0, 2 * Math.PI);
                    break;
            }
            ctx.stroke();
        });
    }

    downloadCanvas(canvas) {
        const image = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.download = 'canvas.png';
        link.href = image;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    changeOnClick(name) {
        this.onClickText.innerText = `On click: ${name}`
    }
}