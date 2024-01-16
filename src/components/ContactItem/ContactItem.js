import React from 'react';

const ContactItem = ({ name, phone, onDelete }) => (
  <li>
    {name}: {phone}
    <button onClick={onDelete} style={{ marginLeft: '10px' }}>Delete</button>
  </li>
);

export default ContactItem;