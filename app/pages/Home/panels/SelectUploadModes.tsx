const SelectUploadModes = () => {
  return (
    <div>
      <h1>Normal upload mode</h1>
      <button onClick={onModeSelect} value="normal">
        Normal upload mode
      </button>
      <h1>Limit upload mode</h1>
      <Select onChange={onModeSelect} options={selectOptions.current} />
    </div>
  );
};

export default SelectUploadModes;
