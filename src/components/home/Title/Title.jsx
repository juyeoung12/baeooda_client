import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { dummyCourses } from '../../../data/dummyCourses';

const keywords = [
  { text: '프론트엔드' },
  { text: '마케팅' },
  { text: '사주' },
  { text: '글쓰기' },
  { text: '자격증 준비' },
  { text: '디자인' },
  { text: '타로' },
];

const Title = () => {
  const [keyword, setKeyword] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [recentKeywords, setRecentKeywords] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('recentKeywords'));
      if (Array.isArray(saved)) {
        setRecentKeywords(saved);
      } else {
        setRecentKeywords([]);
      }
    } catch (e) {
      console.error('최근 검색어 파싱 실패:', e);
      localStorage.removeItem('recentKeywords');
      setRecentKeywords([]);
    }
  }, []);

  useEffect(() => {
    const trimmed = keyword.trim().toLowerCase();
    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    const filtered = dummyCourses
      .filter(course => course.title.toLowerCase().includes(trimmed))
      .map(course => {
        const regex = new RegExp(`(${trimmed})`, 'gi');
        const parts = course.title.split(regex);
        return parts.map((part, i) =>
          regex.test(part)
            ? <Highlighted key={i}>{part}</Highlighted>
            : <span key={i}>{part}</span>
        );
      });

    setSuggestions(filtered.slice(0, 6));
  }, [keyword]);

  const saveKeyword = (kw) => {
    const updated = [kw, ...recentKeywords.filter(k => k !== kw)].slice(0, 5);
    setRecentKeywords(updated);
    localStorage.setItem('recentKeywords', JSON.stringify(updated));
  };

  const handleSearch = (term) => {
    let raw = '';

    if (Array.isArray(term)) {
      raw = term.map(t => {
        if (typeof t === 'string') return t;
        if (React.isValidElement(t)) return t.props?.children || '';
        return '';
      }).join('');
    } else if (typeof term === 'string') {
      raw = term;
    }

    raw = raw.trim();
    if (!raw) return;

    saveKeyword(raw);
    navigate('/search', { state: { keyword: raw } });

    setKeyword('');
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch(keyword);
  };

  const deleteRecent = (item) => {
    const updated = recentKeywords.filter(k => k !== item);
    setRecentKeywords(updated);
    localStorage.setItem('recentKeywords', JSON.stringify(updated));
  };

  const clearAllRecent = () => {
    setRecentKeywords([]);
    localStorage.removeItem('recentKeywords');
  };

  return (
    <div style={{ width: '1350px', display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, minWidth: '300px' }}>
        <p style={{ fontSize: '34px', fontWeight: 'bold', margin: '30px 0 31px 20px' }}>
          취미부터 커리어까지, <br />당신에게 딱 맞는 배움을 만나보세요
        </p>

        {/* 검색창 */}
        <div ref={wrapperRef} style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="어떤 강의를 찾으시나요?"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={handleKeyDown}
            style={{
              border: isFocused ? '3px solid #49ACB5' : '3px solid rgba(111, 180, 210, 0.41)',
              borderRadius: '22px',
              padding: '18px 30px',
              fontSize: '15px',
              fontWeight: 'bold',
              width: '550px',
              marginBottom: '10px',
              color: '#535455',
              transition: 'border 0.3s',
              outline: 'none',
            }}
          />

          {/* 자동완성 & 최근 검색어 */}
          {isFocused && (
            <div style={{
              position: 'absolute',
              top: '60px',
              background: 'white',
              border: '1px solid #ccc',
              borderRadius: '8px',
              width: '610px',
              zIndex: 10,
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              padding: '10px 0'
            }}>
              {suggestions.length > 0 ? (
                suggestions.map((item, idx) => (
                  <HoverableItem
                    key={idx}
                    onMouseDown={() => {
                      const rawText = (() => {
                        if (typeof item === 'string') return item;
                        if (Array.isArray(item)) {
                          return item.map(part => {
                            if (typeof part === 'string') return part;
                            if (React.isValidElement(part)) return part.props?.children || '';
                            return '';
                          }).join('');
                        }
                        if (React.isValidElement(item)) return item.props?.children || '';
                        return '';
                      })();
                      handleSearch(rawText);
                    }}
                  >
                    <span style={{ padding: '4px 0' }}>{item}</span>
                  </HoverableItem>
                ))
              ) : (
                <>
                  {recentKeywords.length > 0 && (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px 20px',
                          fontWeight: 'bold',
                        }}
                      >
                        <span style={{ fontSize: '14px' }}>최근 검색어</span>
                        <button
                          onMouseDown={clearAllRecent}
                          style={{
                            fontSize: '12px',
                            background: 'none',
                            border: 'none',
                            color: '#999',
                            cursor: 'pointer',
                          }}
                        >
                          전체 삭제
                        </button>
                      </div>

                      {recentKeywords.map((item, idx) => (
                        <HoverableItem
                          key={idx}
                          onMouseDown={() => handleSearch(item)}
                        >
                          <span style={{ display: 'flex', gap: '15px', padding: '6px 0' }}>
                            <img src="/icons/rotate_left.svg" alt="" style={{ width: '18px' }} />
                            {item}
                          </span>
                          <button
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              deleteRecent(item);
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#888',
                              cursor: 'pointer',
                            }}
                          >
                            ×
                          </button>
                        </HoverableItem>
                      ))}
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* 추천 키워드 */}
        <div style={{
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap',
          marginLeft: '20px',
          marginTop: '15px',
          position: 'relative',
          zIndex: 0
        }}>
          {keywords.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(item.text)}
              style={{
                backgroundColor: 'rgb(240, 242, 242)',
                border: 'none',
                color: 'rgb(89, 90, 90)',
                fontSize: '14px',
                cursor: 'pointer',
                padding: '10px 15px',
                borderRadius: '16px',
              }}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>

      {/* 오른쪽 일러스트 */}
      <div>
        <img
          src="/images/title_img_01.png"
          alt="타이틀 일러스트"
          style={{ width: '332px', height: '332px', paddingRight: '80px' }}
        />
      </div>
    </div>
  );
};

const Highlighted = styled.span`
  font-weight: bold;
  color: #f76f15;
`;

const HoverableItem = styled.div`
  padding: 5px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #f1f5f9;
  }
`;

export default Title;
