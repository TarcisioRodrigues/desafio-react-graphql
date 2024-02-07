import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TodoProvider } from './context/todoContext.tsx'
import { ApolloProvider } from '@apollo/client'
import { client } from './src/lib/apollo.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <TodoProvider>
    <ApolloProvider client={client}>
      <App />
      </ApolloProvider>
  </TodoProvider>
  
)
