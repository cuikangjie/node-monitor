var memChart = echarts.init(document.getElementById("line"));

var option = {
  title: {
    text: "内存监控图"
  },
  color: "#dc3545",
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: "value",
    max: 100,
    splitLine: {
      show: false
    }
  },
  series: [
    {
      data: [],
      type: "line",
      areaStyle: {
        color: "#dc3545"
      }
    }
  ]
};
// 使用刚指定的配置项和数据显示图表。

function initMemChart() {
  memChart.setOption(option);
}

initMemChart();

function requestMem() {
  $.ajax({
    url: "/update",
    success: function(res) {
      if (option.xAxis.data.length > 10) {
        option.xAxis.data.shift();
      }
      option.xAxis.data.push(new Date(res.time).format("hh:mm:ss"));

      var mem = res.memory;
      var i = (mem.used / mem.total) * 100;
      if (option.series[0].data.length > 10) {
        option.series[0].data.shift();
      }
      option.series[0].data.push(i);
      initMemChart();

      setTimeout(requestMem, 2000);
    }
  });
}

requestMem();
