<script>
  import { onMount } from 'svelte';
  import ApexCharts from 'apexcharts';
  import ApexChartsSvelte from 'svelte-apexcharts';

  export let data = [];
  export let chartType = 'pie'; // 'pie', 'line', 'bar'
  export let height = 400;

  let chartOptions = {};
  let series = [];
  let chartElement;

  $: if (data && data.length > 0) {
    updateChart();
  }

  function updateChart() {
    if (chartType === 'pie') {
      chartOptions = {
        chart: {
          type: 'pie',
          height: height,
          background: 'transparent',
          fontFamily: 'inherit'
        },
        series: data.map(asset => asset.current),
        labels: data.map(asset => asset.asset),
        colors: [
          '#667eea', '#764ba2', '#f093fb', '#f5576c', 
          '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
          '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3'
        ],
        legend: {
          position: 'bottom',
          fontSize: '14px',
          fontFamily: 'inherit',
          fontWeight: 500,
          labels: {
            colors: '#666'
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$" + val.toFixed(2);
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return val.toFixed(1) + "%";
          },
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            colors: ['#fff']
          }
        },
        responsive: [{
          breakpoint: 768,
          options: {
            chart: {
              height: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
      series = data.map(asset => asset.current);
    } 
    else if (chartType === 'line') {
      // Para gráfico de línea, necesitaríamos datos históricos
      // Por ahora mostramos la evolución del portfolio total
      const totalInvested = data.reduce((sum, asset) => sum + asset.invested, 0);
      const totalCurrent = data.reduce((sum, asset) => sum + asset.current, 0);
      
      chartOptions = {
        chart: {
          type: 'line',
          height: height,
          background: 'transparent',
          fontFamily: 'inherit',
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true
            }
          }
        },
        series: [{
          name: 'Valor del Portfolio',
          data: [
            { x: 'Invertido', y: totalInvested },
            { x: 'Actual', y: totalCurrent }
          ]
        }],
        colors: ['#667eea'],
        stroke: {
          curve: 'smooth',
          width: 3
        },
        markers: {
          size: 6,
          colors: ['#667eea'],
          strokeColors: '#fff',
          strokeWidth: 2,
          hover: {
            size: 8
          }
        },
        grid: {
          borderColor: '#e9ecef',
          strokeDashArray: 4
        },
        xaxis: {
          type: 'category',
          labels: {
            style: {
              colors: '#666',
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return "$" + val.toFixed(0);
            },
            style: {
              colors: '#666',
              fontSize: '12px'
            }
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$" + val.toFixed(2);
            }
          }
        },
        responsive: [{
          breakpoint: 768,
          options: {
            chart: {
              height: 300
            }
          }
        }]
      };
      series = [{
        name: 'Valor del Portfolio',
        data: [
          { x: 'Invertido', y: totalInvested },
          { x: 'Actual', y: totalCurrent }
        ]
      }];
    }
    else if (chartType === 'bar') {
      chartOptions = {
        chart: {
          type: 'bar',
          height: height,
          background: 'transparent',
          fontFamily: 'inherit',
          toolbar: {
            show: true
          }
        },
        series: [{
          name: 'Invertido',
          data: data.map(asset => asset.invested)
        }, {
          name: 'Valor Actual',
          data: data.map(asset => asset.current)
        }],
        colors: ['#667eea', '#4CAF50'],
        xaxis: {
          categories: data.map(asset => asset.asset),
          labels: {
            style: {
              colors: '#666',
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return "$" + val.toFixed(0);
            },
            style: {
              colors: '#666',
              fontSize: '12px'
            }
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "$" + val.toFixed(2);
            }
          }
        },
        legend: {
          position: 'top',
          fontSize: '14px',
          fontFamily: 'inherit',
          fontWeight: 500,
          labels: {
            colors: '#666'
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          }
        },
        dataLabels: {
          enabled: false
        },
        grid: {
          borderColor: '#e9ecef',
          strokeDashArray: 4
        },
        responsive: [{
          breakpoint: 768,
          options: {
            chart: {
              height: 300
            },
            plotOptions: {
              bar: {
                columnWidth: '70%'
              }
            }
          }
        }]
      };
      series = [{
        name: 'Invertido',
        data: data.map(asset => asset.invested)
      }, {
        name: 'Valor Actual',
        data: data.map(asset => asset.current)
      }];
    }
  }

  onMount(() => {
    if (data && data.length > 0) {
      updateChart();
    }
  });
</script>

<div class="chart-container">
  {#if data && data.length > 0}
    <ApexChartsSvelte 
      {chartOptions} 
      {series} 
      bind:this={chartElement}
    />
  {:else}
    <div class="no-data">
      <i class="fas fa-chart-pie"></i>
      <p>No hay datos para mostrar</p>
    </div>
  {/if}
</div>

<style>
  .chart-container {
    width: 100%;
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    color: #999;
    text-align: center;
  }

  .no-data i {
    font-size: 3rem;
    margin-bottom: 15px;
    color: #ddd;
  }

  .no-data p {
    font-size: 1.1rem;
    margin: 0;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .chart-container {
      padding: 15px;
    }
  }
</style>