import React from "react";
import "./App.css";
import { RouterProvider } from 'react-router-dom';
import AllRouter from './AllRouter';
import { ChakraProvider } from '@chakra-ui/react'
import { ContextProvider } from "./Context/ContextProvider";




function App() {
  return (
    <div>
      <ContextProvider>
        <ChakraProvider>
          <RouterProvider router={AllRouter} />
        </ChakraProvider>
      </ContextProvider>

    </div>


  );
}

export default App;
