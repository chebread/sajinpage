const Uploading = ({ onCancel }) => {
  // (0): 업로딩중에 취소 기능 추가하기
  return (
    <>
      <div>Uploading...</div>
      <button onClick={onCancel}>cancel uploading</button>
    </>
  );
};

export default Uploading;
