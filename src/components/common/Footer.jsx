import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ padding: '50px 0', backgroundColor: '#F0F0F0', width: '100vw'}}>
        <div style={{ }}>

            {/* 윗줄 */}
            <div style={{ maxWidth: '1350px', width: '100%', margin: '0 auto', display:'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>

                {/* 링크 목록 */}
                <div style={{ display:'flex', gap: '30px' }}>
                    <Link to="/login" style={{ fontSize: '14px', color: '#565656'  }} >공지사항</Link>
                    <Link to="/login" style={{ fontSize: '14px', color: '#565656'  }} >이용약관</Link>
                    <Link to="/login" style={{ fontSize: '14px', color: '#565656', fontWeight: 'bold'}} >개인정보처리방침</Link>
                    <Link to="/login" style={{ fontSize: '14px', color: '#565656'  }} >FAQ</Link>
                    <Link to="/login" style={{ fontSize: '14px', color: '#565656'  }} >문의하기</Link>
                    <Link to="/login" style={{ fontSize: '14px', color: '#565656'  }} >환불규정</Link>
                </div>

                {/* 소셜 버튼들 (노, 피, 깃) */}
                <div style={{ gridColumn: 2, display: 'flex', justifyContent: 'end', gap: '20px',  }}>
                    <Link to="/login" style={{ display: 'inline-block',}}>
                        <img
                        src="/icons/sns_kakao.svg"
                        alt="카카오톡"
                        style={{
                            width: '23px',
                            height: '23px',
                            display: 'block',
                            borderRadius: '50px',
                        }}
                        />
                    </Link>
                    <Link to="/login" style={{ display: 'inline-block' }}>
                        <img
                        src="/icons/sns_insta.svg"
                        alt="인스타그램"
                        style={{
                            width: '23px',
                            height: '23px',
                            display: 'block',
                            borderRadius: '50px',
                        }}
                        />
                    </Link>
                    <Link to="/login" style={{ display: 'inline-block' }}>
                        <img
                        src="/icons/sns_youtube.svg"
                        alt="유튜브"
                        style={{
                            width: '23px',
                            height: '23px',
                            display: 'block',
                            borderRadius: '50px',
                        }}
                        />
                    </Link>
                </div>
            </div>

            <hr style={{
                width: '1350px',
                border: 'none',
                height: '1px',
                backgroundColor: '#C2CBD3',
                margin: '0 auto',
                }}
            />

            {/* 로고 및 링크 */}
            <div style={{
                width: '1350px',
                display: 'flex',
                padding: '20px 0 50px 0',
                justifyContent: 'space-between',
                alignItems: 'end',
                margin: '0 auto',
                }}>
                
                <div style={{ gridColumn: 1, display: 'flex', alignItems: 'end', gap: '20px' }}>
                    
                {/* 고객문의 */}
                <div>

                        <h2 style={{ fontSize: '16px', margin: '0' }}>고객센터</h2>
                        <p style={{ fontSize: '13px', margin: '5px 0 12px 0' }}>주중 10시~18시 / 주말 및 공휴일 제외</p>

                    <button style={{ border:'1px solid #999999', fontSize: '13px', padding:'14px 40px' }}>챗봇으로 문의하기</button>
                </div>
                    {/* 회사 정보 */}
                    <div>
                        <p style={{ fontSize: '13px', margin: '0 0 5px 0', color: 'rgb(155, 155, 155)' }}>
                        회사명: 배우다(주) ｜ 대표: 홍지원, 이주영 ｜ 사업자등록번호 123-45-67890 ｜
                        서울시 영등포구 여의도동 12-3 빌딩 ｜
                        </p>
                        <p style={{ fontSize: '13px', margin: 0, color: 'rgb(155, 155, 155)' }}>
                        대표전화: 070-1234-5678 ｜ 이메일: asd@fghjk.co.kr
                        </p>
                    </div>


                    {/* 로고 */}
                    {/* <h1 style={{ margin: 0 }}>
                        <img src="/public/logo_black.svg" alt="로고" style={{ height:'25px', }}/>
                    </h1> */}
                </div>

                {/* 모바일 앱 스토어 버튼 */}
                <div style={{ gridColumn: 2, display: 'flex', gap: '12px', }}>
                    <a
                    href="https://www.apple.com/app-store/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex', width: '150px', alignItems: 'center',
                        backgroundColor: 'black', fontSize: '14px', color: 'white', padding: '5px 0', borderRadius: '10px', gap: '8px' }}
                        >
                        <img
                        src="/icons/store_app.svg"
                        alt="앱스토어"
                        style={{
                            width: '28px',
                            height: '28px',
                            display: 'block',
                            marginLeft: '15px' 
                        }}
                        />
                        <div style={{display:'flex',flexDirection: 'column',}}>
                            App Store
                            <span style={{ fontSize: '9px', margin: '0 0 2px 0' }}>다운로드하기</span>
                        </div>
                    </a>

                    <a
                        href="https://play.google.com/store/apps/details?id=kr.co.devstory.vocat&hl=ko"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                    display: 'flex', width: '150px', alignItems: 'center',
                    backgroundColor: 'black', fontSize: '14px', color: 'white', padding: '5px 0', borderRadius: '10px', gap: '5px' }}
                    >
                        <img
                        src="/icons/store_google.svg"
                        alt="구글 플레이스토어"
                        style={{
                            width: '28px',
                            height: '28px',
                            display: 'block',
                            marginLeft: '15px' 
                        }}
                        />
                        <div style={{display:'flex',flexDirection: 'column',}}>
                            Google Play
                            <span style={{ fontSize: '9px', margin: '0 0 2px 0' }}>다운로드하기</span>
                        </div>
                    </a>
                </div>

            </div>
        </div>
</footer>

  )
}

export default Footer