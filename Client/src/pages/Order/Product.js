import React from "react";

const Product = ({ name, imagePath, updateItemCount }) => {
  const handleChange = event => {
    const currentValue = event.target.value;
    updateItemCount(name, currentValue);
  };
  return (
    <li style={{ listStyle: "none" }}>
      <img
        width={200}
        src={`http://localhost:5000/${imagePath}`}
        alt={`${name} Product`}
      />
      <form>
        <label htmlFor={name}>{name}</label>
        <input
          id={name}
          type="number"
          name="quantity"
          min="0"
          defaultValue="0"
          onChange={handleChange}
        />
      </form>
    </li>
  );
};

export default Product;
