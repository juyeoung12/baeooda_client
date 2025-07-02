import React from 'react'

const CourseTypeSection = () => {
  const CourseTypeCard = ({ type }) => {
    const isFree = type === 'free'

    const title = isFree ? '무료 강의' : '유료 강의'
    const description = isFree
      ? '가볍게 즐기면서 공부하자 !'
      : '퀄리티 있는 강의를 원한다면?'
    const background = isFree
      ? 'url(/images/bg_free.jpg)' // 예: 공처럼 보이는 배경
      : 'url(/images/bg_paid.jpg)' // 예: 그림 같은 배경

    return (
      <div
        style={{
          width: '47%',
          height: '280px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '50px',
          boxSizing: 'border-box',
          backgroundImage: `linear-gradient(to right, white 50%, transparent 90%), ${background}`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: 'transform 0.3s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.02)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#4E7CC2' }}>
          {title}
        </div>
        <div style={{ fontSize: '16px', color: '#666' }}>{description}</div>

        <div
          style={{
            alignSelf: 'flex-end',
            width: '40px',
            height: '40px',
            backgroundColor: '#4E7CC2',
            borderRadius: '50%',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
          }}
        >
          &rarr;
        </div>
      </div>
    )
  }

  return (
    <section style={{ width: '1350px' }}>
      {/* 타이틀 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        maxWidth: '1350px',
        marginTop: 0, 
        paddingTop: 0, 
        marginBottom: '19px',
      }}>
        <h2 style={{ marginBottom: '10px', fontSize: '22px'}}>강의비 걱정은 이제 그만</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CourseTypeCard type="free" />
        <CourseTypeCard type="paid" />
      </div>
    </section>
  )
}

export default CourseTypeSection
