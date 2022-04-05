import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class ApexLine4 extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         allOrderNumber : this.props.allOrderNumber,
         allOrderDate : this.props.allOrderDate,
         allOrderincomes : this.props.allOrderincomes,
         series: [
            {
               name: "Order Number",
               data: this.props.allOrderNumber,
            },
            {
               name: "Order incomes",
               data: this.props.allOrderincomes,
            },
            
         ],
         options: {
            chart: {
               height: 250,
               type: "bar",
               toolbar: {
                  show: false,
               },
            },
            dataLabels: {
               enabled: false,
            },

            stroke: {
               width: [4, 4, 4],
               colors: ["#C046D3", "#1EA7C5", "#FF9432"],
               curve: "straight",
            },
            legend: {
               show: false,
            },
            xaxis: {
               type: "text",
               categories: this.props.allOrderDate,
            },
            colors: ["#C046D3", "#1EA7C5", "#FF9432"],

            markers: {
               size: [8, 8, 6],
               strokeWidth: [0, 0, 4],
               strokeColors: ["#C046D3", "#1EA7C5", "#FF9432"],
               border: 0,
               colors: ["#C046D3", "#1EA7C5", "#fff"],
               hover: {
                  size: 10,
               },
            },
            yaxis: {
               title: {
                  text: "",
               },
            },
         },
      };
   }

   render() {
      console.log(this.props)
      return (

         <div id="chart">
            <ReactApexChart
               options={this.state.options}
               series={this.state.series}
               type="bar"
               height={250}
            />
         </div>
      );
   }
}

export default ApexLine4;
