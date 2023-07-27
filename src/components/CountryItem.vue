<template>
  <div>
    <LoaderCustom v-if="loading" />

    <ErrorBlock v-if="errors.length" :errors="errors" />

    <div v-else-if="country" :class="{ card: code }">
      <h2 class="title green">
        {{ country.name }} <span>{{ country.emoji }}</span>
      </h2>

      <ul class="list">
        <li class="group">
          <span class="label">Capitale : </span>
          <span v-if="country.capital" class="green">{{
            country.capital
          }}</span>
          <span v-else class="none">Aucune</span>
        </li>

        <li class="group">
          <span class="label">Monnaie(s) : </span>
          <ul v-if="country.currencies[0] !== ''" class="list">
            <li
              v-for="(currency, index) in country.currencies"
              :key="index"
              class="item"
              v-html="getCurrency(currency)"
            ></li>
          </ul>
          <span v-else class="none">Aucune</span>
        </li>

        <li class="group">
          <span class="label">Langue(s) : </span>
          <ul v-if="country.languages.length" class="list">
            <li
              v-for="(lang, index) in country.languages"
              :key="index"
              class="item"
            >
              {{ lang.name }}
            </li>
          </ul>
          <span v-else class="none">Aucune</span>
        </li>

        <li>
          <span class="label">Préfixe(s) téléphonique(s) : </span>
          <ul v-if="country.phones.length" class="list">
            <li
              v-for="(phone, index) in country.phones"
              :key="index"
              class="item"
            >
              {{ phone }}
            </li>
          </ul>
          <span v-else class="none"> Aucun</span>
        </li>
      </ul>
    </div>

    <div v-else-if="code && !country">
      <p class="none">Aucun résultat ne correspond au pays sélectionné</p>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import dataCurrencies from '@/data/currency.json'
import LoaderCustom from '@/components/LoaderCustom.vue'
import ErrorBlock from '@/components/ErrorBlock.vue'

export default {
  components: {
    LoaderCustom,
    ErrorBlock
  },
  props: ['code'],
  data() {
    return {
      country: '',
      loading: 0,
      errors: []
    }
  },
  apollo: {
    country: {
      query: gql`
        query getCountry($code: ID!) {
          country(code: $code) {
            name(lang: "fr")
            capital
            emoji
            currencies
            languages {
              name
            }
            phones
          }
        }
      `,
      variables() {
        return {
          code: this.code
        }
      },
      error(error) {
        this.errors = error.graphQLErrors
      }
    }
  },
  methods: {
    getCurrency(currency) {
      if (dataCurrencies[currency]) {
        const symbol = dataCurrencies[currency].symbol
          ? ' - <span class="green">' +
            dataCurrencies[currency].symbol +
            '</span>'
          : ''
        return dataCurrencies[currency].name + symbol
      } else {
        return currency
      }
    }
  }
}
</script>

<style scoped>
.card {
  max-width: var(--card-width);
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid var(--color-border-hover);
  border-radius: 12px;
}

.title {
  display: flex;
  justify-content: space-between;
}

.group {
  margin-bottom: 0.4rem;

  &:first-of-type {
    margin-top: 0.5rem;
  }
}

.item {
  margin-left: 0.3rem;

  &::before {
    width: 6px;
    height: 6px;
    margin-right: 0.5rem;
    margin-bottom: 2px;
    display: inline-block;
    content: '';
    background-color: var(--color-text-highlight);
    border-radius: 50%;
  }
}

.label {
  color: var(--color-text-light);
  font-size: 14px;
}

.green {
  font-weight: bold;
}

.none {
  color: var(--color-text-light);
  font-size: 13px;
  font-style: italic;
}
</style>
