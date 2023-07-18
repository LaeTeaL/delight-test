import './assets/main.css'

import { createApp, h } from 'vue'
import App from './App.vue'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider} from '@vue/apollo-option'

const apolloClient = new ApolloClient({
  cache:  new InMemoryCache(),
  uri: 'https://countries.trevorblades.com/',
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

const app = createApp({
  render: () => h(App),
})

app.use(apolloProvider).mount('#app')
