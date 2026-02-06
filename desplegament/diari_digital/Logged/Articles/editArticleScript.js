document.getElementById('search-engine').addEventListener('keyup', (e) => {
    let input = e.target.value.toLowerCase();
    let card = document.querySelectorAll('.article-box');
    // console.log(card);
    card.forEach((c) => {
        let title = c.querySelector('.card-title').textContent.toLowerCase();
        let content = c.querySelector('.card-text').textContent.toLowerCase();

        (title.includes(input) || content.includes(input)) 
        ? c.style.display = ''
        : c.style.display = 'none';
    });
});