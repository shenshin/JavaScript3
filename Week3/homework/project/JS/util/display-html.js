/**
 * Display static HTML page template
 */
export function displayHTML() {
  // assignment: Recreate all the HTML elements using JavaScript
  document.body.innerHTML = `
  <div class="page-container">
    <header>
      <p>HYF&nbsp;Repositories</p>
      <select></select>
    </header>
    <main>
      <section class="repo-details"></section>
      <section class="contributors">
        <div class="contributors-header">
          <span>Contributors</span>
          <span id="pagination"></span>
        </div>
        <div class="contributors-cards"></div>
      </section>
    </main>
  </div>
  `;
}
export default displayHTML;
