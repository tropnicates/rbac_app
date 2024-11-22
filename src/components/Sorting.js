import React from 'react';

function Sorting({ onSort }) {
  return (
    <div className="sorting">
      <select onChange={(e) => onSort(e.target.value)}>
        <option value="">Sort By</option>
        <option value="priceAsc">Price (Low to High)</option>
        <option value="priceDesc">Price (High to Low)</option>
        <option value="nameAsc">Name (A to Z)</option>
        <option value="nameDesc">Name (Z to A)</option>
      </select>
    </div>
  );
}

export default Sorting;
