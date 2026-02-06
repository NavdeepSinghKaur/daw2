document.addEventListener('DOMContentLoaded', () => {
    var x = new PhotoDAW('divname');
});

/*
 start from an empty div on the html
 and add all the elements and everything from here
*/

/*
here, punts is just a circle, with a determined radius (40px I think, verify at moodle)

*/

class PhotoDAW {
    constructor(divName, showCoordinates) {
        this.divName = divName;
        this.showCoordinates = showCoordinates;
        
        createDiv(this.divName);
    }


    createDiv(divName) {
        // let div = document.createElement(divName);
        const div = document.querySelector('div')[0];
        const canvas = div.createElement('canvas');
        console.log(canvas);
    }

}