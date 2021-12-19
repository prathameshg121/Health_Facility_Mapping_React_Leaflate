import React from "react";
import Osm from "./Osm";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default function Container(){



    return (

<div>
<div class="sidebar">
  <a class="active" href="#home">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
</div>

<div class="content">
  <Osm/>
</div>

</div>
    )
}