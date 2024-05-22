
import React, { useEffect, useState } from "react";
import Product from "./Product";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Home() {

  return (
    <>
    <section id="hero" className="hero d-flex align-items-center section-bg">
      <div className="container">
        <div className="row justify-content-between gy-5">
          <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center align-items-center align-items-lg-start text-center text-lg-start">
            <h2 data-aos="fade-up">
              Big choice of
              <br />
              Hardware parts
            </h2>
            <p data-aos="fade-up" data-aos-delay="100">
              Welcome to IndustroManage – Your One-Stop Solution for Hardware
              Needs!".At industromanage  we take pride in being your go-to destination for all your home improvement needs.
            </p>
            <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
              <a href="/products" className="btn-book-a-table">
                SeeMore
              </a>
              <a
                href="https://youtu.be/wTH9mM7mD3A?si=5OxZJKlQUbqTopR1"
                className="glightbox btn-watch-video d-flex align-items-center"
              >
                <i className="bi bi-play-circle"></i>
                <span>Watch Video</span>
              </a>
              {/* https://www.youtube.com/watch?v=LXb3EKWsInQ */}
            </div>
          </div>
          <div className="col-lg-5 order-1 order-lg-2 text-center text-lg-start">
            <img
              src="assets/img/home1.jpg"
              className="img-fluid"
              alt=""
              data-aos="zoom-out"
              data-aos-delay="300"
            />
          </div>
        </div>
        
      </div>
    </section>
    {/* <Product /> */}
    <MainHeader />
    <MainFooter />

    </>
  );
}

export default Home;
