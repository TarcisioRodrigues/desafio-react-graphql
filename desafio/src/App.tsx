import "./App.css";
import { Kanban } from "./src/components/Kanban";
import LineChart from "./src/components/LineChart";
import { PieChart } from "./src/components/PieChart";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./src/components/ui/tabs";
function App() {
  return (
    <div className="justify-center m-auto">
      <Tabs defaultValue="todo">
        <TabsList>
          <TabsTrigger value="todo">Todo</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>
        <TabsContent value="todo">
          <Kanban />
        </TabsContent>
        <TabsContent value="dashboard">
          <div className="flex flex-row">
            <PieChart /> <LineChart />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
