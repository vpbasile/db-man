"use client"

import "./globals.css"

// import { useState } from 'react';

// <>DATA<>
import EditLists from "./(components)/grocery/editLists";
import Logo from "./helpersUniversal/logo";
import DisplayPurchase from "./(components)/grocery/displayPurchase";
import ColorModeButton from "./(components)/colorModeButton";
import { Box, Center, Heading } from "@chakra-ui/react";
import AppRow from "./(components)/appRow";
import TodoList from "./(components)/TodoList";

export default function App() {

  type moduleType = {
    uid: number;
    id: string;
    contents: JSX.Element;
    headerText: string;
  };

  // <> Define modules
  const modules: moduleType[] = []
  let makeUID = 0
  modules.push({ uid: makeUID++, id: "displayPurchase", contents: <DisplayPurchase />, headerText: "Purchases" })
  modules.push({ uid: makeUID++, id: 'groceryEdit', contents: <EditLists />, headerText: "EditLists" })

  // <> Toolbar for selecting a module
  // function toolbarButton(eachModule: moduleType) {
  //   const uid = eachModule.uid;
  //   return (
  //     <ListItem key={`button-${uid}`} className="mr-6">  
  //       <button key={uid} onClick={() => {
  //         SETselectedModule(uid);
  //       }} className={buttonStyle}>{eachModule.headerText}</button>
  //     </ListItem>
  //   );
  // }

  // const [selectedModule, SETselectedModule] = useState(0);
  // const toolbar = <>
  //   <label htmlFor='toolbar ' className="block">Database modules:</label>
  //   <ul className="flex">
  //     {modules.map(eachModule => toolbarButton(eachModule))}
  //   </ul>
  // </>

  const actualModule = modules[0];

  // <> Main return
  return (
    <Center id='wrapper' p={10}>
      <Box id="appContianer">
        <AppRow id="header">

          <Heading as={'h1'}>DBman Database Viewer</Heading>
          <ColorModeButton />
          <Center id="logoStrip" bg={'blackAlpha.700'} rounded={'full'} >
            <Logo url={"/dbvb.svg"} alt="DBVB Logo" bgColor="black" />
            <Logo url={"/react.svg"} alt="React Logo" />
            <Logo url={"/vite.svg"} alt="Vite logo" />
            <Logo url={"/chakraui-svgrepo-com.svg"} alt="ChakraUI" bgColor="white" />
          </Center>
        </AppRow>
        <AppRow id="main">
          {actualModule.contents}
        </AppRow>
        <AppRow id="footer" >
          <TodoList />
        </AppRow>
      </Box>

    </Center >
  )

}