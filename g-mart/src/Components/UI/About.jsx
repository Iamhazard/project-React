import React from "react";
import leaf from "../Assets/leaf.png";

const About = () => {
  return (
    <section className="bg-gray-100 min-h-screen">
      <nav className="bg-green-500 p-4 text-white">
        <div className="container mx-auto">
          <h1 className="text-2xl font-semibold">G-Mart</h1>
        </div>
      </nav>

      <div className="container mx-auto p-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <img
              src={leaf}
              alt="Grocery Store"
              className="rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to G-Mart! We are your one-stop shop for all your grocery
              needs. With over 5 years of experience in the industry, we take
              pride in offering high-quality products at affordable prices. Our
              mission is to make grocery shopping convenient and enjoyable for
              you and your family.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              At G-Mart, we source fresh produce, pantry staples, household
              items, and more from local farmers and trusted suppliers. We are
              committed to sustainability and reducing our environmental
              footprint, so you can shop with confidence knowing that we
              prioritize eco-friendly practices.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Whether you're looking for fresh fruits and vegetables, organic
              products, or everyday essentials, we've got you covered. Our
              friendly and knowledgeable staff is here to assist you, and our
              convenient online ordering and delivery services make shopping
              with us even easier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
