/* Interactive FAQ accordion
 * Uses event delegation so newly added FAQ items work without extra listeners.
 * If JavaScript cannot find the expected elements, it exits safely.
 */
(function () {
  "use strict";

  var list = document.getElementById("faq-list");
  var status = document.getElementById("faq-status");

  // Defensive check: avoid runtime errors if the markup has been changed.
  if (!list || !status) {
    return;
  }

  function getItems() {
    return list.querySelectorAll(".faq-item");
  }

  function setItemExpanded(button, panel, expanded) {
    button.setAttribute("aria-expanded", String(expanded));
    panel.hidden = !expanded;
  }

  function updateStatus() {
    var openCount = list.querySelectorAll('.faq-trigger[aria-expanded="true"]').length;
    status.textContent = openCount === 0
      ? "All questions are closed."
      : openCount + (openCount === 1 ? " question is open." : " questions are open.");
  }

  // One-open-at-a-time behavior keeps the interface compact.
  list.addEventListener("click", function (event) {
    var button = event.target.closest(".faq-trigger");

    // Ignore clicks that did not originate from a FAQ button.
    if (!button || !list.contains(button)) {
      return;
    }

    var panelId = button.getAttribute("aria-controls");
    var panel = panelId ? document.getElementById(panelId) : null;

    // Graceful fallback if a button references a missing panel.
    if (!panel) {
      status.textContent = "Sorry, this answer could not be opened.";
      return;
    }

    var shouldExpand = button.getAttribute("aria-expanded") !== "true";

    getItems().forEach(function (item) {
      var itemButton = item.querySelector(".faq-trigger");
      var itemPanel = itemButton
        ? document.getElementById(itemButton.getAttribute("aria-controls"))
        : null;

      if (itemButton && itemPanel) {
        setItemExpanded(itemButton, itemPanel, itemButton === button && shouldExpand);
      }
    });

    updateStatus();
  });

  // Supports older browsers that may not implement Element.closest().
  // The main click handler is only attached if closest is available.
  // In current evergreen browsers, the delegated handler above is used.
  if (!Element.prototype.closest) {
    list.addEventListener("click", function (event) {
      var node = event.target;
      while (node && node !== list && !(node.classList && node.classList.contains("faq-trigger"))) {
        node = node.parentNode;
      }
      if (!node || node === list) return;

      var panel = document.getElementById(node.getAttribute("aria-controls"));
      if (!panel) {
        status.textContent = "Sorry, this answer could not be opened.";
        return;
      }

      var shouldExpand = node.getAttribute("aria-expanded") !== "true";
      getItems().forEach(function (item) {
        var button = item.querySelector(".faq-trigger");
        var itemPanel = button ? document.getElementById(button.getAttribute("aria-controls")) : null;
        if (button && itemPanel) setItemExpanded(button, itemPanel, button === node && shouldExpand);
      });
      updateStatus();
    });
  }
})();
