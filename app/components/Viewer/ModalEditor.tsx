import { useState } from 'react';
import onEdit from './onEdit';

const ModalEditor = ({ docId }) => {
  const [desc, setDesc] = useState('');

  const onChange = (e: any) => {
    const {
      target: { value },
    } = e;
    setDesc(value);
  };

  return (
    <>
      <div>Desc editor</div>
      <input onChange={onChange} value={desc} />
      <button onClick={() => onEdit({ docId: docId, content: desc })}>
        confirm
      </button>
    </>
  );
};

export default ModalEditor;
