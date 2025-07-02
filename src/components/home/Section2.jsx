// ✅ Section2.jsx
import { Link } from 'react-router-dom'
import React from 'react'
import Slider from 'react-slick'
import { newCourses } from '../../data/homeCourses';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CourseCards = ({ data }) => (
  <Link
    to={`/courses/${encodeURIComponent(data.title)}`}
    state={{
      image: data.image,
      detailImage: data.detailImage,
      desc: data.desc,
      level: data.info.level,
      day: data.info.day,
      time: data.info.time,
      price: data.price,
      originalPrice: data.originalPrice,
      discount: data.discount
    }}
    style={{ textDecoration: 'none', color: 'inherit' }}
  >
    <div
      style={{
        width: '226px',
        height: '280px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.3s',
        position: 'relative',
        margin: '10px auto'
      }}
      onMouseEnter={e => {
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1.07)';
      }}
      onMouseLeave={e => {
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1)';
      }}
    >
      <div
        style={{
          width: '100%',
          height: '140px',
          overflow: 'hidden',
          borderRadius: '10px'
        }}
      >
        <img
          src={data.image}
          alt={data.title}
          style={{
            width: '100%',
            height: '140px',
            objectFit: 'cover',
            transition: 'transform 0.3s',
          }}
        />
      </div>
      <div style={{ padding: '5px 0' }}>
        {data.tag && (
          <div style={{ display: 'flex', gap: '7px', margin: '7px 0' }}>
            {data.tag.map((t, i) => (
              <span
                key={i}
                style={{
                  color: '#787878',
                  borderRadius: '5px',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  padding: '4px 11px',
                  backgroundColor: '#ededed',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
        <h3 style={{ fontSize: '14px', fontWeight: '400', margin: '9px 0 0 0', color: '#213547' }}>
          {data.title}
        </h3>
        <div
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            marginTop: '7px'
          }}
        >
          <span style={{ color: '#D45757', marginRight: '6px' }}>{data.discount}</span>
          <span
            style={{
              fontSize: '12px',
              textDecoration: 'line-through',
              color: '#aaa',
              marginRight: '8px',
            }}
          >
            {data.originalPrice}
          </span>
          {data.price}
        </div>
      </div>
    </div>
  </Link>
);

const CustomNextArrow = ({ onClick }) => (
  <div onClick={onClick} style={{ position: 'absolute', right: 0, top: '-22px', transform: 'translateY(-50%)', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
    <svg width="30" height="30" viewBox="0 0 20 20" fill="none">
      <path d="M8 6L12 10L8 14" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
)

const CustomPrevArrow = ({ onClick }) => (
  <div onClick={onClick} style={{ position: 'absolute', right: '50px', top: '-22px', transform: 'translateY(-50%)', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
    <svg width="30" height="30" viewBox="0 0 20 20" fill="none">
      <path d="M12 6L8 10L12 14" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
)

const NewSection = () => {
  const sliderSettings = {
    infinite: false,
    slidesToShow: 5.4,
    slidesToScroll: 1,
    arrows: true,
    centerMode: false,
  }

  return (
    <section style={{ maxWidth: '1350px', margin: '0 auto', padding: '0 20px' }}>
      <h2 style={{ marginBottom: '10px', fontSize: '22px'}}>이번달 신규 클래스</h2>
      <div style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box' }}>
        <Slider {...sliderSettings} nextArrow={<CustomNextArrow />} prevArrow={<CustomPrevArrow />}>
          {newCourses.map((data, idx) => (<CourseCards key={idx} data={data} />))}
        </Slider>
      </div>
      <Link to="/courses" style={{ textAlign:'end' }}>
        <h3 style={{ padding:'0px 10px',  fontSize:'16px', color: '#717171' }}>더보기 →</h3>
      </Link>
    </section>
  )
}

export default NewSection

