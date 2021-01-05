<template>
  <div>
    <h1>INS Lessons</h1>

    <row :gutter="12">
      <column>Countries: </column>
      <column><v-select :options="countries" @input="changeCountry" v-model="selectedCountry"></v-select></column>
      <column>Camps: </column>
      <column><v-select :options="camps" @input="changeCamp" v-model="selectedCamp"></v-select></column>
      <column>Schools: </column>
      <column><v-select :options="schools" @input="changeSchool" v-model="selectedSchool"></v-select></column>
    </row>

    <div class="chart-view">
      <row :gutter="12">
        <column :lg="4"></column>
        <column :lg="4">
          <line-chart :chart-data="chartData"></line-chart>
        </column>
      </row>
    </div>


  </div>
</template>

<script>
  import LineChart from '../components/LineChart.js'
  import {getCountries, getCamps, getSchools, getLessons} from '../data/data-provider.js'

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        selectedCountry: null,
        selectedCamp: null,
        selectedSchool: null,
        chartData: {},
        countries: [],
        camps: [],
        schools: []
      }
    },
    mounted () {
      this.countries = getCountries();
      this.updateChartData();
    },
    methods: {
      changeCountry(value) {
        this.camps = getCamps(this.selectedCountry);
        this.selectedCamp = null;
        this.updateChartData();
      },
      changeCamp(value) {
        this.schools = getSchools(this.selectedCountry, this.selectedCamp);
        this.selectedSchool = null;
        this.updateChartData();
      },
      changeSchool(value) {
        this.updateChartData();
      },
      updateChartData () {
        //Build label
        let label = "All";
        if (this.selectedCountry) {
          label = this.selectedCountry;
        }
        if (this.selectedCamp) {
          label += " > " + this.selectedCamp;
        }
        if (this.selectedSchool) {
          label += " > " + this.selectedSchool;
        }

        //Fetch data
        let lessons = getLessons(this.selectedCountry, this.selectedCamp, this.selectedSchool);

        //Format data for chart-js
        this.chartData = {
          labels: lessons.months,
          datasets: [
            {
              label: label,
              backgroundColor: 'transparent',
              borderColor: '#EC7181',
              data: lessons.lessons
            }
          ]
        }
      }
    }
  }
</script>

<style>
  .chart-view {
    margin-top: 50px;
  }

</style>
