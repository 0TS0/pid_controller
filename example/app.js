const container = document.querySelector('body');


for (let index = 0; index < 2; index++) {
    const element = createElement();

    const follower = new Follower({
        target: element,
        origin: {
            x: Math.random(),
            y: Math.random(),
        },
        k: {
            kP: Math.random() / 8,
            kI: Math.random() / 8,
            kD: Math.random() / 8,
            kDt: 10,
        }
    });

    document.addEventListener('mousemove', (e) => {
        follower.to(e.clientX, e.clientY);
    });

    follower.follow();
}

function createElement() {
    const element = document.createElement('div');

    element.classList.add('circle');
    element.style.backgroundColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
    
    container.appendChild(element);

    return element;
}