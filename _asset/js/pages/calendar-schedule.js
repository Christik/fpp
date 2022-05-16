$(document).ready(function(){

	/* ==========================================================================
     Schecule
     ========================================================================== */

    moment.locale('ru');

    // Call this from the developer console and you can control both instances
    var calendars = {};

    var thisMonth = moment().format('YYYY-MM');
    // Events to load into calendar
    var eventArray = [
        { date: '2022-04-04', },
        { date: '2022-04-11', },
        { date: '2022-04-18', },
        { date: '2022-04-25', },
        { date: '2022-05-02', },
        { date: '2022-05-09', },
        { date: '2022-05-16', },
        { date: '2022-05-23', },
        { date: '2022-05-30', },
        { date: '2022-06-06', },
        { date: '2022-06-13', },
        { date: '2022-06-20', },
        { date: '2022-06-27', },
    ];

    // Calendar 3 renders two months at a time, paging 1 month
    const schedule = $('[data-schedule]').clndr({
        moment: moment,
        daysOfTheWeek: ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'],
        lengthOfTime: {
            months: 3,
            interval: 1
        },
        events: eventArray,
        dateParameter: 'date',
        template: $('#template-calendar-months').html()
    });


	/* ======================================================================== */
});









