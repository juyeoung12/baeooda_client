import React, { useEffect, useState } from 'react';
import { allCourses } from '../data/dummyCourses';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const selectedFromStorage = JSON.parse(localStorage.getItem('selectedIds')) || [];

    const enriched = storedCart
      .map(({ id, option, listImage }) => {
        const course = allCourses.find((c) => c.id === id);
        if (!course) return null;

        const selectedOption = course.options?.[option];
        const price = selectedOption?.sale
          ? parseInt(String(selectedOption.sale).replace(/[^0-9]/g, ''), 10)
          : 120000;
        const originalPrice = selectedOption?.original
          ? parseInt(String(selectedOption.original).replace(/[^0-9]/g, ''), 10)
          : 250000;

        return {
          id: course.id,
          title: course.title,
          author: course.author,
          image: listImage || course.listImage || course.imageList?.[0] || course.image || '/images/default.jpg',
          originalPrice,
          option,
          price,
          desc: course.desc,
          level: course.level,
          info: course.info,
          discount: course.discount,
          options: course.options,
        };
      })
      .filter(Boolean);

    setCartItems(enriched);

    const validSelectedIds = enriched
      .map((item) => item.id)
      .filter((id) => selectedFromStorage.includes(id));

    setSelectedIds(validSelectedIds.length > 0 ? validSelectedIds : enriched.map((item) => item.id));
  }, []);

  const updateSelectedIds = (newSelected) => {
    setSelectedIds(newSelected);
    localStorage.setItem('selectedIds', JSON.stringify(newSelected));
  };

  const handleCheckboxChange = (id) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id];

    updateSelectedIds(updated);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = cartItems.map((item) => item.id);
      updateSelectedIds(allIds);
    } else {
      updateSelectedIds([]);
    }
  };

  const handleOptionChange = (id, newOption) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        const newPrice = item.options?.[newOption]?.sale
          ? parseInt(String(item.options[newOption].sale).replace(/[^0-9]/g, ''), 10)
          : 120000;
        const newOriginal = item.options?.[newOption]?.original
          ? parseInt(String(item.options[newOption].original).replace(/[^0-9]/g, ''), 10)
          : 250000;
        return { ...item, option: newOption, price: newPrice, originalPrice: newOriginal };
      }
      return item;
    });

    setCartItems(updatedItems);

    const rawCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = rawCart.map((item) =>
      item.id === id ? { ...item, option: newOption } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDeleteOne = (id) => {
    const filtered = cartItems.filter((item) => item.id !== id);
    setCartItems(filtered);

    const rawCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = rawCart.filter((item) => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    const updatedSelected = selectedIds.filter((selectedId) => selectedId !== id);
    updateSelectedIds(updatedSelected);
  };

  const handleDeleteSelected = () => {
    const filteredItems = cartItems.filter((item) => !selectedIds.includes(item.id));
    setCartItems(filteredItems);

    const rawCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = rawCart.filter((item) => !selectedIds.includes(item.id));
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    updateSelectedIds([]);
  };

  const handlePayment = () => {
    const selectedItems = cartItems.filter((item) => selectedIds.includes(item.id));
    if (selectedItems.length === 0) {
      alert('결제할 강의를 선택해주세요.');
      return;
    }

    const total = selectedItems.reduce((acc, item) => acc + item.price, 0);
    alert(`총 ${selectedItems.length}개의 강의를 ₩${total.toLocaleString()}에 결제했습니다!`);

    const remainingItems = cartItems.filter((item) => !selectedIds.includes(item.id));
    setCartItems(remainingItems);

    const updatedCart = remainingItems.map(({ id, option }) => ({ id, option }));
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    updateSelectedIds([]);
  };

  const totalSelectedPrice = cartItems
    .filter((item) => selectedIds.includes(item.id))
    .reduce((acc, item) => acc + item.price, 0);

  return (
    <section style={{ width: '100vw', margin: '70px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '1270px', margin: '0 auto', padding: '40px' }}>
        <div style={{ width: '65%' }}>
          <h2 style={{ marginBottom: '20px' }}>장바구니</h2>

          {cartItems.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
              {/* <img src="/icons/empty-cart.svg" alt="빈 장바구니" style={{ width: '120px', marginBottom: '20px', opacity: 0.5 }} /> */}
              <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>장바구니가 비어있어요.</p>
              <a href="/" style={{ marginTop: '22px', backgroundColor: '#ED6051', color: '#fff', padding: '12px 24px', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', display: 'inline-block', textDecoration: 'none' }}>강의 보러 가기</a>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '7px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                <input type="checkbox" onChange={handleSelectAll} checked={selectedIds.length === cartItems.length && cartItems.length > 0} />
                <span>전체 선택</span>
                <button onClick={handleDeleteSelected} style={{ marginLeft: 'auto', fontSize: '13px' }}>선택 삭제</button>
              </div>

              <hr style={{ margin: 0, borderBottom: '1px solid #ccc' }} />

              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'flex', borderBottom: '1px solid #ccc', padding: '20px 0', alignItems: 'center', gap: '20px', position: 'relative' }}>
                  <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => handleCheckboxChange(item.id)} />
                  <a href={`/courses/${encodeURIComponent(item.title)}`} target="_blank" rel="noopener noreferrer">
                    <img src={item.image} alt={item.title} width="170" height="100" style={{ objectFit: 'cover', borderRadius: '8px' }} />
                  </a>
                  <div style={{ flex: 1 }}>
                    <a href={`/courses/${encodeURIComponent(item.title)}`} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '5px', display: 'inline-block', textDecoration: 'none', color: 'black' }}>{item.title}</a>
                    <div style={{ color: '#777', fontSize: '14px', marginBottom: '10px' }}>{item.author}</div>
                    <select value={item.option} onChange={(e) => handleOptionChange(item.id, e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: 'white' }}>
                      <option value="1년 수강">1년 수강</option>
                      <option value="무제한 수강">무제한 수강</option>
                    </select>
                  </div>
                  <div style={{ minWidth: '100px', textAlign: 'right' }}>
                    <div style={{ textDecoration: 'line-through', color: '#999', fontSize: '13px' }}>₩{item.originalPrice.toLocaleString()}</div>
                    <div style={{ fontWeight: 'bold', color: '#000' }}>₩{item.price.toLocaleString()}</div>
                  </div>
                  <button onClick={() => handleDeleteOne(item.id)} style={{ top: '10px', right: '10px', border: 'none', background: 'transparent', fontSize: '18px', cursor: 'pointer', color: '#888' }}>×</button>
                </div>
              ))}
            </>
          )}
        </div>

        <div style={{ width: '25%', border: '1px solid #ccc', borderRadius: '10px', padding: '30px', height: 'fit-content', margin: '120px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '18px 0 34px 0' }}>
            <p style={{ fontWeight: 'bold', fontSize: '16px', margin: '0' }}>총 결제 금액</p>
            <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '0' }}>₩{totalSelectedPrice.toLocaleString()}</p>
          </div>
          <button onClick={handlePayment} disabled={selectedIds.length === 0} style={{ backgroundColor: selectedIds.length === 0 ? '#ccc' : '#ED6051', color: '#fff', width: '100%', padding: '15px', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: selectedIds.length === 0 ? 'not-allowed' : 'pointer' }}>결제 하기</button>
          <p style={{ fontSize: '12px', color: '#999', marginTop: '15px' }}>회원 본인은 주문 내용을 확인했으며, 구매조건 및 개인정보처리방침과 결제에 동의합니다.</p>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
