let score = 0;

function createBall() {
    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.style.top = Math.random() * 350 + 'px';
    ball.style.left = Math.random() * 350 + 'px';

    ball.addEventListener('click', () => {
        score++;
        document.getElementById('score').innerText = 'Очки: ' + score;
        ball.remove();
        createBall();
    });

    document.getElementById('game').appendChild(ball);
}

createBall();
