const copyText = async (text: string) => {
  await window.navigator.clipboard.writeText(text);
};

export default copyText;
