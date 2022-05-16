$(document).ready(function(){

    /* ==========================================================================
     Breakpoints
     ========================================================================== */

    const breakpoints = {
        minTablet: '(min-width: 1240px)',
        maxTablet: '(max-width: 1239px)',
        minMobile: '(min-width: 768px)',
        maxMobile: '(max-width: 767px)',
    };

    /* ==========================================================================
     Search
     ========================================================================== */

    const search = {};

    search.parent = document.querySelector('[data-search]');
    search.buttonOpen = document.querySelector('[data-search-open]');
    search.buttonClose = document.querySelector('[data-search-close]');
    search.classActive = 'is-search-active';

    document.body.addEventListener('click', function (e) {
        if (e.target.dataset.searchOpen || e.target.dataset.searchOpen === '') {
            toggleSearch();
            openSearchMob();
        }
        if (e.target.dataset.searchClose || e.target.dataset.searchClose === '') {
            closeSearchMob();
        }
    });

    function toggleSearch() {
        if (!document.body.classList.contains('bvi-active')) {
            // для десктопов
            if (window.matchMedia(breakpoints.minTablet).matches) {
                const buttonRect = search.buttonOpen.getBoundingClientRect();
                const buttonRight = buttonRect.right;
                const buttonWidth = buttonRect.width;
                const searchRight = window.innerWidth - buttonRight + buttonWidth + 15;

                search.parent.style.right = searchRight + 'px';

                const menuCol = document.querySelector('.page-header-detail__content__column:nth-child(2)');
                const menuColLeft = menuCol.getBoundingClientRect().left;

                if (!search.parent.classList.contains(search.classActive)) {
                    search.parent.classList.add(search.classActive);
                    search.parent.style.width = window.innerWidth - menuColLeft - searchRight + 'px';
                    header.parent.classList.add(search.classActive);
                } else {
                    search.parent.classList.remove(search.classActive);
                    search.parent.style.width = 0 + 'px';
                    header.parent.classList.remove(search.classActive);
                }
            }
        }

    }

    function openSearchMob() {
        if (window.matchMedia(breakpoints.maxTablet).matches) {
            const burgerRect = header.burger.getBoundingClientRect();
            const buttonRight = window.innerWidth - burgerRect.right;
            const buttonTop = burgerRect.top;

            search.buttonClose.style.right = buttonRight + 'px';
            search.buttonClose.style.top = buttonTop + 'px';

            search.parent.classList.add(search.classActive);
        }
    }

    function closeSearchMob() {
        if (window.matchMedia(breakpoints.maxTablet).matches) {
            search.parent.classList.remove(search.classActive);
        }
    }

    /* ==========================================================================
     Burger Menu
     ========================================================================== */

    const header = {};

    header.parent = document.querySelector('[data-header]');
    header.burger = document.querySelector('[data-burger]');
    header.menuCollapse = document.querySelector('[data-menu-collapse]');
    header.topHeader = document.querySelector('.page-header');
    header.classActive = 'is-active';
    header.classFixed = 'is-fixed';
    header.classNoFixed = 'no-fixed';

    header.burger.addEventListener('click', function(){

        if (header.parent.classList.contains(header.classFixed)) {
            if (!header.burger.classList.contains(header.classActive)) {
                setMenuCollapseHeight();
            } else {
                unsetMenuCollapseHeight();
            }
        }

        header.burger.classList.toggle(header.classActive);
        header.menuCollapse.classList.toggle(header.classActive);

        toggleSearch();
    });

    /* ==========================================================================
     Fixed Header
     ========================================================================== */

    const page = document.querySelector('.page');

    function scrollFixedHeader() {
        if (!document.body.classList.contains('bvi-active')) {
            if (document.documentElement.scrollTop > window.innerHeight) {
                if (!header.parent.classList.contains(header.classFixed)) {
                    page.style.paddingTop = header.parent.offsetHeight + 'px';
                    header.parent.classList.add(header.classFixed);
                    header.parent.classList.remove(header.classNoFixed);

                    // закрываем меню, если открыто
                    if (header.burger.classList.contains(header.classActive)) {
                        header.burger.classList.remove(header.classActive);
                        header.menuCollapse.classList.remove(header.classActive);
                        toggleSearch();
                        unsetMenuCollapseHeight();
                    }
                }
            } else {
                if (header.parent.classList.contains(header.classFixed)) {
                    header.parent.classList.add(header.classNoFixed);
                    setTimeout(function(){
                        page.style.paddingTop = 0;
                        header.parent.classList.remove(header.classFixed);
                        header.parent.classList.remove(header.classNoFixed);
                    }, 200);

                    // закрываем меню, если открыто
                    if (header.burger.classList.contains(header.classActive)) {
                        header.burger.classList.remove(header.classActive);
                        header.menuCollapse.classList.remove(header.classActive);
                        toggleSearch();
                        unsetMenuCollapseHeight();
                    }
                }
            }
        }
    }

    const scrollFixedHeaderThrottle = scrollFixedHeader.throttle(100);

    window.addEventListener('scroll', scrollFixedHeaderThrottle);


    // header detail height
    function setMenuCollapseHeight() {
        if (!document.body.classList.contains('bvi-active')) {
            header.menuCollapse.style.maxHeight = window.innerHeight - header.topHeader.offsetHeight + 'px';
        }
    }

    function unsetMenuCollapseHeight() {
        header.menuCollapse.style.maxHeight = null;
    }

    //setMenuCollapseHeight();

    /* ==========================================================================
     Fix Site Links Styles
     ========================================================================== */

    if (window.matchMedia(breakpoints.maxTablet).matches) {
        const siteLinks = {};

        siteLinks.parent = document.querySelector('.site-links');
        siteLinks.firstColumn = siteLinks.parent.querySelector('.site-links__group:first-child');

        siteLinks.parent.style.height = siteLinks.firstColumn.offsetHeight + 'px';
    }

    /* ==========================================================================
     Modal
     ========================================================================== */

    const modals = document.querySelectorAll('[data-modal-open]');

    modals.forEach(function (modalButton) {
        const target = document.querySelector(modalButton.dataset.modalOpen);
        const classActive = 'is-opened';

        modalButton.addEventListener('click', function (e) {
            e.preventDefault();
            target.classList.add(classActive);
        });

        const buttonClose = target.querySelector('[data-modal-close]');

        buttonClose.addEventListener('click', function (e) {
           e.preventDefault();
           target.classList.remove(classActive);
        });
    });

    /* ==========================================================================
     Show More
     ========================================================================== */

    const showMoreBlocks = document.querySelectorAll('[data-show-more-button]');

    showMoreBlocks.forEach(function (button) {
        const target = document.querySelector(button.dataset.showMoreButton);
        const  classActive = 'is-opened';

        button.addEventListener('click', function (e) {
            e.preventDefault();

            if (!button.classList.contains(classActive)) {
                button.classList.add(classActive);
                target.classList.add(classActive);
            } else {
                button.classList.remove(classActive);
                target.classList.remove(classActive);
            }
        });;
    });

    /* ==========================================================================
     Custom Select
     ========================================================================== */

    if (!document.body.classList.contains('bvi-active')) {
        customSelect('.custom-select');

        // custom panel max-width
        function fixWidthSelectDocs() {
            if (window.matchMedia(breakpoints.minTablet).matches) {
                const filter = document.querySelector('.filter-fields_docs');

                if (filter) {
                    const filterWidth = filter.offsetWidth;
                    const selectType = filter.querySelector('.filter-field_type');
                    const selectPanel = filter.querySelector('.custom-select-panel');

                    selectPanel.style.width = (filterWidth - selectType.offsetLeft) + 'px';
                }
            }
        }

        fixWidthSelectDocs();

        window.addEventListener('resize', fixWidthSelectDocs);
    }

    /* ==========================================================================
     To anchor
     ========================================================================== */

    const anchorlinks = document.querySelectorAll('.js-to-anchor');

    anchorlinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
           e.preventDefault();
           const href = link.getAttribute('href');
           const target = document.querySelector(href);
           const targetPosition = target.getBoundingClientRect().top;
           const scrollPosition = targetPosition + window.pageYOffset - header.topHeader.offsetHeight - 10;

           window.scrollTo({
               top: scrollPosition
           })
        });
    });


    /* ==========================================================================
     Tabs
     ========================================================================== */

    const tabs = document.querySelectorAll('.tabs');

    tabs.forEach(function (parent) {
        const faqSelectTag = parent.querySelector('.faq-select');

        if (faqSelectTag) {
            if (!document.body.classList.contains('bvi-active')) {
                const faqSelect =  faqSelectTag.customSelect;

                faqSelect.select.addEventListener('change', function (e) {
                    changeFaqTab(faqSelect.value, parent);
                });
            } else {
                faqSelectTag.addEventListener('change', function (e) {
                    changeFaqTab(faqSelectTag.value, parent);
                });
            }
        }

        parent.addEventListener('click', function (e) {
            const link = e.target.dataset.tabsLink;

            if (link) {
                e.preventDefault();

                changeFaqTab(link, parent);

                if (faqSelectTag) {
                    faqSelect.value = link;
                }
            }
        });
    });

    function changeFaqTab(tabName, parent) {
        const currentLink = parent.querySelector('[data-tabs-link].side-nav__list__current');
        currentLink.classList.remove('side-nav__list__current');

        const newLink = parent.querySelector('[data-tabs-link="' + tabName + '"]');
        newLink.classList.add('side-nav__list__current');

        const currentCountent = parent.querySelector('.tabs__content.is-opened');
        currentCountent.classList.remove('is-opened');

        const newContent = parent.querySelector('[data-tabs-content="' + tabName + '"]');
        newContent.classList.add('is-opened');
    }

    /* ==========================================================================
     Footer Nav
     ========================================================================== */

    if (window.matchMedia(breakpoints.maxMobile).matches) {

        const footerNavTitles = document.querySelectorAll('.page-group-nav__title');

        footerNavTitles.forEach(function (title) {
            const link = title.querySelector('a');

            link.addEventListener('click', function (e) {
                e.preventDefault();

                if (!title.classList.contains('is-opened')) {

                    const activeTitle = document.querySelector('.page-group-nav__title.is-opened');

                    if (activeTitle) {
                        activeTitle.classList.remove('is-opened');
                    }

                    title.classList.add('is-opened');
                } else {
                    title.classList.remove('is-opened');
                }
            });
        });

    }

    /* ==========================================================================
     Form Validation
     ========================================================================== */

    $('.form-validation').each(function(){

        $(this).validate({
            errorElement: 'div',
            errorClass: 'form-error',
            onclick: false,
            onkeyup: false,
            focusInvalid: false,
            errorPlacement: function (error, element) {
                if (element.attr("type") == "checkbox") {
                    error.insertAfter(element.next('label'));
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    url: "",
                    beforeSend: function(data) {
                        $(form).find('[type="submit"]').attr('disabled', 'disabled');
                    },
                    success: function () { },
                    complete: function(data) {
                        $(form).find('[type="submit"]').prop('disabled', false);
                    }
                });
                return false;
            }
        });

    });


    /* ======================================================================== */
});













