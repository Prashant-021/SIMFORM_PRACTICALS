import React from "react";
import 'app.css'
import tshirt from './tshirt.jpg';

import Component1 from './components/Component1';

const App = () => (
    <div>
        <h1>Hello React!!!</h1>
        <h2>React app from scratch</h2>
        <Component1 />
        <img src={tshirt} alt="" width={400}/>
    </div>
)
export default App