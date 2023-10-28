import React from 'react'
import Layout from '../components/Layout';
import Shaida from "../images/shaida.jpg";
import Shariq from "../images/shariq.jpeg"

const About = () => {
  return (
    <Layout>
      <div className='about-page'>
        <h4 className='text-center m-5 heading'>Hangul/About</h4>
        <h5 className='sub-heading'>Introduction</h5>
        <p className='text'>Welcome to our enchanting world of Kashmiri Art Paper Mache, where the rich heritage and intricate craftsmanship of the Kashmir Valley come to life through a seamless and convenient online shopping experience. At Hangul, we are dedicated to bringing you the finest and most authentic paper mache creations, all handcrafted with love and precision by the skilled artisans of Kashmir.</p>
      
      <h5 className='sub-heading'>Our Story</h5>
      <p className='text'>Our journey began with a deep appreciation for the exquisite artistry that has been a part of Kashmiri culture for generations. Inspired by the desire to promote and preserve this timeless craft, we embarked on a mission to create a platform that would connect these master artisans with art connoisseurs from all around the world.</p>
      <h5 className='sub-heading'>Our Vision</h5>
      <p className='text'>We aim to be the leading online destination for the Paper Mache art. Our vision is to make these beautiful creations more accessible and to share the rich cultural heritage of Kashmir with the world. We are committed to supporting the artisans and their communities, fostering sustainability, and ensuring the highest quality for our customers.</p>
      <h5 className='sub-heading'>Our Commitment</h5>
      <p className='text'>As an ecommerce platform, we are committed to supporting the artisans of Kashmir by providing them with a global market for their creations. We ensure that they receive fair compensation for their work and that the art of paper mache continues to flourish for generations to come.</p>
      <h5 className='sub-heading'>Contact us</h5>
      <p className='text'> We value your feedback, questions, and inquiries. Please feel free to get in touch with us at syedshaida59991@gmail.com or shariqfirdous11@gmail.com. Your satisfaction is our top priority.  Thank you for being a part of our journey to celebrate the exquisite world of Kashmiri Art Paper Mache. We look forward to bringing a piece of Kashmir's culture and artistry into your life. Warm regards,
        <div className='flex-card text-center'>
          <div className='fw-bold'>
            <img className='avatar m-3' src = {Shaida} alt= "avatar"/>
            <p>Syed Shaida Hussain</p>
            Co-Founder & CTO, Hangul
          </div>
          <div className='fw-bold'>
          <img className='avatar m-3' src = {Shariq} alt= "avatar"/>
            <p>Shariq Firdous</p>
            Co-Founder & CEO, Hangul
          </div>
        </div>
        
       </p>
      </div>

    </Layout>
    
  )
}

export default About