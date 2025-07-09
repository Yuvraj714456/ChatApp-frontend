import React ,{ useEffect, useRef }from 'react'
import {Line, Doughnut} from 'react-chartjs-2'
import {CategoryScale,
        Tooltip,
        Filler,
        LinearScale,
        PointElement,
        LineElement,
        ArcElement,
        Legend, Chart as ChartJS} from 'chart.js'
import { getLast7Days } from '../../lib/features';

ChartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

const lineChartOptions={
    responsive:true,
    plugins:{
        legend:{
            display:false,
        },
        titile:{
            display:false,
        }
    },

    scales:{
        x:{
            grid:{
                display:false,
            }
        },
        y:{
            beginAtZero:true,
            grid:{
                display:false,
            }
        }
    }
};

const labels = getLast7Days();

export const LineChart = ({valueArray=[]}) => {

    const data = {
        labels:labels,
        datasets:[{
            data:valueArray,
            label:"Active Users",
            fill:true,
            backgroundColor:'rgba(75,12,192,0.2)',
            borderColor:"rgba(75,12,192,1)"
        }]
    }
  return <Line data={data} options={lineChartOptions} />;
}


const doughnutChartOptions={
    responsive:true,
    plugins:{
        legend:{
            display:false,
        },
    }
    ,cutout:70,
}

export const DoughnutChart=({valueArray=[],labels=[]})=>{

    const data = {
        labels,
        datasets:[{
            data:valueArray,
            label:"Total Chats vs Group Chats",
            backgroundColor:['rgba(75,12,192,0.2)',"rgba(212, 100, 106,0.2)"],
            borderColor:["rgba(75,12,192,1)","rgba(212, 100, 106,1)"],
            borderWidth:1,
            offset:30,
        }]
    }
    return <Doughnut data={data} options={doughnutChartOptions} /> 
}
