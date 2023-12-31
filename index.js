const canvas = document.getElementById('pie');
const ctx = canvas.getContext('2d');

const colors = ['#EB5757', '#F2994A', '#6FCF97', '#9B51E0', '#2F80ED', '#56CCF2', '#219653', '#F2C94C'];
const CHART_RADIUS_RATIO = 0.8;
const NUM_VALUES_RANGE = 8;
const CENTER_CIRCLE_RADIUS = 50;

const generateData = () => {
    const numValues = Math.floor(Math.random() * NUM_VALUES_RANGE) + 1;
    const values = [];

    let totalValue = 0;

    for (let i = 0; i < numValues; i++) {
        const value = Math.random();
        totalValue += value;
        values.push({
            value: value
        });
    }

    values.forEach(item => {
        item.normalizedValue = item.value / totalValue;
    });

    return values;
}

const drawChart = (data) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * CHART_RADIUS_RATIO;

    let startAngle = -Math.PI / 2;

    data.forEach((item, index) => {
        const endAngle = startAngle + (item.normalizedValue * 2 * Math.PI);
        const itemRadius = radius - (item.normalizedValue * 100);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, itemRadius, startAngle, endAngle);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();

        ctx.fillStyle = colors[index];
        ctx.fill();

        startAngle = endAngle;
    });

    ctx.beginPath();
    ctx.arc(centerX, centerY, CENTER_CIRCLE_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
}

const updateChart = () => {
    const newData = generateData();
    drawChart(newData);
}

canvas.addEventListener('click', updateChart);

const data = generateData();
drawChart(data);
