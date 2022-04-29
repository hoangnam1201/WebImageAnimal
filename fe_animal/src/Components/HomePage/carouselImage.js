import { Button, TextField } from '@mui/material'
import React from 'react'
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image1 from "../../Assets/image1.jpg"
import Image2 from "../../Assets/image2.jpg"
import Image3 from "../../Assets/image3.jpg"
import Image4 from "../../Assets/image4.jpg"
import Image5 from "../../Assets/image5.jpg"

const CarouselImage = () => {
  return (
    <div className='text-white bg-gray-900 py-12'>
        <div className='flex justify-between mx-16 items-center'>
            <div>
            <h2 className="font-bold text-4xl mb-4">Top free pics this week</h2>
            <h4>Stunning stock images, perfect for blogs and websites</h4>
            </div>
            <Button style={{color:"white", borderColor:"white", height: "50px"}}  variant='outlined'>More pictures</Button>
        </div>
        <div className='py-8 border-b-2 border-gray-400'>
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={4}
          navigation
        >
          <SwiperSlide><img src={Image1} alt="image1"/></SwiperSlide>
          <SwiperSlide><img src={Image2} alt="image2"/></SwiperSlide>
          <SwiperSlide><img src={Image3} alt="image3"/></SwiperSlide>
          <SwiperSlide><img src={Image4} alt="image4"/></SwiperSlide>
          <SwiperSlide><img src={Image5} alt="image5"/></SwiperSlide>
        </Swiper>
        </div>
        <div className='flex justify-between items-center px-20 py-20 border-b-2 border-gray-400'>
          <div>
          <h2 className='font-bold text-xl'>Get first access to free photos and other Burst content.</h2>
          <h2 className='font-bold text-xl'>Unsubscribe anytime.</h2>
          </div>
          <div>
            <TextField label="Your email address" variant='outlined' className='bg-white text-gray-500'/>
            <Button variant='contained' color="success" className="h-14 w-28">Submit</Button>
          </div>
        </div>
    </div>
  )
}

export default CarouselImage