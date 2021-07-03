const images = Array(5);
for (let i = 0; i < 5; i++) {
    images[i] = './img/test_image_' + (i + 1) + '.jpg';
}

const body = document.querySelector('body')

const figure = document.createElement('figure');
const img = document.createElement('img');
img.src = images[0];
const button = document.createElement('button');
button.innerText = '<';

figure.appendChild(img);
figure.appendChild(button);
figure.appendChild(button.cloneNode(true));

const buttons = figure.querySelectorAll('button');
for (const buttonsKey in buttons) {
    if (buttons.hasOwnProperty(buttonsKey)) {

        buttons[buttonsKey].onclick = function (){
            changeImage(buttonsKey);
        };

        buttons[buttonsKey].onmousemove = function (event){
            document.querySelectorAll('button').forEach((value) => {
                value.className = 'show';
            });
            if (event.movementX === 0 && event.movementY === 0){
                document.querySelectorAll('button').forEach((value) => {
                    value.removeAttribute('class');
                });
            }
        };

        buttons[buttonsKey].onmouseleave = function (){
            document.querySelectorAll('button').forEach((value) => {
                value.removeAttribute('class');
            });
        }

    }
}

body.appendChild(figure);

function changeImage(i) {
    const img = document.querySelector('img');
    const altImg = document.createElement('img');
    const regexp = /[^/]+$/;
    const res = img.src.match(regexp);
    let current;
    for (const imagesKey in images) {
        if (images[imagesKey].match(res)) {
            current = imagesKey;
            break;
        }
    }

    let direction;
    if (i == 0) {
        altImg.className = 'prev';
        direction = ' to-right';
        if (current == 0) {
            altImg.src = images[images.length - 1];
        } else {
            altImg.src = images[--current];
        }
    } else {
        direction = ' to-left';
        if (current == images.length - 1) {
            altImg.src = images[0];
        } else {
            altImg.src = images[++current];
        }
    }

    altImg.className += direction;
    figure.appendChild(altImg);
    img.className = direction;
    const btns = document.querySelectorAll('button');

    img.onanimationend = function () {
        img.parentNode.removeChild(img);
        document.querySelector('img').removeAttribute('class');
        btns.forEach(value => {
            value.removeAttribute('style');
        });
    }

    img.onanimationstart = function () {
        btns.forEach(value => {
            value.style.pointerEvents = 'none';
        });
    }

}


