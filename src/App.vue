<template>
  <header class="wrapper">
    <h1 class="hidden">Delight test technique</h1>
    <img class="icon" alt="" src="./assets/earth.png" width="125" height="125" />

    <div class="dropdown">
      <label class="green">Choisissez un pays</label>
      <select v-model="countryCode">
        <option v-for="(country, index) in countries" :key="index" :value="country.code">
          {{ country.name }}
        </option>
      </select>
    </div>
  </header>

  <main class="wrapper" v-if="countryCode">
    <CountryItem :code="countryCode" />
  </main>
</template>

<script>
import gql from 'graphql-tag'
import CountryItem from '@/components/CountryItem.vue'

export default {
  components: { CountryItem },
  data() {
    return {
      countries: [],
      countryCode: ''
    }
  },
  apollo: {
    countries: gql`
      query GetAllCountries {
        countries {
          code
          name(lang: "fr")
        }
      }
    `
  }
}
</script>

<style scoped>
header {
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (min-width: 1024px) {
    padding-right: calc(var(--section-gap) / 2);
    margin-bottom: 0.2rem;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.dropdown {
  max-width: 13rem;
  text-align: center;
}

label {
  font-size: 1.5em;
}

select {
  width: 100%;
  margin-top: 0.8rem;
  padding: 5px;
  border: 1px solid var(--color-border);
  border-radius: 3px;
  background-color: var(--color-background);
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

  &:hover {
    cursor: pointer;
  }
}
</style>
