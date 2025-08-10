import React from 'react'

import Slides from './Slides'
import UIRadarFeatures from './UIRadarFeatures';
import Section2 from './Section2';
import Footer from './Footer';
import CustomerNavbar from './CustomerNavbar';
import Packages from './Packages';

function Home() {
  return (
    <div>
      <CustomerNavbar />
      <Slides/>
      <Packages />
      <UIRadarFeatures />
      <Section2/>
      <Footer/>
    </div>
  )
}

export default Home;