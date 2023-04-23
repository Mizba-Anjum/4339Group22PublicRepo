<template>
  <canvas ref="pieChart" width="500" height="500"></canvas>
</template>

<script>
import Chart from 'chart.js/auto'
export default {
  props: {
    chartDataLabels: {
      type: Array
    },
    chartData: {
      type: Array
    }
  },
  mounted() {
    const backgroundColor = this.chartData.map(() => this.getColor())
    const data = {
      labels: this.chartDataLabels,
      datasets: [
        {
          label: 'My First Dataset',
          data: this.chartData,
          backgroundColor: backgroundColor,
          hoverOffset: 4
        }
      ]
    }
    Chart.defaults.font.size = 20 //code for chart.js font size https://www.chartjs.org/docs/latest/general/fonts.html
    const myChart = new Chart(this.$refs.pieChart, {
      type: 'pie',
      data: data,
      options: {
        maintainAspectRatio: false //option to prevent chart size from changing
      }
    })
  },
  methods: {
    getColor() {
      let channel = () => Math.random() * 255
      return `rgba(${channel()}, ${channel()}, ${channel()}, 0.2)`
    }
  }
}
</script>
