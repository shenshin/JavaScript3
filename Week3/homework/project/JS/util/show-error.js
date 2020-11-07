/**
 * Catches errors thrown by http requests
 * @param {Error} error error object
 */
export function showError(error) {
  const parentNode = document.querySelector('.page-container');
  const errorNode = document.createElement('div');
  errorNode.className = 'error-message';
  errorNode.innerHTML = `${error}`;
  parentNode.insertBefore(errorNode, document.querySelector('main'));
  setTimeout(() => {
    parentNode.removeChild(errorNode);
  }, 4000);
}
export default showError;
