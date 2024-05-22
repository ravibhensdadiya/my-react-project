import React from "react";
import "../css/dashboard.css";
import Header from "./Header";


function Dashboard() {
  return (
    <>
    
<div class="container dashboard-container">
    <img src="placeholder.jpg" alt="Dashboard Image" class="img-fluid dashboard-image" />
    <div class="dashboard-description">
        <h2>Dashboard Description</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod justo id nisl aliquet, vel fermentum tortor facilisis.</p>
    </div>
    <div class="dashboard-slider">
        <h3>Slider</h3>
        
        <div id="dashboardSlider" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="assets/img/about-us2.jpg" class="d-block w-100" alt="home1" />
                </div>
                <div class="carousel-item">
                    <img src="assets/img/about-us2.jpg" class="d-block w-100" alt="Slide 2" />
                </div>
                <div class="carousel-item">
                    <img src="assets/img/about-us2.jpg" class="d-block w-100" alt="Slide 3" />
                </div>
            </div>
            <a class="carousel-control-prev" href="#dashboardSlider" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#dashboardSlider" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>
</div>
<Header />
    </>
   
    
  );
}

export default Dashboard;
