import { ChatPromptTemplate, MessagesPlaceholder} from '@langchain/core/prompts'
import {ChatOpenAI} from '@langchain/openai'
import {TavilySearchResults} from '@langchain/community/tools/tavily_search'
import { createOpenAIFunctionsAgent, AgentExecutor} from 'langchain/agents'
import readline from 'readline'


const model = new ChatOpenAI({
    modelName:'gpt-3.5',
    temperature: 0.7
    
})

const searchTool = new TavilySearchResults()
const tools = [searchTool]

const prompt =ChatPromptTemplate.fromMessages([
    ['system', " you are a helpful assistant called Max"],
    ["human" , '{input}'],
    new MessagesPlaceholder('agent_scratchpad')
])

const AIAgent = async ()=>{

    const agent =   await createOpenAIFunctionsAgent({
      
              llm:model,
              prompt,
              tools
          }
          ) 
        
      
      const agentExecutor = new AgentExecutor({
          agent,
          tools
      })


      const Chat = () =>{
        
      }
 const response = await agentExecutor.invoke({
    input:"what is the current weather of cape town, south africa?"
 })

 console.log(response)


 const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

}


