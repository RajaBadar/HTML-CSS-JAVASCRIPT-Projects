const menuToggle = document.getElementById("toggled");
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');

// event listener
//1.listen to click on toggle button
menuToggle.addEventListener('click', ()=> {
    document.body.classList.toggle('show-nav')
})

//2. listen for click on open button
open.addEventListener('click', () => modal.classList.add('show-modal'));

//3. listen for click on close button
close.addEventListener('click', () => modal.classList.remove('show-modal'));

//4. listen for click outsied of the model
window.addEventListener('click', e =>
        e.target === modal ? modal.classList.remove('show-modal') : false

);