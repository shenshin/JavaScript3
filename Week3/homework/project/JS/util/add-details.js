/**
 * Adds Git repository information on the page
 * @param {HTMLElement} node parent html element to which the
 * repository details are being attached
 * @param {object} repoObject Git repository information
 */
export function addDetails(node, repoObject) {
  // assignment: Recreate all the HTML elements using JavaScript
  node.innerHTML = `
  <table>
    <tr>
      <td>
        Repository:
      </td>
      <td>
        <a href="${repoObject.html_url}">${repoObject.name}</a>
      </td>
    </tr>
    <tr>
      <td>
        Description:
      </td>
      <td>${repoObject.description || repoObject.name}</td>
    </tr>
    <tr>
      <td>
        Forks:
      </td>
      <td>${repoObject.forks_count}</td>
    </tr>
    <tr>
      <td>
        Updated:
      </td>
      <td>${new Date(repoObject.updated_at).toLocaleString()}</td>
    </tr>
  </table>
  `;
}
export default addDetails;
