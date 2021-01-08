<template>
  <body>
    <section class="chart-title">
      <h1>INS Lessons</h1>
    </section>
    <section class="select-area">
      <row :gutter="12">
        <column :lg="1">Countries: </column>
        <column :lg="3"><v-select :options="countries" @input="changeCountry" v-model="selectedCountry"></v-select></column>
        <column :lg="1">Camps: </column>
        <column :lg="3"><v-select :options="camps" @input="changeCamp" v-model="selectedCamp"></v-select></column>
        <column :lg="1">Schools: </column>
        <column :lg="3"><v-select :options="schools" @input="changeSchool" v-model="selectedSchool"></v-select></column>
      </row>
    </section>
    <section class="chart-view">
      <row :gutter="12">
        <column :lg="8"><h2>Number of lessons using INS {{country}} {{school}}</h2></column>
        <column :lg="4">
          <div> {{ totalLessons }} lessons using INS</div>
          <!-- <div> {{'+38%'}} last 12months</div> -->
        </column>
      </row>
      <row :gutter="12">
        <column :lg="8" class="chart-area">
          <line-chart :chart-data="chartData" :options="options"></line-chart>
        </column>
          <column :lg="4" class="summary-area">
            <div class="country-wrapper">
              <div class="text-container">
                <input type="checkbox" id='south-sudan' v-bind:key="'South Sudan'" :value="'South Sudan'" v-model="checkedCountries">
                <label for='south-sudan'><div></div>{{ sudanLessons }} lessons </br> in South Sudan</label>
              </div>
              <div class="chart-container">
                <!-- <bar-chart :chart-data="sudanBarChartData" :options="barchartOption"></bar-chart> -->
                <bar-chart :chart-data="barChartData[0].SouthSudan" :options="barchartOption"></bar-chart>
              </div>
            </div>
            <div class="country-wrapper">
              <div class="text-container">
                <input type="checkbox" id='kenya' v-bind:key="'Kenya'" :value="'Kenya'" v-model="checkedCountries">
                <label for='kenya'><div></div>{{ kenyaLessons }} lessons </br> in Kenya</label>
              </div>
              <div class="chart-container">
                <bar-chart :chart-data="barChartData[2].Kenya" :options="barchartOption"></bar-chart>
              </div>
            </div>
            <div class="country-wrapper">
              <div class="text-container">
                <input type="checkbox" id='tanzania' v-bind:key="'Tanzania'" :value="'Tanzania'" v-model="checkedCountries">
                <label for='tanzania'><div></div>{{ tanzaniaLessons }} lessons </br> in Tanzania</label>
              </div>
              <div class="chart-container">
                <bar-chart :chart-data="barChartData[3].Tanzania" :options="barchartOption"></bar-chart>
              </div>
            </div>
            <div class="country-wrapper">
              <div class="text-container">
                <input type="checkbox" id='dr-congo' v-bind:key="'DR Congo'" :value="'DR Congo'" v-model="checkedCountries">
                <label for='dr-congo'><div></div>{{ drcongoLessons }} lessons </br> in DR Congo</label>
              </div>
              <div class="chart-container">
                <bar-chart :chart-data="barChartData[1].DRCongo" :options="barchartOption"></bar-chart>
              </div>
            </div>
              <!-- {{ summary }} -->
          </column>
      </row>
    </section>

  </body>
</template>

<script>
import LineChart from '../components/LineChart.js'
import BarChart from '../components/BarChart.js'
import { getCountries, getCamps, getSchools, getLessons } from '../data/data-provider.js'

export default {
  components: {
    LineChart,
    BarChart
  },
  data () {
    return {
      selectedCountry: null,
      selectedCamp: null,
      selectedSchool: null,
      chartData: {},
      barChartData: [],
      sudanBarChartData: {},
      kenyaBarChartData: {},
      tanzaniaBarChartData: {},
      drcongoBarChartData: {},
      countries: [],
      camps: [],
      schools: [],
      country: '',
      school: '',
      checkedCountries: [],
      summary: '',
      totalLessons: '',
      sudanLessons: '',
      drcongoLessons: '',
      kenyaLessons: '',
      tanzaniaLessons: '',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: {
              color: '#ffffff'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
      barchartOption: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }]
        },
        legend: {
          display: false
        }
      }
    }
  },
  mounted () {
    this.countries = getCountries()
    this.updateChartData()
    this.updateBarChartData()
    this.updateFilteringArea()
    this.setSummary()
  },
  methods: {
    changeCountry (value) {
      this.camps = getCamps(this.selectedCountry)
      this.selectedCamp = null
      this.selectedSchool = null
      this.updateChartData()
      this.country = '- ' + this.selectedCountry
    },
    changeCamp (value) {
      this.schools = getSchools(this.selectedCountry, this.selectedCamp)
      this.selectedSchool = null
      this.updateChartData()
      this.school = ', ' + this.selectedCamp
    },
    changeSchool (value) {
      this.updateChartData()
    },
    updateBarChartData () {
      const countries = ['South Sudan', 'DR Congo', 'Kenya', 'Tanzania']
      const allDataSet = []
      for (let i = 0; i < countries.length; i++) {
        const countryObj = {}
        let key = countries[i].replace(/\s+/g, '')
        let value = getLessons(countries[i])
        countryObj[key] = {
          labels: value.months,
          datasets: [{
            data: value.lessons
          }]
        }
        allDataSet.push(countryObj)
      }
      this.barChartData = allDataSet
      console.log('this.barChartData[0].SouthSudan', this.barChartData[0].SouthSudan)
      
    },
    updateChartData (chartData) {
      // Build label
      let label = 'All'
      if (this.selectedCountry) {
        label = this.selectedCountry
      }
      if (this.selectedCamp) {
        label += ' > ' + this.selectedCamp
      }
      if (this.selectedSchool) {
        label += ' > ' + this.selectedSchool
      }

      let data = chartData
      let dataSetsArray = []

      if (!data || data.length === 0) {
      // Fetch data
        data = getLessons(this.selectedCountry, this.selectedCamp, this.selectedSchool)
        const dataSets = {
          label: label,
          backgroundColor: 'transparent',
          borderColor: '#EC7181',
          data: data.lessons,
          pointRadius: 6,
          borderWidth: 1.5,
          pointBackgroundColor: '#FFFFFF',
          lineTension: 0
        }
        dataSetsArray.push(dataSets)
      } else {
        dataSetsArray = chartData
      }

      // Format data for chart-js
      this.chartData = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: dataSetsArray
      }
    },
    updateFilteringArea (newVal) {
      this.summary = newVal
    },
    updateMultipleChartData (newVal) {
      let multipleData = []
      newVal.map((el, index) => {
        const chartData = {}
        let borderColor = ''

        switch (el) {
          case 'South Sudan':
            borderColor = '#EA4C89'
            break
          case 'Kenya':
            borderColor = '#2FB9EF'
            break
          case 'Tanzania':
            borderColor = '#67B675'
            break
          case 'DR Congo':
            borderColor = '#f76511'
            break
        }

        const lessons = getLessons(el)

        chartData.label = el
        chartData.backgroundColor = 'transparent'
        chartData.borderColor = borderColor
        chartData.data = lessons.lessons
        chartData.pointRadius = 6
        chartData.borderWidth = 1.5
        chartData.pointBackgroundColor = '#FFFFFF'
        chartData.lineTension = 0
        multipleData.push(chartData)
      })

      this.updateChartData(multipleData)
    },
    setSummary () {
      const data = getLessons(this.selectedCountry, this.selectedCamp, this.selectedSchool)
      const sudan = getLessons('South Sudan')
      const kenya = getLessons('Kenya')
      const tanzania = getLessons('Tanzania')
      const drcongo = getLessons('DR Congo')
      if (data) {
        this.totalLessons = data.lessons.reduce(
          (prev, curr) => prev + curr
        )
      }
      if (sudan) {
        this.sudanLessons = sudan.lessons.reduce(
          (prev, curr) => prev + curr
        )
      }
      if (kenya) {
        this.kenyaLessons = kenya.lessons.reduce(
          (prev, curr) => prev + curr
        )
      }
      if (tanzania) {
        this.tanzaniaLessons = tanzania.lessons.reduce(
          (prev, curr) => prev + curr
        )
      }
      if (drcongo) {
        this.drcongoLessons = drcongo.lessons.reduce(
          (prev, curr) => prev + curr
        )
      }
    }
  },
  watch: {
    checkedCountries (newVal, oldVal) {
      this.updateMultipleChartData(newVal)
    }
  }
}
</script>

<style>
  .chart-view {
    margin-top: 50px;
  }
  .filtering-section{
    display: flex;
    flex-direction: column;
  }
  .text-container {
    display: flex;
    flex-grow: 1;
    align-items: center;
  }
  .chart-container {
    display: flex;
    flex-grow: 2;
  }
  .country-wrapper {
    display: flex;
    align-items: center;
  }
  #bar-chart {
    width: 200px !important;
    height: 100px !important;
  }
  input[type=checkbox] + label {
    color: var(--color-light-grey);
  }
  input#south-sudan[type=checkbox]:checked + label {
    color: var(--color-south-sudan);
  }
  input#kenya[type=checkbox]:checked + label {
    color: var(--color-kenya);
  }
  input#tanzania[type=checkbox]:checked + label {
    color: var(--color-tanzania);
  }
  input#dr-congo[type=checkbox]:checked + label {
    color: var(--color-dr-congo);
  }
  input[type=checkbox] {
    color: var(--color-light-grey);
    border: 1px solid var(--color-light-grey);
    background-color: var(--color-light-grey);
  }
  label {
    display: flex;
    flex-direction: row;
    align-content: center;
    text-align: left;
  }
  label div {
    display:flex;
    width:18px;
    height:18px;
    background:white;
    border:1px solid var(--color-light-grey);
    cursor:pointer;
    border-radius: 3px;
    margin-right: 10px;
    align-self: center;
  }
  #south-sudan {
    display: none;
  }
  #kenya {
    display: none;
  }
  #tanzania {
    display: none;
  }
  #dr-congo{
    display: none;
  }
  #south-sudan:checked + label div {
    border:1px solid var(--color-south-sudan);
  }
  #kenya:checked + label div {
    border:1px solid var(--color-kenya);
  }
  #tanzania:checked + label div {
    border:1px solid var(--color-tanzania);
  }
  #dr-congo:checked + label div {
    border:1px solid var(--color-dr-congo);
  }

</style>
