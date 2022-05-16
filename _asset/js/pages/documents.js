$(document).ready(function(){

	/* ==========================================================================
     Date Picker
     ========================================================================== */

    const datepicker = $('[data-datepicker]');

    let dpParent = 'body';

    if ($('.bvi-body')) {
        dpParent = '.bvi-body';
    }

    datepicker.daterangepicker({
        parentEl: dpParent,
        showDropdowns: true,
        linkedCalendars: false,
        opens: 'left',
        buttonClasses: '',
        applyButtonClasses: 'button',
        cancelButtonClasses: 'button-clean',
        locale: {
            format: "MM.DD.YYYY",
            applyLabel: 'Выбрать',
            cancelLabel: '<svg class="button-clean__icon" viewBox="0 0 18 18"><path d="M13.392 13.392L4.60742 4.60742" stroke-width="1.5"/><path d="M4.60797 13.392L13.3926 4.60742" stroke-width="1.5"/></svg>Сбросить фильтры',
            fromLabel: 'От',
            toLabel: 'До',
            daysOfWeek: [
                'вс',
                'пн',
                'вт',
                'ср',
                'чт',
                'пт',
                'сб',
            ],
            monthNames: [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь',
            ],
            firstDay: 1,
        },
    });

    datepicker.val('');

    datepicker.on('show.daterangepicker', function(ev, picker) {
        picker.element.parent('.filter-field').addClass('filter-field_arrow-opened');
        $('.daterangepicker').css('margin-top', $('.bvi-panel').outerHeight() + 10 + 'px');
    });

    datepicker.on('hide.daterangepicker', function(ev, picker) {
        picker.element.parent('.filter-field').removeClass('filter-field_arrow-opened');
    });

    datepicker.on('cancel.daterangepicker', function(ev, picker) {
        picker.element.val('');
    });

	/* ======================================================================== */
});









