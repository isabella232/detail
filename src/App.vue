<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/ins">INS</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
* {
  box-sizing: inherit;
}

:root {
  --color-south-sudan: #EA4C89;
  --color-kenya:  #2FB9EF;
  --color-tanzania: #67B675;
  --color-dr-congo: #f76511;
  --color-light-grey: #D8D8D8
}

html {
  display: flex;
  justify-content: center;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
