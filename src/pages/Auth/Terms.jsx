import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const modalCloseButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  color: '#333',
};

const termsContent = {
  service:
  `제1조 (목적)
이 약관은 회원(이하 "이용자")이 본 서비스에서 제공하는 모든 기능과 혜택을 이용함에 있어, 회사와 이용자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.

제2조 (서비스 이용)
1. 이용자는 본 약관 및 관련 법령을 준수하여 서비스를 이용해야 하며, 비정상적 또는 부당한 방법으로 서비스를 이용할 수 없습니다.
2. 회사는 서비스의 유지/보수를 위해 정기적 또는 긴급 점검을 수행할 수 있으며, 이로 인해 발생하는 일시적 서비스 중단에 대해 사전 안내합니다.

제3조 (회원 탈퇴 및 자격 상실)
1. 이용자는 언제든지 회원 탈퇴를 요청할 수 있으며, 회사는 즉시 처리합니다.
2. 회사는 이용자가 약관을 위반하거나, 타인에게 피해를 주는 경우 회원 자격을 제한하거나 상실시킬 수 있습니다.

제4조 (면책)
1. 회사는 천재지변, 시스템 장애 등 불가항력으로 인해 발생한 손해에 대해 책임지지 않습니다.
2. 이용자의 부주의 또는 귀책사유로 발생한 손해에 대해서는 책임을 지지 않습니다.
`,
  privacy:
  `[개인정보 수집 및 이용 안내]

회사는 회원가입 및 원활한 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.

■ 수집 항목
- 필수 항목: 이름, 이메일 주소, 휴대전화 번호, 비밀번호

■ 수집 목적
- 회원 식별 및 본인 확인
- 서비스 제공 및 운영
- 고객 문의 응대 및 공지사항 전달

■ 보유 및 이용 기간
- 회원 탈퇴 시 또는 동의 철회 시까지 보유
- 관계 법령에 따라 일정 기간 보관이 필요한 경우 해당 법령에 따름

※ 이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 동의 거부 시 회원가입이 제한될 수 있습니다.
`,
  event:
  `[이벤트 및 혜택 정보 수신 동의 안내]

회사는 회원님께 더 나은 혜택과 다양한 이벤트 정보를 제공하기 위해,  
이메일 또는 문자 메시지를 통해 마케팅 정보를 전송할 수 있습니다.

■ 수신 항목
- 할인/쿠폰 이벤트, 프로모션, 신상품 출시 소식, 서비스 안내 등

■ 전송 수단
- 이메일(E-mail), 문자 메시지(SMS/MMS), 앱 푸시 등

■ 동의 거부 권리
- 본 동의는 선택 사항이며, 동의하지 않아도 회원가입 및 서비스 이용에는 제한이 없습니다.
- 마케팅 수신 동의 이후에도 [마이페이지 > 알림 설정] 또는 고객센터를 통해 언제든지 수신 거부가 가능합니다.
`,
};

export default function Terms() {
  const navigate = useNavigate();

  const [checked, setChecked] = useState({
    service: false,
    privacy: false,
    age: false,
    event: false,
    marketing: false,
    all: false,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalType('');
  };

  const handleChange = (key) => {
    if (key === 'all') {
      const newValue = !checked.all;
      setChecked({
        service: newValue,
        privacy: newValue,
        age: newValue,
        event: newValue,
        marketing: newValue,
        all: newValue,
      });
    } else {
      const newChecked = { ...checked, [key]: !checked[key] };
      newChecked.all =
        newChecked.service && newChecked.privacy && newChecked.age &&
        newChecked.event && newChecked.marketing;
      setChecked(newChecked);
    }
  };

  const handleNext = () => {
    if (isRequiredAllChecked) {
      navigate('/auth?mode=signup'); // ✅ 다음 단계로 이동
    }
  };

  const isRequiredAllChecked = checked.service && checked.privacy && checked.age;

  return (
    <div style={{ padding: '24px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>약관 동의</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label>
            <input type="checkbox" checked={checked.service} onChange={() => handleChange('service')} />
            {' '}<strong style={{ fontSize: '14px'}}><span style={{ color: 'red' }}>*</span>(필수)</strong> 서비스 약관 동의
          </label>
          <button onClick={() => openModal('service')} style={arrowStyle}>▶</button>
        </li>
        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label>
            <input type="checkbox" checked={checked.privacy} onChange={() => handleChange('privacy')} />
            {' '}<strong style={{ fontSize: '14px'}}><span style={{ color: 'red' }}>*</span>(필수)</strong> 개인정보 수집·이용 동의
          </label>
          <button onClick={() => openModal('privacy')} style={arrowStyle}>▶</button>
        </li>
        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label>
            <input type="checkbox" checked={checked.age} onChange={() => handleChange('age')} />
            {' '}<strong style={{ fontSize: '14px'}}><span style={{ color: 'red' }}>*</span>(필수)</strong> 만 14세 이상입니다.
          </label>
        </li>
        <li style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label>
            <input type="checkbox" checked={checked.event} onChange={() => handleChange('event')} />
            {' '}<strong style={{ fontSize: '14px'}}>(선택)</strong> 이벤트 정보 수신 동의
          </label>
          <button onClick={() => openModal('event')} style={arrowStyle}>▶</button>
        </li>
        <li>
          <label>
            <input type="checkbox" checked={checked.marketing} onChange={() => handleChange('marketing')} />
            {' '}<strong style={{ fontSize: '14px'}}>(선택)</strong> 광고성 정보 수신 동의
          </label>
        </li>
      </ul>

      <hr style={{ margin: '16px 0' }} />

      <label>
        <input type="checkbox" checked={checked.all} onChange={() => handleChange('all')} />
        {' '}모두 동의
      </label>

      <p style={{ color: '#999', fontSize: '12px', marginTop: '8px' }}>
        ※ 필수 항목을 모두 체크해야 다음 단계로 진행할 수 있습니다.
      </p>

      <button
        disabled={!isRequiredAllChecked}
        onClick={handleNext}
        style={{
          width: '100%',
          marginTop: '16px',
          padding: '12px 0',
          backgroundColor: isRequiredAllChecked ? '#ED6051' : '#ccc',
          color: '#fff',
          fontSize: '16px',
          border: 'none',
          borderRadius: '6px',
          cursor: isRequiredAllChecked ? 'pointer' : 'not-allowed',
        }}
      >
        다음으로
      </button>

      {/* ✅ 로그인 버튼 Link → navigate 변경 */}
      <div style={{
        display: 'flex',
        gap: '6px',
        marginTop: '8px',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <p style={{
          color: 'rgb(153, 153, 153)',
          fontSize: '13.5px',
          margin: '5px 0 0 0'
        }}>
          이미 가입된 계정이 있으신가요?
        </p>
        <button
          onClick={() => navigate('/auth?mode=login')}
          type="button"
          style={{
            color: 'rgb(106, 109, 117)',
            fontSize: '13.5px',
            fontWeight: 'bold',
            textDecoration: 'underline',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            height: '20px'
          }}
        >
          로그인
        </button>
      </div>

      {/* 모달 영역 */}
      {modalOpen && (
        <div style={modalOverlayStyle} onClick={closeModal}>
          <div
            style={modalContentStyle}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>약관 보기</h3>
              <button onClick={closeModal} style={modalCloseButtonStyle}>✕</button>
            </div>
            <p style={{ whiteSpace: 'pre-wrap' }}>{termsContent[modalType]}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const arrowStyle = {
  marginLeft: '8px',
  background: 'none',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
  padding: 0,
};

const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  background: '#fff',
  padding: '20px',
  width: '90%',
  maxWidth: '500px',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
};
