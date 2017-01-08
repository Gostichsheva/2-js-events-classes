'use strict';

const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');

const keys = {
    arrowLeft: 37,
    arrowUp: 38,
    arrowRight: 39,
    arrowDown: 40
};

function Application(stepInput, element) {
    this.stepInput = stepInput;
    this.element = element;
    this.gameStarted = false;
    this.step = 0;
    this.left = 0;
    this.top = 0;
    this.rad = 0;
    this.moveElement = this.moveElement.bind(this);
    this.rotateElement = this.rotateElement.bind(this);
}

Application.prototype = {
    startGame: function() {
        this.getStep();
        document.addEventListener('keydown', this.moveElement);
    },

    stopGame: function() {
        document.removeEventListener('keydown', this.moveElement);
    },

    getStep: function() {
        let step = Number(app.stepInput.value);
        this.step = isNaN(step) ? step = 10 :
            step < 10 ? step = 10 :
            step > 50 ? step = 50 :
            step;
        app.stepInput.value = this.step;
    },

    moveElement: function(event) {
        let shiftPressed = event.shiftKey;
        switch (event.keyCode) {
            case keys.arrowLeft:
                if (shiftPressed) {
                    this.rotateElement(-this.step * Math.PI / 180);
                } else {
                    this.left -= this.step;
                    this.element.style.left = this.left + 'px';
                }
                break;
            case keys.arrowUp:
                this.top -= this.step;
                this.element.style.top = this.top + 'px';
                break;
            case keys.arrowRight:
                if (shiftPressed) {
                    this.rotateElement(this.step * Math.PI / 180);
                } else {
                    this.left += this.step;
                    this.element.style.left = this.left + 'px';
                }
                break;
            case keys.arrowDown:
                this.top += this.step;
                this.element.style.top = this.top + 'px';
                break;
        }
    },

    rotateElement: function(angle) {
        this.rad += angle;
        this.element.style.transform = 'rotate(' + this.rad + 'rad)';
    }
};

var app = new Application(
    document.querySelector('.step'),
    document.querySelector('#img'));

startButton.addEventListener('click', function(event) {
    event.stopPropagation();
    app.startGame();
});

stopButton.addEventListener('click', function(event) {
    event.stopPropagation();
    app.stopGame();
});
