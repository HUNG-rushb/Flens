export const handleKeyPressComment = async (
  event,
  postID,
  comment,
  handleSubmitComment
) => {
  const textarea = document?.getElementById(`textarea-comment-${postID}`);
  const { selectionStart, selectionEnd } = textarea;
  const value = textarea?.value;

  if (comment && event?.key === 'Enter' && !event?.shiftKey) {
    event?.preventDefault();
    handleSubmitComment(event);
  } else if (event?.key === 'Enter' && event?.shiftKey) {
    event?.preventDefault();
    const newValue =
      value.substring(0, selectionStart) + '\n' + value.substring(selectionEnd);
    textarea.value = newValue;

    textarea.style.height = 'auto';
    textarea.style.height = textarea?.scrollHeight + 'px';

    textarea.selectionStart = selectionStart + 1;
    textarea.selectionEnd = selectionStart + 1;
  } else if (
    event.key === 'Backspace' &&
    selectionStart === selectionEnd &&
    selectionStart > 0
  ) {
    event.preventDefault();
    const newValue =
      value.substring(0, selectionStart - 1) + value.substring(selectionEnd);
    textarea.value = newValue;

    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';

    textarea.selectionStart = selectionStart - 1;
    textarea.selectionEnd = selectionStart - 1;
  }
};
