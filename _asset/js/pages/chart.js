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
 HTML Legend
 ========================================================================== */

const getOrCreateLegendList = (chart, id) => {
	const legendContainer = document.getElementById(id);
	let listContainer = legendContainer.querySelector('ul');

	if (!listContainer) {
		listContainer = document.createElement('ul');

		legendContainer.appendChild(listContainer);
	}

	return listContainer;
};

const htmlLegendPlugin = {
	id: 'htmlLegend',
	afterUpdate(chart, args, options) {
		const ul = getOrCreateLegendList(chart, options.containerID);

		// Remove old legend items
		while (ul.firstChild) {
			ul.firstChild.remove();
		}

		// Reuse the built-in legendItems generator
		const items = chart.options.plugins.legend.labels.generateLabels(chart);

		items.forEach(item => {
			const li = document.createElement('li');

			li.onclick = () => {
				const {type} = chart.config;
				if (type === 'pie' || type === 'doughnut') {
					// Pie and doughnut charts only have a single dataset and visibility is per item
					chart.toggleDataVisibility(item.index);
				} else {
					chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
				}
				chart.update();
			};

			// Color box
			const boxSpan = document.createElement('span');
			boxSpan.classList.add('bvi-no-styles');
			boxSpan.style.background = item.fillStyle;
			boxSpan.style.borderColor = item.strokeStyle;
			boxSpan.style.borderWidth = item.lineWidth + 'px';

			// Text
			const textContainer = document.createElement('p');

			const text = document.createTextNode(item.text);
			textContainer.appendChild(text);

			li.appendChild(boxSpan);
			li.appendChild(textContainer);
			ul.appendChild(li);
		});
	}
};

/* ==========================================================================
 Setup
 ========================================================================== */

const labels = [
	'2019',
	'2020',
	'2021',
];
const data = {
	labels: labels,
	datasets: [
		{
			label: 'Количество проверок',
			backgroundColor: '#153270',
			data: [470, 543, 278],
		},
		{
			label: 'Количество постановлений',
			backgroundColor: '#97A7C3',
			data: [122, 128, 230],
		}
	],
};

/* ==========================================================================
 Config
 ========================================================================== */

Chart.register(ChartDataLabels);

const config = {
	type: 'bar',
	data: data,
	options: {
		layout: {
			padding: {
				top: 0
			},
		},
		scales: {
			x: {
				ticks: {
					color: '#273045',
					font: {
						size: 20,
						family: "'Spectral', serif",
					},
					padding: 20,
				},
				grid: {
					display: false,
				},
			},
			y: {
				max: 700,
				display: false,
			},
		},
		plugins: {
			tooltip: {
				enabled: false,
			},
			htmlLegend: {
				// ID of the container to put the legend in
				containerID: 'legend-container',
			},
			legend: {
				display: false,
				labels: {
					// This more specific font property overrides the global property
					font: {
						size: 15,
						family: "'Manrope', sans-serif",
						weight: '500',
					}
				}
			},
			datalabels: {
				anchor: 'end',
				align: 'top',
				offset: 0,
				color: '#273045',
				clamp: true,
				clip: true,
				font: function (context) {
					if (window.matchMedia(breakpoints.maxTablet).matches) {
						return {
							size: 10,
							weight: '500',
							family: "'Manrope', sans-serif",
						};
					}

					return {
						size: 13,
						weight: '500',
						family: "'Manrope', sans-serif",
					};
				},
			},
		},
	},
	plugins: [htmlLegendPlugin, ChartDataLabels],
};

/* ==========================================================================
 Render
 ========================================================================== */

let myChart;

initialChart();

function initialChart() {
	myChart = new Chart(
		document.getElementById('chart'),
		config
	);
}

function refreshChart() {
	myChart.destroy();
	initialChart();
}

const refreshChartThrottle = refreshChart.throttle(1000);

window.addEventListener('resize', refreshChartThrottle);

/* ==========================================================================
 Response
 ========================================================================== */

if (window.matchMedia(breakpoints.maxTablet).matches) {
	myChart.options.scales.x.ticks.font.size = 16;
	myChart.options.scales.x.ticks.padding = 10;
}




