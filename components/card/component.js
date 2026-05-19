const cardStyles = new CSSStyleSheet();

cardStyles.replaceSync(`

  :host {
    border: var(--border-composite-subtle);
    border-radius: var(--border-radius-gentle);
    max-width: 25rem;
    display: block;
    overflow: clip;
    position: relative;
  }

  :host([data-link]) {
    cursor: pointer;
    border: var(--border-composite-strong);
    border-color: light-dark(#000, var(--color-neutral-200));
  }

  :host([data-link]:focus-within) { 
    outline: var(--focus-ring-composite);
    outline-offset: var(--focus-ring-offset);
  }

  :host([data-link]:focus-within) a { 
    outline: none;
  }

  :host([data-link]:hover) { 
    border-color: var(--color-blue-200);
  }

  :host([data-link]) a {
    color: inherit;

}



  :host([data-link]) a::after {
    content: '';
    position: absolute;
    inset: 0;
  }

  .card__header {
    line-height: var(--text-line-heights-tight)
  }

  .card__content {
    padding: var(--space-md);
  }

  .card__content > * {
    margin-block: 0;
  }

  .card__content > * + * {
    margin-block-start: var(--space-xs, 1.5rem);
  }

  img {
    display: block;
  }

`);

// Create a class for the element
class mjuxCard extends HTMLElement {
  //   static observedAttributes = ["color", "size"];

  constructor() {
    // Always call super first in constructor
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.adoptedStyleSheets = [cardStyles];
  }

  connectedCallback() {
    // console.log("Custom element added to page.");

    const body = this.dataset.body;
    const heading = this.dataset.heading;
    const img = this.dataset.img;
    const link = this.dataset.link;
    const cta = this.dataset.cta;

    let bodyHTML;
    let headingHTML;
    let imgHTML;
    let cardContentHTML;

    if (body) {
      bodyHTML = `<div class="card__body">${this.dataset.body}</div>`;
    }

    if (heading) {
      headingHTML = `<h3 class="card__header">${heading}</h3>`;
    }

    if (link && !cta) {
      headingHTML = `<h3 class="card__header"><a href="${link}">${heading}</a></h3>`;

      // function handleClick(event) {
      //   window.location.href = link;
      // }

      // this.addEventListener("click", handleClick);
      // this.style.cursor = "pointer";
    }

    if (heading || body) {
      if (cta) {
        cardContentHTML = `
            <div class="card__content">
            ${headingHTML ?? ""}
            ${bodyHTML ?? ""}
            <button>${cta}</button>
            </div>
        `;
      } else {
        cardContentHTML = `
            <div class="card__content">
            ${headingHTML ?? ""}
            ${bodyHTML ?? ""}
            </div>
        `;
      }
    }

    if (img) {
      imgHTML = `<div class="card__img"><img src="${this.dataset.img}" alt="${this.dataset.alt}"></div>`;
    }

    this.shadowRoot.innerHTML = `     
   
        ${imgHTML ?? ""}
        ${cardContentHTML ?? ""}


    <style>@import url("../components/button/component.css");</style>


    `;
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  connectedMoveCallback() {
    console.log("Custom element moved with moveBefore()");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }
}

customElements.define("mjux-card", mjuxCard);
