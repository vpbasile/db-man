"use client"

import "./globals.css"

// import { useState } from 'react';

// <>DATA<>
import Logo from "./(components)/db-man/zlogo";
import DisplayPurchase from "./(components)/grocery/displayPurchase";
import ColorModeButton from "./helpersUniversal/colorModeButton";
import { Box, Button, Center, Heading, Link, List, ListItem } from "@chakra-ui/react";
import AppRow from "./helpersUniversal/appRow";
import TodoList from "./helpersUniversal/TodoList";
import BestVenues from "./(components)/grocery/BestVenues";
import { useState } from "react";

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
  modules.push({ uid: makeUID++, id: "bestVenues", contents: <BestVenues />, headerText: "Analysis" })
  // modules.push({ uid: makeUID++, id: 'groceryEdit', contents: <EditLists />, headerText: "EditLists" })

  // <> Toolbar for selecting a module
  function toolbarButton(eachModule: moduleType) {
    const uid = eachModule.uid;
    return (
      <ListItem key={`button-${uid}`} className="mr-6">
        <Button key={uid} onClick={() => {
          SETselectedModule(uid);
        }}>{eachModule.headerText}</Button>
      </ListItem>
    );
  }

  const [selectedModule, SETselectedModule] = useState(0);
  const toolbar = <>
    <label htmlFor='toolbar ' className="block">Database modules:</label>
    <ul className="flex">
      {modules.map(eachModule => toolbarButton(eachModule))}
    </ul>
  </>

  const actualModule = modules[selectedModule];

  // <> Main return
  return (
    <Center id='wrapper' p={10}>
      <Box id="appContianer">
        <AppRow id="header">

          <Heading as={'h1'}>DBman Database Viewer</Heading>
          <List>
            <ColorModeButton />
            {toolbar}
          </List>
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
          <TodoList list={[
            <>Get things working with the dropdown menus</>,
            <>Implement <Link href="https://chakra-ui.com/docs/components/form-control">form control</Link></>,
            <>Work with GPT to call the create route</>,
            <>Find the remaining FIXME tags</>,
            <>Figure out why I can't edit the last row.  Must be an off-by-one error</>,
            <>Get the select lists to choose the right value when first rendered</>,
          ]} />
        </AppRow>
      </Box>

    </Center >
  )

}