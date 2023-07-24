<template>
  <header class="wrapper">
    <h1 class="hidden">Delight test technique</h1>
    <img alt="" class="icon" src="./assets/earth.png" />

    <LoaderCustom v-if="loading" />

    <div v-else class="dropdown">
      <ErrorBlock v-if="errors.length" :errors="errors" />

      <div v-else>
        <label class="green">Choisissez un pays</label>
        <select v-model="countryCode">
          <option
            v-for="(country, index) in countries"
            :key="index"
            :value="country.code"
          >
            {{ country.name }}
          </option>
        </select>
      </div>
    </div>
  </header>

  <main class="wrapper">
    <CountryItem :code="countryCode" />
  </main>
</template>

<script>
import gql from 'graphql-tag'
import LoaderCustom from '@/components/LoaderCustom.vue'
import ErrorBlock from '@/components/ErrorBlock.vue'
import CountryItem from '@/components/CountryItem.vue'

export default {
  components: {
    LoaderCustom,
    ErrorBlock,
    CountryItem
  },
  data() {
    return {
      countries: [],
      countryCode: '',
      loading: 0,
      errors: []
    }
  },
  apollo: {
    countries: {
      query: gql`
        query GetAllCountries {
          countries {
            code
            name(lang: "fr")
          }
        }
      `,
      error(error) {
        this.errors = error.graphQLErrors
      }
    }
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
  justify-content: center;
}

.icon {
  max-width: 125px;
  height: auto;
}

.dropdown {
  max-width: 13rem;
  text-align: center;
}

label {
  display: block;
  margin-bottom: 0.8rem;
  font-size: 1.5em;
}

select {
  width: 100%;
  padding: 5px;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 3px;
  background-color: var(--color-background);
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;

  &:hover {
    cursor: pointer;
  }
}
</style>
