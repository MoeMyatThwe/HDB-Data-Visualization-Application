const template = document.createElement('template');

template.innerHTML = `
    <style>
        .card-container {
            background-color: #b4def7;
            border: 1px solid #ccc;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-bottom: 20px;
            font-family: Arial, Helvetica, sans-serif;
        }


        h3 {
            font-size: 2rem; 
            margin-bottom: 10px;
        }

        hr {
            border: none; 
            border-top: 1px solid #ccc;
            margin: 10px 0; 
        }

        h5 {
            font-size: 1rem;
            margin-bottom: 5px; 
        }

        span {
            display: inline-block; 
            margin-bottom: 5px; 
        }
    </style>
    <div class="card-container">
        <h5>Flat Type: <span id='flat_type'>Flat Type</span></h5>
        <span id='highest_price_section'>
            <h5>Highest Price: <span id='highest_price'>Highest Price</span></h5>
            <h5>Lowest Price: <span id='lowest_price'>Lowest Price</span></h5>
        </span>
        <span id='mean_median_section'>
            <h5>Mean Price: <span id='mean_price'>Mean Price</span></h5>
            <h5>Median Price: <span id='median_price'>Median Price</span></h5>
        </span>
    </div>
`;


class HDBcard extends HTMLElement {
    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'closed' });
        let clone = template.content.cloneNode(true);
        this.root.append(clone);
    }

    static get observedAttributes() {
        return ['town', 'flat_type', 'highest_price', 'lowest_price', 'mean_price', 'median_price'];
    }

    get town() {
        return this.getAttribute('town');
    }
    set town(value) {
        this.setAttribute('town', value);
    }

    get flat_type() {
        return this.getAttribute('flat_type');
    }
    set flat_type(value) {
        this.setAttribute('flat_type', value);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        attrName = attrName.toLowerCase();
        let element;

        switch (attrName) {
            case 'town':
                element = this.root.querySelector('#town');
                element.textContent = newValue;
                break;
            case 'flat_type':
                element = this.root.querySelector('#flat_type');
                element.textContent = newValue;
                break;
            case 'highest_price':
                element = this.root.querySelector('#highest_price');
                element.textContent = newValue;
                break;
            case 'lowest_price':
                element = this.root.querySelector('#lowest_price');
                element.textContent = newValue;
                break;
            case 'mean_price':
                element = this.root.querySelector('#mean_price');
                element.textContent = newValue;
                break;
            case 'median_price':
                element = this.root.querySelector('#median_price');
                element.textContent = newValue;
                break;
        }

        // Show or hide sections based on the context
        this.root.querySelector('#highest_price_section').style.display = (attrName === 'highest_price' || attrName === 'lowest_price') ? 'block' : 'none';
        this.root.querySelector('#mean_median_section').style.display = (attrName === 'mean_price' || attrName === 'median_price') ? 'block' : 'none';
    }
}

window.customElements.define('hdb-card', HDBcard);
