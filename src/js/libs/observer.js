const doc = window.document;
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

let callback = () => {};

function ready (selector, fn) {
  const observer = new MutationObserver(check);
  callback = fn;

  observer.observe(doc.documentElement, {
    childList: true,
    subtree: true,
    removedNodes: true
  });
}

function check(mutations) {
  if (!mutations) return;

  mutations.forEach(mutation => {
    const addedNodes = Array.from(mutation.addedNodes)
    const removedNodes = Array.from(mutation.removedNodes)

    const anyAOSElementAdded = addedNodes.concat(removedNodes)
      .filter(el => el.hasAttribute && el.hasAttribute('data-aos'))
      .length

    if(anyAOSElementAdded) {
      callback()
    }
  });
}

export default ready;
