 import React,{ReactDOM} from "react";
 import ApexCharts from "apexcharts";
 import ReactApexChart from 'react-apexcharts';
 import {
  sparklineData
} from "react-sparklines";


 class ApexChart extends React.Component {
   
  constructor(props) {
    super(props);
    console.log(this.props.axisData)
    console.log(this.props.axisData)
  }
 
  state = {
    
    series: [{
        name: "Orders",
        data: this.props.axisData
    }],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Product Trends by Month',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: this.props.OrderDate,
      }
    },
  
  
  };
render() {
    return (
      

<div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
</div>
          );
        }
      }
      export default ApexChart
     // const domContainer = document.querySelector('#app');
      //ReactDOM.render(React.createElement(ApexChart), domContainer);
    