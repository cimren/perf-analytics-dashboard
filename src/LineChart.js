import React, { Component } from 'react'
import Chart from "chart.js";

export default class LineChart extends Component {

    constructor(props) {
      super(props);
      this.chartRef = React.createRef();
    }  
  
    componentDidUpdate() {
      const {chartData, title} = this.props;

      this.myChart = new Chart(this.chartRef.current, {
        type: 'line',        
        data: {
          labels: chartData.length ? chartData.map(element => {
            return element.label
          }) : [],
          datasets: [{
              label: title,
              data: chartData.length ? chartData.map(element => {
                return element.data
              }) : [],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      });
    }

    render() {
        return (
            <canvas ref={this.chartRef} />
        )
    }
}