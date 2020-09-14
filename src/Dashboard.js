import React, { useState, useEffect } from "react";
import axios from 'axios';
import LineChart from './LineChart'; 
//import './Dashboard.css';

let ttfb, fcp, domLoad, windowLoad;

function Dashboard(props) {
  const [metrics, setmetrics] = useState(null);
  
  useEffect(() => {
    if(!metrics) {
      //getMetrics();
      getMetricsByUrl('https://cihan-perf-analytics-library.herokuapp.com/');
    }
  })

  const getAll = async () => {
    let res = await axios.get('/api/perf_metrics');
    return res.data || [];
  }

 /*  const getMetrics = async () => {
    let res = await getAll();    
    let metrics = prepareChartData(res.data);
    setmetrics(metrics);
  } */

  const getMetricsByUrl = async (url) => {
    let res = await axios.get('/api/perf_metrics?url=' + url);
    ttfb = prepareChartData(res.data, 'ttfb'); 
    fcp = prepareChartData(res.data, 'fcp');
    domLoad = prepareChartData(res.data, 'domload');    
    windowLoad = prepareChartData(res.data, 'windowload');    
    setmetrics(res.data);
  }

  const prepareChartData = (data, property) => {
    let chartData=[];
    data && data.map((item)=>{
      const date = new Date(parseInt(item.datetime));
      chartData.push({
        label: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
        data: item[property]
      })
    });
    return chartData;
  }

  return (
    <div className="dashboard">    
        <h1>{props.title}</h1>        
        <div className="chart">
          <LineChart chartData={ttfb} title="TTFB"/>
          <LineChart chartData={fcp} title="FCP"/>
          <LineChart chartData={domLoad} title="Dom Load"/>
          <LineChart chartData={windowLoad} title="Window Load"/>
        </div>
                  
    </div>
  );
}

export default Dashboard;
