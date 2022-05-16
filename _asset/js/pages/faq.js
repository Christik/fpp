$(document).ready(function(){

	/* ==========================================================================
     Faq
     ========================================================================== */

    const faq = document.querySelector('.faq');

    faq.addEventListener('click', function (e) {
       if (e.target.closest('.faq-item__head')) {
           const head = e.target.closest('.faq-item__head');
           const parent = head.parentElement;
           const body = parent.querySelector('.faq-item__body');
           const classActive = 'is-opened';

           if (!parent.classList.contains(classActive)) {
               body.style.display = 'block';
           } else {
               body.style.display = 'none';
           }

           parent.classList.toggle(classActive);
       }
    });

    /* ======================================================================== */
});









