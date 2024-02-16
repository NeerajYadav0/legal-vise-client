import "./App.css";
import { Button } from "./components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

function App() {
  function clickHandler() {
    toast.success("Event has been created.");
  }

  return (
    <>
      <Button onClick={clickHandler}>Hello</Button>
    </>
  );
}

export default App;
