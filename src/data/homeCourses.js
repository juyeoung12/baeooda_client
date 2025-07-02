// Section1: 카테고리별 베스트 강의
 const bestCourses = {
  'IT·디지털': [
    {
      id: 'b1',
      title: 'UX/UI 디자인부터 시작하는 프론트엔드',
      desc: '초보자도 할 수 있는\nUX/UI 디자인 프론트엔드',
      mainCategory: 'IT·디지털',
      subCategory: '프로그래밍',
      discount: '31%',
      sale: '75,000',
      original: '109,000',
      image: '/images/best1.jpg',
      listImage: '/images/best1_3.jpg',
      detailImage: '/images/best1_2.jpg',
      author: '김지훈',
      tag: ['프론트엔드'],
      info: { level: '초급', day: '60일', time: '1년' },
      options: {
        '1년 수강': { original: '109,000', sale: '75,000' },
        '무제한 수강': { original: '139,000', sale: '99,000' }
      }
    },
    {
      id: 'b2',
      title: '딥러닝 개발, 풀스택 클래스',
      desc: '이젠 알 수 있다,\n풀스택 딥러닝',
      mainCategory: 'IT·디지털',
      subCategory: '프로그래밍',
      discount: '26%',
      sale: '139,000',
      original: '189,000',
      image: '/images/best2.jpg',
      listImage: '/images/best2_3.jpg',
      detailImage: '/images/best2_2.jpg',
      author: '이지민',
      tag: ['풀스택', '딥러닝'],
      info: { level: '고급', day: '150일', time: '1년' },
      options: {
        '1년 수강': { original: '189,000', sale: '139,000' },
        '무제한 수강': { original: '219,000', sale: '159,000' }
      }

    },
    {
      id: 'b3',
      title: '추억을 담는 방법,\n영상편집 입문',
      desc: '추억을 남겨요.\n사진을 남겨요',
      mainCategory: 'IT·디지털',
      subCategory: '사진/영상',
      discount: '34%',
      sale: '19,000',
      original: '29,000',
      image: '/images/best3.jpg',
      listImage: '/images/best3_3.jpg',
      detailImage: '/images/best3_2.jpg',
      author: '박수연',
      tag: ['영상','편집'],
      info: { level: '초급', day: '14일', time: '1년' },
      options: {
        '1년 수강': { original: '29,000', sale: '19,000' },
        '무제한 수강': { original: '39,000', sale: '28,000' }
      }

    },
    {
      id: 'b4',
      title: '노코드부터 시작하는\n개발 자동화',
      desc: '코딩 몰라도 OK,\n자동화 툴 시작하기',
      mainCategory: 'IT·디지털',
      subCategory: '프로그래밍',
      discount: '33%',
      sale: '33,000',
      original: '49,000',
      image: '/images/best4.jpg',
      listImage: '/images/best4_3.jpg',
      detailImage: '/images/best4_2.jpg',
      author: '정성우',
      tag: ['프로그래밍', '툴'],
      info: { level: '중급', day: '25일', time: '6개월' },
      options: {
        '1년 수강': { original: '49,000', sale: '33,000' },
        '무제한 수강': { original: '69,000', sale: '47,000' }
      }

    },
    {
      id: 'b5',
      title: '감성을 담은\n풍경 사진 촬영 입문',
      desc: '스마트폰과 카메라로 담는\n빛과 계절의 조화',
      mainCategory: 'IT·디지털',
      subCategory: '사진/영상',
      discount: '25%',
      sale: '45,000',
      original: '60,000',
      image: '/images/best5.jpg',
      listImage: '/images/best5_3.jpg',
      detailImage: '/images/best5_2.jpg',
      author: '정호연',
      tag: ['풍경사진', '사진', '사진기초'],
      info: { level: '초급', day: '30일', time: '6개월' },
      options: {
        '1년 수강': { original: '60,000', sale: '45,000' },
        '무제한 수강': { original: '75,000', sale: '55,000' }
      }
    }

  ],

  '비즈니스·경제': [
    {
      id: 'b6',
      title: '디지털 마케팅 첫걸음\nSNS부터 광고까지',
      desc: '성공을 위한 첫걸음\n마케팅 A to Z',
      listImage: '/images/best6_3.jpg',
      detailImage: '/images/best6_2.jpg',
      image: '/images/best6.jpg',
      sale: '89,000',
      original: '120,000',
      discount: '26%',
      mainCategory: '비즈니스·경제',
      subCategory: '마케팅 입문',
      author: '김서영',
      tag: ['디지털 마케팅'],
      info: { level: '중급', day: '70일', time: '1년' },
       options: {
        '1년 수강': { original: '120,000', sale: '89,000' },
        '무제한 수강': { original: '145,000', sale: '105,000' }
      }

    },
    {
      id: 'b7',
      title: '숫자로 배우는 비즈니스\n기초 재무관리 입문',
      desc: '회계부터 투자까지\n핵심만 담은 실무 재무 입문',
      listImage: '/images/best7_3.jpg',
      detailImage: '/images/best7_2.jpg',
      image: '/images/best7.jpg',
      sale: '76,000',
      original: '109,000',
      discount: '30%',
      mainCategory: '비즈니스·경제',
      subCategory: '파이낸스 기초',
      author: '박지훈',
      tag: ['재무', '회계', '실무재무'],
      info: { level: '고급', day: '50일', time: '1년' },
        options: {
        '1년 수강': { original: '109,000', sale: '76,000' },
        '무제한 수강': { original: '135,000', sale: '98,000' }
      }

    },
    {
      id: 'b8',
      title: '나만의 사업 시작하기\n실전 창업 전략',
      desc: '비즈니스 모델\n실전 창업 전략',
      listImage: '/images/best8_3.jpg',
      detailImage: '/images/best8_2.jpg',
      image: '/images/best8.jpg',
      sale: '68,000',
      original: '99,000',
      discount: '31%',
      mainCategory: '비즈니스·경제',
      subCategory: '창업 전략',
      author: '이승연',
      tag: ['창업', '비즈니스모델'],
      info: { level: '초급', day: '60일', time: '1년' },
       options: {
        '1년 수강': { original: '99,000', sale: '68,000' },
        '무제한 수강': { original: '129,000', sale: '90,000' }
      }

    },
    {
      id: 'b9',
      title: '비즈니스 협상의 기술\n상황별 전략 익히기',
      desc: '투자자 설득, 파트너십 협상 등\n스타트업을 위한 실전 협상 전략',
      listImage: '/images/best9_3.jpg',
      detailImage: '/images/best9_2.jpg',
      image: '/images/best9.jpg',
      sale: '55,000',
      original: '82,000',
      discount: '33%',
      mainCategory: '비즈니스·경제',
      subCategory: '창업 전략',
      author: '정우진',
      tag: ['창업', '협상', '사업개발'],
      info: { level: '중급', day: '40일', time: '6개월' },
        options: {
        '1년 수강': { original: '82,000', sale: '55,000' },
        '무제한 수강': { original: '105,000', sale: '77,000' }
      }

    },
    {
      id: 'b10',
      title: '성장 전략 시장 속\n 나만의 자리 만들기',
      desc: '브랜드의 시작,\n가치를 설계하는 전략',
      listImage: '/images/best10_3.jpg',
      detailImage: '/images/best10_2.jpg',
      image: '/images/best10.jpg',
      sale: '79,000',
      original: '114,000',
      discount: '31%',
      mainCategory: '비즈니스·경제',
      subCategory: '경영 전략',
      author: '최지은',
      tag: ['브랜딩', '전략'],
      info: { level: '중급', day: '75일', time: '1년' },
      options: {
        '1년 수강': { original: '114,000', sale: '79,000' },
        '무제한 수강': { original: '145,000', sale: '101,000' }
      }

    }
  ],
  '생활·실무': [
    {
      id: 'b11',
      title: '실무 바로 적용!\n오피스 문서 작성 스킬',
      desc: '문서작성부터 데이터분석까지\n실무에 바로 쓰는 팁',
      listImage: '/images/best11_3.jpg',
      detailImage: '/images/best11_2.jpg',
      image: '/images/best11.jpg',
      sale: '42,000',
      original: '59,000',
      discount: '29%',
      mainCategory: '생활·실무',
      subCategory: '실무 문서 작성법',
      author: '윤하늘',
      tag: ['오피스', '문서작성'],
      info: { level: '중급', day: '45일', time: '1년' },
      options: {
        '1년 수강': { original: '59,000', sale: '42,000' },
        '무제한 수강': { original: '79,000', sale: '59,000' }
      }

    },
    {
      id: 'b12',
      title: '단기 합격을 위한\n자격증 시험 완전 정복',
      desc: '자격증 따는 실전 공부법',
      listImage: '/images/best12_3.jpg',
      detailImage: '/images/best12_2.jpg',
      image: '/images/best12.jpg',
      sale: '33,000',
      original: '48,000',
      discount: '31%',
      mainCategory: '생활·실무',
      subCategory: '자격증 준비',
      author: '정예슬',
      tag: ['자격증', '시험대비'],
      info: { level: '초급', day: '20일', time: '1년' },
      options: {
        '1년 수강': { original: '48,000', sale: '33,000' },
        '무제한 수강': { original: '65,000', sale: '48,000' }
      }
    },
    {
      id: 'b13',
      title: '지루한 업무 끝!\n자동화로 시간 절약하기',
      desc: '효율적인 일처리\n업무 자동화',
      listImage: '/images/best13_3.jpg',
      detailImage: '/images/best13_2.jpg',
      image: '/images/best13.jpg',
      sale: '58,000',
      original: '84,000',
      discount: '31%',
      mainCategory: '생활·실무',
      subCategory: '업무 자동화',
      author: '한도윤',
      tag: ['자동화', '업무 팁'],
      info: { level: '고급', day: '40일', time: '1년' },
      options: {
        '1년 수강': { original: '84,000', sale: '58,000' },
        '무제한 수강': { original: '105,000', sale: '76,000' }
      }

    },
    {
      id: 'b14',
      title: '하루 10분 정리법\n쾌적한 공간 만들기',
      desc: '정리 습관과 문서 정리 스킬을\n업무와 생활에 바로 적용',
      listImage: '/images/best14_3.jpg',
      detailImage: '/images/best14_2.jpg',
      image: '/images/best14.jpg',
      sale: '27,000',
      original: '39,000',
      discount: '31%',
      mainCategory: '생활·실무',
      subCategory: '실무 문서 작성법',
      author: '이해인',
      tag: ['정리정돈', '문서관리', '생활스킬'],
      info: { level: '초급', day: '15일', time: '6개월' },
      options: {
        '1년 수강': { original: '39,000', sale: '27,000' },
        '무제한 수강': { original: '54,000', sale: '38,000' }
      }

    },
    {
      id: 'b15',
      title: '몰입과 성과를 높이는\n시간관리 실전 전략',
      desc: '루틴과 자동화 툴을 활용해\n반복 업무 시간을 절반으로',
      listImage: '/images/best15_3.jpg',
      detailImage: '/images/best15_2.jpg',
      image: '/images/best15.jpg',
      sale: '36,000',
      original: '52,000',
      discount: '31%',
      mainCategory: '생활·실무',
      subCategory: '업무 자동화',
      author: '최은호',
      tag: ['시간관리', '업무자동화', '생산성'],
      info: { level: '중급', day: '30일', time: '6개월' },
      options: {
        '1년 수강': { original: '52,000', sale: '36,000' },
        '무제한 수강': { original: '69,000', sale: '48,000' }
      }

    }

  ],
  '예술·교양': [
    {
      id: 'b16',
      title: '마음을 담아 쓰는 글\n에세이로 표현하기',
      desc: '나만의 생각을 기록하기\n감성 글쓰기',
      listImage: '/images/best16_3.jpg',
      detailImage: '/images/best16_2.jpg',
      image: '/images/best16.jpg',
      sale: '25,000',
      original: '35,000',
      discount: '29%',
      mainCategory: '예술·교양',
      subCategory: '글쓰기',
      author: '장예슬',
      tag: ['에세이', '글쓰기'],
      info: { level: '초급', day: '10일', time: '1년' },
      options: {
        '1년 수강': { original: '35,000', sale: '25,000' },
        '무제한 수강': { original: '49,000', sale: '35,000' }
      }

    },
    {
      id: 'b17',
      title: '한 곡 완주!\n입문자를 위한 피아노 클래스',
      desc: '음악의 기초부터\n나만의 연주까지',
      listImage: '/images/best17_3.jpg',
      detailImage: '/images/best17_2.jpg',
      image: '/images/best17.jpg',
      sale: '41,000',
      original: '59,000',
      discount: '30%',
      mainCategory: '예술·교양',
      subCategory: '음악',
      author: '이도윤',
      tag: ['악기', '취미'],
      info: { level: '중급', day: '20일', time: '1년' },
      options: {
        '1년 수강': { original: '59,000', sale: '41,000' },
        '무제한 수강': { original: '79,000', sale: '58,000' }
      }

    },
    {
      id: 'b18',
      title: '캘리그라피 입문',
      desc: '손글씨로 전하는 감성',
      listImage: '/images/best18_3.jpg',
      detailImage: '/images/best18_2.jpg',
      image: '/images/best18.jpg',
      sale: '19,000',
      original: '27,000',
      discount: '30%',
      mainCategory: '예술·교양',
      subCategory: '캘리그라피',
      author: '고하영',
      tag: ['감성취미', '캘리그라피'],
      info: { level: '초급', day: '5일', time: '1년' },
      options: {
        '1년 수강': { original: '27,000', sale: '19,000' },
        '무제한 수강': { original: '39,000', sale: '27,000' }
      }

    },
    {
      id: 'b19',
      title: '마음이 편해지는 컬러링 클래스',
      desc: '색과 선으로 감성을 표현하는 시간',
      listImage: '/images/best19_3.jpg',
      detailImage: '/images/best19_2.jpg',
      image: '/images/best19.jpg',
      sale: '29,000',
      original: '42,000',
      discount: '31%',
      mainCategory: '예술·교양',
      subCategory: '캘리그라피',
      author: '정현우',
      tag: ['컬러링', '감성표현', '캘리그라피'],
      info: { level: '초급', day: '15일', time: '6개월' },
      options: {
        '1년 수강': { original: '42,000', sale: '29,000' },
        '무제한 수강': { original: '58,000', sale: '39,000' }
      }

    },
    {
      id: 'b20',
      title: '찰나를 남기다\n감성 필름 사진 입문',
      desc: '사진과 글로 남기는 나만의 감성 아카이빙',
      listImage: '/images/best20_3.jpg',
      detailImage: '/images/best20_2.jpg',
      image: '/images/best20.jpg',
      sale: '44,000',
      original: '62,000',
      discount: '29%',
      mainCategory: '예술·교양',
      subCategory: '글쓰기',
      author: '배지훈',
      tag: ['사진', '글쓰기', '기록', '감성'],
      info: { level: '중급', day: '30일', time: '1년' },
       options: {
        '1년 수강': { original: '62,000', sale: '44,000' },
        '무제한 수강': { original: '85,000', sale: '62,000' }
      }

    }
  ]
};
// Section2: 신규 강의
 const newCourses = [
  {
    id: 'n1',
    title: '무작정 암기는 이제 그만! 함께 보는 타로 이야기',
    desc: '카드의 상징을 이해하며 타로 리딩 감각 키우기',
    detailImage: '/images/new1_2.jpg',
    image: '/images/new1.jpg',
    sale: '49,000',
    original: '69,000',
    discount: '29%',
    mainCategory: '예술·교양',
    subCategory: '타로/사주',
    author: '정예린',
    tag: ['타로', '힐링'],
    info: { level: '초급', day: '35일', time: '1년' },
    options: {
        '1년 수강': { original: '69,000', sale: '49,000' },
        '무제한 수강': { original: '89,000', sale: '63,000' }
      }
  },
  {
    id: 'n2',
    title: '디자이너처럼 생각하기, 피그마로 배우는 실전 디자인',
    desc: '기획부터 프로토타이핑까지 피그마 실전 활용법 익히기',
    detailImage: '/images/new4_2.jpg',
    image: '/images/new4.jpg',
    sale: '59,000',
    original: '89,000',
    discount: '34%',
    mainCategory: '디자인',
    subCategory: '피그마',
    author: '윤세진',
    tag: ['디자인툴', '피그마'],
    info: { level: '초급', day: '40일', time: '1년' },
    options: {
        '1년 수강': { original: '89,000', sale: '59,000' },
        '무제한 수강': { original: '109,000', sale: '75,000' }
      }

  },
  {
    id: 'n3',
    title: '셔터 누르기 부터 시작 [스냅 촬영 기초 강의]',
    desc: '빛과 구도를 활용해 감성적인 스냅 사진 촬영 노하우 배우기',
    detailImage: '/images/new3_2.jpg',
    image: '/images/new3.jpg',
    sale: '33,000',
    original: '45,000',
    discount: '27%',
    mainCategory: 'IT·디지털',
    subCategory: '사진/영상',
    author: '임도연',
    tag: ['사진', '촬영', '스냅'],
    info: { level: '중급', day: '10일', time: '1년' },
    options: {
        '1년 수강': { original: '45,000', sale: '33,000' },
        '무제한 수강': { original: '65,000', sale: '48,000' }
      }

  },
  {
    id: 'n4',
    title: '브랜드의 시작, 나만의 가치를 설계하는 비즈니스 전략',
    desc: '브랜딩의 본질과 전략 수립을 통해 나만의 브랜드 기획',
    detailImage: '/images/new5_2.jpg',
    image: '/images/new5.jpg',
    sale: '64,000',
    original: '84,000',
    discount: '24%',
    mainCategory: '비즈니스/경제',
    subCategory: '마케팅 입문',
    author: '조수민',
    tag: ['비즈니스 전략', '브랜딩'],
    info: { level: '중급', day: '75일', time: '1년' },
    options: {
        '1년 수강': { original: '84,000', sale: '64,000' },
        '무제한 수강': { original: '109,000', sale: '78,000' }
      }

  },
  {
    id: 'n5',
    title: '보고서부터 자동화까지, 실무에 바로 쓰는 문서 스킬',
    desc: '문서작성과 데이터 정리를 효율화하는 오피스 활용 노하우',
    detailImage: '/images/new6_2.jpg',
    image: '/images/new6.jpg',
    sale: '27,000',
    original: '39,000',
    discount: '31%',
    mainCategory: '생활/실무',
    subCategory: '실무 문서 작성법',
    author: '한서윤',
    tag: ['문서작성', '오피스'],
    info: { level: '초급', day: '30일', time: '6개월' },
     options: {
        '1년 수강': { original: '39,000', sale: '27,000' },
        '무제한 수강': { original: '52,000', sale: '36,000' }
      }

  },
  {
    id: 'n6',
    title: '마음을 담은 한 줄, 에세이로 기록하는 일상',
    desc: '감정을 글로 표현하며 나만의 이야기로 에세이 쓰기',
    detailImage: '/images/new7_2.jpg',
    image: '/images/new7.jpg',
    sale: '44,000',
    original: '66,000',
    discount: '33%',
    mainCategory: '예술·교양',
    subCategory: '글쓰기',
    author: '강해인',
    tag: ['에세이', '창작'],
    info: { level: '초급', day: '50일', time: '1년' },
     options: {
        '1년 수강': { original: '66,000', sale: '44,000' },
        '무제한 수강': { original: '89,000', sale: '62,000' }
      }

  },
  {
    id: 'n7',
    title: '코딩을 몰라도 괜찮아, 노코드 자동화 툴 입문',
    desc: '노코드 툴을 활용해 업무 효율을 높이는 자동화 기초',
    detailImage: '/images/new8_2.jpg',
    image: '/images/new8.jpg',
    sale: '42,000',
    original: '60,000',
    discount: '30%',
    mainCategory: 'IT·디지털',
    subCategory: '프로그래밍',
    author: '정우성',
    tag: ['개발자도구', '코딩툴'],
    info: { level: '중급', day: '25일', time: '6개월' },
    options: {
        '1년 수강': { original: '60,000', sale: '42,000' },
        '무제한 수강': { original: '79,000', sale: '55,000' }
      }

  },
  {
    id: 'n8',
    title: '사주·심리로 알아보는 나의 성향',
    desc: '심리학 이론과 사주적 관점을 통해\n나를 이해하고 성장하는 시간',
    detailImage: '/images/new9_2.jpg',
    image: '/images/new9.jpg',
    sale: '58,000',
    original: '85,000',
    discount: '32%',
    mainCategory: '예술/교양',
    subCategory: '타로/사주',
    author: '정민우',
    tag: ['심리', '사주', '자기이해'],
    info: { level: '고급', day: '60일', time: '1년' },
    options: {
        '1년 수강': { original: '85,000', sale: '58,000' },
        '무제한 수강': { original: '115,000', sale: '79,000' }
      }

  },
  {
    id: 'n9',
    title: '쉽게 시작하는 디지털 감성 일러스트',
    desc: '간단한 선과 색으로 감성을 표현하는 드로잉 입문',
    detailImage: '/images/new10_2.jpg',
    image: '/images/new10.jpg',
    sale: '33,000',
    original: '48,000',
    discount: '31%',
    mainCategory: 'IT/디지털',
    subCategory: '디자인/3D',
    author: '서하진',
    tag: ['디지털드로잉', '일러스트'],
    info: { level: '초급', day: '30일', time: '6개월' },options: {
        '1년 수강': { original: '48,000', sale: '33,000' },
        '무제한 수강': { original: '65,000', sale: '45,000' }
      }

  },
  {
    id: 'n10',
    title: '프로크리에이트로 배우는 디지털 일러스트 기초',
    desc: '아이패드와 프로크리에이트 앱을 활용한 감성 드로잉 입문',
    detailImage: '/images/new11_2.jpg',
    image: '/images/new11.jpg',
    sale: '45,000',
    original: '65,000',
    discount: '30%',
    mainCategory: 'IT/디지털',
    subCategory: '디자인/3D',
    author: '최도윤',
    tag: ['디지털드로잉', '아이패드'],
    info: { level: '중급', day: '45일', time: '1년' },
    options: {
        '1년 수강': { original: '65,000', sale: '45,000' },
        '무제한 수강': { original: '89,000', sale: '63,000' }
      }

  }
];

// Section3: 출시 예정 강의
 const comingCourses = [
  {
    id: 'c1',
    title: '글쓰기와 함께하는 자기 탐색',
    desc: '하루하루의 경험을 글로 남기며,\n자신의 내면을 발견하는 시간.',
    detailImage: '/images/com1_2.jpg',
    image: '/images/com1_1.jpg',
    sale: '32,630',
    original: '64,664',
    discount: '29%',
    mainCategory: '예술·교양',
    subCategory: '글쓰기',
    author: '김수정',
    tag: ['에세이', '글쓰기'],
    info: { level: '중급', day: '14일', time: '1년' },
    options: {
        '1년 수강': { original: '64,664', sale: '32,630' },
        '무제한 수강': { original: '84,664', sale: '44,000' }
      }

  },
  {
    id: 'c2',
    title: '타로로 불안 다스리는 마인드셋',
    desc: '타로로\n건강한 마인드셋을 구축하는 클래스',
    detailImage: '/images/com2_2.jpg',
    image: '/images/com2_1.jpg',
    sale: '32,900',
    original: '71,125',
    discount: '34%',
    mainCategory: '예술·교양',
    subCategory: '타로/사주',
    author: '이서윤',
    tag: ['심리', '타로', '사주'],
    info: { level: '초급', day: '10일', time: '1년' },
    options: {
        '1년 수강': { original: '71,125', sale: '32,900' },
        '무제한 수강': { original: '91,125', sale: '45,000' }
      }

  },
  {
    id: 'c3',
    title: '감성 손글씨 캘리그라피',
    desc: '손끝에서 피어나는 감성,\n글자 하나로 마음을 표현하기',
    detailImage: '/images/com3_2.jpg',
    image: '/images/com3_1.jpg',
    sale: '26,711',
    original: '60,515',
    discount: '29%',
    mainCategory: '예술·교양',
    subCategory: '캘리그라피',
    author: '박현우',
    tag: ['캘리그라피'],
    info: { level: '초급', day: '53일', time: '1년' },
    options: {
        '1년 수강': { original: '60,515', sale: '26,711' },
        '무제한 수강': { original: '80,515', sale: '36,000' }
      }
  },
  {
    id: 'c4',
    title: '몰입을 부르는 루틴, 시간관리 실전 전략',
    desc: '몰입과 성과를 높이는\n시간 관리 전략을 익혀보는 클래스',
    detailImage: '/images/com4_2.jpg',
    image: '/images/com4_1.jpg',
    sale: '48,116',
    original: '77,053',
    discount: '30%',
    mainCategory: '생활·실무',
    subCategory: '업무 자동화',
    author: '최민지',
    tag: ['시간관리', '생산성', '루틴'],
    info: { level: '고급', day: '22일', time: '1년' },
    options: {
        '1년 수강': { original: '77,053', sale: '48,116' },
        '무제한 수강': { original: '97,053', sale: '63,000' }
      }
  },
  {
    id: 'c5',
    title: '컬러로 표현하는 마음, 미술 힐링 클래스',
    desc: '컬러로 마음을 진단하고,\n감정을 치유해보는 미술 클래스.',
    detailImage: '/images/com5_2.jpg',
    image: '/images/com5_1.jpg',
    sale: '25,155',
    original: '73,744',
    discount: '27%',
    mainCategory: '예술·교양',
    subCategory: '타로/사주',
    author: '정지훈',
    tag: ['컬러', '심리', '힐링'],
    info: { level: '초급', day: '22일', time: '1년' },
    options: {
        '1년 수강': { original: '73,744', sale: '25,155' },
        '무제한 수강': { original: '93,744', sale: '36,000' }
      }

  },
  {
    id: 'c6',
    title: '자격증 준비의 시작, 목표 설정과 학습 루틴',
    desc: '삶을 바꾸는 작은 습관,\n구체적인 계획으로 자격증까지 완성',
    detailImage: '/images/com6_2.jpg',
    image: '/images/com6_1.jpg',
    sale: '38,193',
    original: '85,812',
    discount: '27%',
    mainCategory: '생활·실무',
    subCategory: '자격증 준비',
    author: '배수연',
    tag: ['자격증', '목표설정', '학습루틴'],
    info: { level: '고급', day: '45일', time: '1년' },
    options: {
        '1년 수강': { original: '85,812', sale: '38,193' },
        '무제한 수강': { original: '105,812', sale: '52,000' }
      }
  },
  {
    id: 'c7',
    title: '문서 정리부터 공간 정돈까지, 실무 정리 전략',
    desc: '업무 효율을 높이는 문서 정리 노하우와\n생활 속 정리 습관을 함께 배우기',
    detailImage: '/images/com7_2.jpg',
    image: '/images/com7_1.jpg',
    sale: '35,495',
    original: '82,388',
    discount: '35%',
    mainCategory: '생활·실무',
    subCategory: '실무 문서 작성법',
    author: '오세라',
    tag: ['문서정리', '정리정돈', '실무팁'],
    info: { level: '중급', day: '24일', time: '1년' },
     options: {
        '1년 수강': { original: '82,388', sale: '35,495' },
        '무제한 수강': { original: '102,388', sale: '49,000' }
      }
  },
  {
    id: 'c8',
    title: 'LP로 힐링을 위한 음악 한 곡 클래스',
    desc: '하루 10분,\n피아노로 스트레스를 날려보자',
    detailImage: '/images/com8_2.jpg',
    image: '/images/com8_1.jpg',
    sale: '49,851',
    original: '87,698',
    discount: '34%',
    mainCategory: '예술·교양',
    subCategory: '음악',
    author: '홍지우',
    tag: ['음악', '힐링'],
    info: { level: '고급', day: '12일', time: '1년' },
    options: {
        '1년 수강': { original: '87,698', sale: '49,851' },
        '무제한 수강': { original: '107,698', sale: '65,000' }
      }

  },
  {
    id: 'c9',
    title: '느린 감성으로 기록하는 아날로그 사진',
    desc: '느린 감성으로 일상을 기록하는\n아날로그 사진의 매력.',
    detailImage: '/images/com9_2.jpg',
    image: '/images/com9_1.jpg',
    sale: '43,540',
    original: '65,581',
    discount: '30%',
    mainCategory: 'IT·디지털',
    subCategory: '사진/영상',
    author: '윤정훈',
    tag: ['사진', '아날로그'],
    info: { level: '초급', day: '24일', time: '1년' },
     options: {
        '1년 수강': { original: '65,581', sale: '43,540' },
        '무제한 수강': { original: '85,581', sale: '58,000' }
      }

  },
  {
    id: 'c10',
    title: '자격증 단기완성 실전 전략',
    desc: '단기간 합격을 위한\n시험 준비 노하우',
    detailImage: '/images/com10_2.jpg',
    image: '/images/com10_1.jpg',
    sale: '29,452',
    original: '66,481',
    discount: '30%',
    mainCategory: '생활·실무',
    subCategory: '자격증 준비',
    author: '강다현',
    tag: ['시험대비', '자격증'],
    info: { level: '중급', day: '60일', time: '1년' },
    options: {
        '1년 수강': { original: '66,481', sale: '29,452' },
        '무제한 수강': { original: '86,481', sale: '42,000' }
      }

  }
];

// ✅ 전체 홈코스 배열
const homeCourses = [
  ...Object.values(bestCourses).flat(),
  ...newCourses,
  ...comingCourses,
];

export { bestCourses, newCourses, comingCourses, homeCourses };