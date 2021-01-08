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
            <div class="country-wrapper" v-for="country in dictForVfor" v-bind:key="country.vForId" :value="country.vForId">
              <div class="text-container">
                <input type="checkbox" v-bind:class="country.cssId" v-bind:id="country.cssId" v-bind:key="country.vForId" :value="country.vForId" v-model="checkedCountries">
                <label v-bind:class="country.cssId" v-bind:for="country.cssId"><div v-bind:class="country.cssId" v-bind:for="country.cssId"></div>{{ lessonsByCountries[country.propId] }} lessons </br> in {{country.vForId}}</label>
              </div>
              <div class="chart-container">
                <bar-chart :chart-data="barChartData[country.propId]" :options="barchartOption"></bar-chart>
              </div>
            </div>
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
      countries: [],
      dictForVfor: [],
      camps: [],
      schools: [],
      country: '',
      school: '',
      checkedCountries: [],
      totalLessons: '',
      lessonsByCountries: {},
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
    this.setDictForVfor()
    this.updateLineChartData()
    this.updateBarChartData()
    this.setSummary()
  },
  methods: {
    changeCountry (value) {
      this.camps = getCamps(this.selectedCountry)
      this.selectedCamp = null
      this.selectedSchool = null
      this.updateLineChartData()
      this.country = '- ' + this.selectedCountry
    },
    changeCamp (value) {
      this.schools = getSchools(this.selectedCountry, this.selectedCamp)
      this.selectedSchool = null
      this.updateLineChartData()
      this.school = ', ' + this.selectedCamp
    },
    changeSchool (value) {
      this.updateLineChartData()
    },
    updateBarChartData () {
      const countries = getCountries()
      const allDataDict = {}
      for (let i = 0; i < countries.length; i++) {
        let key = countries[i].replace(/\s+/g, '')
        let value = getLessons(countries[i])
        allDataDict[key] = {
          labels: value.months,
          datasets: [{
            data: value.lessons
          }]
        }
      }
      this.barChartData = allDataDict
    },
    updateLineChartData (chartData) {
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
    updateMultipleChartData (newVal) {
      function getColorSchmeFromIndex (index) {
        let COLOR_SCHEME = [
          '#EA4C89',
          '#2FB9EF',
          '#67B675',
          '#f76511'
        ]
        return COLOR_SCHEME[index % COLOR_SCHEME.length]
      }

      let multipleData = []

      const countries = this.countries

      for (let i = 0; i < countries.length; i++) {
        const cssId = countries[i].toLowerCase().replace(' ', '-')
        const dom = document.getElementsByClassName(`${cssId}`)

        if (dom[0].checked) {
          const checkedColor = getColorSchmeFromIndex(i)
          dom[1].style.color = checkedColor
          dom[2].style.border = `1px solid ${checkedColor}`

          const chartData = {}
          const lessons = getLessons(countries[i])

          chartData.label = countries[i]
          chartData.backgroundColor = 'transparent'
          chartData.borderColor = checkedColor
          chartData.data = lessons.lessons
          chartData.pointRadius = 6
          chartData.borderWidth = 1.5
          chartData.pointBackgroundColor = '#FFFFFF'
          chartData.lineTension = 0
          multipleData.push(chartData)
        } else {
          dom[1].style.color = '#D8D8D8'
          dom[2].style.border = '1px solid #D8D8D8'
        }
      }
      this.updateLineChartData(multipleData)
    },
    setSummary () {
      const total = getLessons(this.selectedCountry, this.selectedCamp, this.selectedSchool)
      const countries = getCountries()

      function calcSum (country) {
        const sum = country.lessons.reduce(
          (prev, curr) => prev + curr)
        return sum
      }

      this.totalLessons = calcSum(total)

      const lessonSumDict = {}
      for (let i = 0; i < countries.length; i++) {
        const countryName = countries[i].replace(/\s+/g, '')
        const sum = calcSum(getLessons(countries[i]))
        lessonSumDict[countryName] = sum
      }
      this.lessonsByCountries = lessonSumDict
    },
    setDictForVfor () {
      const countries = getCountries()
      const countriesForVfor = []
      for (let i = 0; i < countries.length; i++) {
        const obj = {}
        obj.vForId = countries[i]
        obj.cssId = countries[i].toLowerCase().replace(' ', '-')
        obj.propId = countries[i].replace(/\s+/g, '')
        countriesForVfor.push(obj)
      }
      this.dictForVfor = countriesForVfor
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
  label {
    display: flex;
    flex-direction: row;
    align-content: center;
    text-align: left;
    color: var(--color-light-grey);
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

</style>
