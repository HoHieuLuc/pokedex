const triggerGameHotkey = (data: KeyboardEventInit) => {
  const event = new KeyboardEvent('keydown', data);
  document.documentElement.dispatchEvent(event);
};

export default triggerGameHotkey;
