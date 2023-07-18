<template>
  <div :class="{ country: code }">
    <h2 class="green">
      {{ country.name }} <span>{{ country.emoji }}</span>
    </h2>

    <ul>
      <li>
        <span class="label">Capitale :</span> <span class="green">{{ country.capital }}</span>
      </li>
      <li>
        <span class="label">Monnaies :</span>
        <ul class="list">
          <li
            class="list-item"
            v-for="(currency, index) in country.currencies"
            :key="index"
            v-html="getCurrency(currency)"
          ></li>
        </ul>
      </li>
      <li>
        <span class="label">Langues :</span>
        <ul class="list">
          <li class="list-item" v-for="(lang, index) in country.languages" :key="index">
            {{ lang.name }}
          </li>
        </ul>
      </li>
      <li>
        <span class="label">Préfixes téléphoniques :</span>
        <ul class="list">
          <li class="list-item" v-for="(phone, index) in country.phones" :key="index">
            {{ phone }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import data from '@/data/currency.json'

const getQuery = function getCountry() {
  return {
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
    loadingKey: 'loading',
    variables() {
      return {
        code: this.code
      }
    }
  }
}

export default {
  props: ['code'],
  data() {
    return {
      country: ''
    }
  },
  apollo: {
    country: getQuery()
  },
  methods: {
    getCurrency(currency) {
      if (data[currency]) {
        const symbol = ' - <span class="green">' + data[currency].symbol + '</span>'
        return data[currency].name + symbol
      } else {
        return currency
      }
    }
  }
}
</script>

<style scoped>
.country {
  padding: 1rem;
  border: 1px solid var(--color-border-hover);
  border-radius: 12px;
}

h2 {
  display: flex;
  justify-content: space-between;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.list-item {
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
</style>
