"use client"

import "./globals.css"

// import { useState } from 'react';
import { styles } from './helpersUniversal/tsStyles';

// <>DATA<>
import EditLists from "./(components)/grocery/editLists";
import Logo from "./helpersUniversal/logo";
import DisplayPurchase from "./(components)/grocery/displayPurchase";

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
  // function toolbarButton(eachModule: moduleType, cssClasses?: string) {
  //   const uid = eachModule.uid;
  //   let buttonStyle = styles.button + styles.roomy;
  //   if (uid === selectedModule) { buttonStyle = `ring-8 ring-inset ` + buttonStyle; }
  //   else {
  //     if (cssClasses === undefined) buttonStyle = "text-blue-500 " + buttonStyle
  //     else buttonStyle = cssClasses + buttonStyle;
  //   }
  //   return (
  //     <li key={`button-${uid}`} className="mr-6">
  //       <button key={uid} onClick={() => {
  //         SETselectedModule(uid);
  //       }} className={buttonStyle}>{eachModule.headerText}</button>
  //     </li>
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
    <main className="flex flex-col items-center justify-between p-24 ">
      {/* <div className="w-[65%]"> */}
      <div className="w-full">
        <h1 className={styles.reallyBig}>DBman Database Viewer</h1>
        <div id="logStrip" className="w-100 flex justify-center">
          <Logo url={"/dbvb.svg"} />
          <Logo url={"/react.svg"} />
          <Logo url={"/Tailwind_CSS_Logo.svg"} >
            <h2>with <a href='https://tailwindcss.com/' className='' >tailwind</a></h2>
            (<a href={"https://tailwindcomponents.com/cheatsheet/"}>cheat sheet</a>)
          </Logo>
          <Logo url={"/vite.svg"} />
        </div>
        {actualModule.contents}
        <div className={styles.bubble + styles.spacious}>
          <ul className="list-disc list-inside">
            <h2 className={styles.h3}>To Fix</h2>
            <li>Work with GPT to call the create route</li>
            <li>Find the FIXME tag</li>
            <li>Figure out why I can't edit the last row.  Must be an off-by-one error</li>
            <li>Get the select lists to choose the right value when first rendered</li>
          </ul>
        </div>
        {/* <div className="w-100 flex justify-center">{toolbar}</div> */}
      </div>

    </main>
  )

}