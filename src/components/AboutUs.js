import React from "react";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";

function About_Us() {
  return (
    <>
      <section id="about" class="about">
        <div class="container" data-aos="fade-up">
          <div class="section-header">
            <h2>About Us</h2>
            <p>
              Learn More <span>About Us</span>
            </p>
          </div>

          <div class="row gy-4">
            <div
              class="col-lg-7 position-relative about-img"
              style={{ backgroundImage: "url(assets/img/about-us2.jpg)" }}
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <div class="call-us position-absolute">
                <h4>Contact us</h4>
                <p>+91 5589 8542 85</p>
              </div>
            </div>
            <div
              class="col-lg-5 d-flex align-items-end"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div class="content ps-0 ps-lg-5">
                <p class="fst-italic">
                  At IndustroManage, our mission is to provide customers with
                  top-notch hardware products and exceptional service
                </p>
                <ul>
                  <li>
                    <i class="bi bi-check2-all"></i> We are committed to
                    offering a diverse range of items to meet the demands of DIY
                    enthusiasts, contractors, and homeowners alike. Our goal is
                    to be your preferred choice for all things hardware-related.
                  </li>
                  <li>
                    <i class="bi bi-check2-all"></i> We believe that the success
                    of any project starts with the right tools and materials.
                  </li>
                  <li>
                    <i class="bi bi-check2-all"></i> That's why we carefully
                    curate our inventory to ensure that every product we offer
                    meets the highest standards of quality and durability.
                  </li>
                </ul>
                <p>
                  Your satisfaction is our top priority. We strive to create a
                  positive and enjoyable shopping experience for every customer.
                  If you ever have any concerns or feedback, please don't
                  hesitate to reach out to our customer service team.
                </p>

                <div class="position-relative mt-4">
                  <img src="assets/img/about-us.jpg" class="img-fluid" alt="" />
                  <a
                    href="https://youtu.be/eI7YEWHnNwE?si=UQDym31s7-mm5RLx"
                    class="glightbox play-btn"
                  ></a>

                  {/* https://www.youtube.com/watch?v=LXb3EKWsInQ */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-us" class="why-us section-bg">
        <div class="container" data-aos="fade-up">
          <div class="row gy-4">
            <div class="col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div class="why-box">
                <h3>Why Choose Products?</h3>
                <p>
                Our hardware store management system offers a comprehensive suite of tools designed to manage inventory, 
                streamline point-of-sale transactions, and optimize overall business operations.
                Experience an intuitive and user-friendly interface that ensures quick adoption and ease of use.
                </p>
                <div class="text-center">
                  <a href="" class="more-btn">
                    Learn More <i class="bx bx-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>

            <div class="col-lg-8 d-flex align-items-center">
              <div class="row gy-4">
                <div class="col-xl-4" data-aos="fade-up" data-aos-delay="200">
                  <div class="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i class="bi bi-clipboard-data"></i>
                    <h4>Corporis voluptates officia eiusmod</h4>
                    <p>
                      Consequuntur sunt aut quasi enim aliquam quae harum
                      pariatur laboris nisi ut aliquip
                    </p>
                  </div>
                </div>

                <div class="col-xl-4" data-aos="fade-up" data-aos-delay="300">
                  <div class="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i class="bi bi-gem"></i>
                    <h4>Ullamco laboris ladore pan</h4>
                    <p>
                      Excepteur sint occaecat cupidatat non proident, sunt in
                      culpa qui officia deserunt
                    </p>
                  </div>
                </div>

                <div class="col-xl-4" data-aos="fade-up" data-aos-delay="400">
                  <div class="icon-box d-flex flex-column justify-content-center align-items-center">
                    <i class="bi bi-inboxes"></i>
                    <h4>Labore consequatur incidid dolore</h4>
                    <p>
                      Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut
                      maiores omnis facere
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <MainHeader />
            <MainFooter />
    </>
  );
}

export default About_Us;
