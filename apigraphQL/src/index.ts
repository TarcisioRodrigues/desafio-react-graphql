import "reflect-metadata"
import { buildSchema } from 'type-graphql'
import {ApolloServer} from 'apollo-server'
import path from 'path'
import { TaskResolver } from "./resolvers/TaskResolver"
async function main() {
    const schema=await buildSchema({
        resolvers:[TaskResolver],
        emitSchemaFile:path.resolve(__dirname,'schema.gql')
    })

    const server=new ApolloServer({
        schema,
    })
    const url=await server.listen()
    console.log(`server ${url}`)
}

main()