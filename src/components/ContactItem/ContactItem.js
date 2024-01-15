import React from 'react';

const ContactItem = ({ name, number, onDelete }) => (
  <li>
    {name}: {number}
    <button onClick={onDelete} style={{ marginLeft: '10px' }}>Delete</button>
  </li>
);

export default ContactItem;