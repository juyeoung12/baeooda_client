import { useUser } from '../contexts/UserContext';

export default function Profile() {
  const { user } = useUser();

  if (!user) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f9fafb'
      }}>
        <p style={{ color: '#4b5563', fontSize: '18px' }}>로그인이 필요합니다</p>
      </div>
    );
  }

  const profileImgUrl = user.profileImage || '/icons/default-profile.png';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        padding: '40px 48px',
        display: 'flex',
        alignItems: 'center',
        gap: '48px',
        border: '1px solid #e5e7eb',
        width: '740px',
        height: '350px',
        justifyContent: 'center'
      }}>
        {/* 왼쪽: 프로필 이미지와 닉네임 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginRight: '20px'
        }}>
          <img
            src={profileImgUrl}
            alt="프로필 이미지"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '9999px',
              objectFit: 'cover',
              border: '1px solid #d1d5db',
              marginBottom: '16px',
            }}
          />
          <div>
            <span style={{
              color: '#374151',
              fontSize: '17px',
              fontWeight: 500,
              marginRight: '8px'
            }}>
              닉네임: 
              </span>
              {user.nickname || user.name}
            </div>
        </div>

        {/* 세로 구분선 */}
        <div style={{
          width: '1px',
          height: '129px',
          backgroundColor: '#d1d5db'
        }} />

        {/* 오른쪽: 이름, 이메일, 생년월일 */}
        <div style={{
          fontSize: '16px',
          color: '#1f2937',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          marginLeft: '20px'
        }}>
          <div>
            <span style={{ fontWeight: 600, marginRight: '8px' }}>이름: </span>{user?.name || '미입력'}
          </div>
          <div>
            <span style={{ fontWeight: 600, marginRight: '8px' }}>이메일: </span>{user?.email || '미입력'}
          </div>
          <div>
            <span style={{ fontWeight: 600, marginRight: '8px' }}>생년월일: </span>
            {user.birth || '미입력'}
          </div>
        </div>
      </div>
    </div>
  );
}
