import React, { useState, useEffect } from "react";
import axios from 'axios';
import LineChart from './LineChart'; 
//import './Dashboard.css';

let ttfbData, fcpData, domLoadData, windowLoadData;

function Dashboard(props) {
  const [ttfb, setTtfb] = useState(null);
  const [fcp, setFcp] = useState(null);
  const [domLoad, setDomLoad] = useState(null);
  const [windowLoad, setWindowLoad] = useState(null);
  
  useEffect(() => {
    if(!ttfbData) {
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

  const setMetrics = () => {
    setTtfb(ttfbData);
    setFcp(fcpData);
    setDomLoad(domLoadData);
    setWindowLoad(windowLoadData);
  }

  const getMetricsByUrl = async (url) => {
    let res = await axios.get('/api/perf_metrics?url=' + url);
    ttfbData = prepareChartData(res.data, 'ttfb'); 
    fcpData = prepareChartData(res.data, 'fcp');
    domLoadData = prepareChartData(res.data, 'domload');    
    windowLoadData = prepareChartData(res.data, 'windowload');    
    setMetrics();
  }

  const prepareChartData = (data, property) => {
    let chartData=[];
    typeof data == 'array' && data.map((item)=>{
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
          <p>Displaying performance metrics...</p>
          <LineChart chartData={ttfbData} title="TTFB"/>
          <LineChart chartData={fcpData} title="FCP"/>
          <LineChart chartData={domLoadData} title="Dom Load"/>
          <LineChart chartData={windowLoadData} title="Window Load"/>
        </div>
                  
    </div>
  );
}

export default Dashboard;
