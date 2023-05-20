const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//search the orders
const searchOrders = async searchText => {
    const res = await fetch('./order.json');
    const orders = await res.json();

    //get matches to current input.

    let matches = orders.filter(order => {
        const regex = new RegExp(`^${searchText}`,`gi`);
        return order.order.match(regex) || order.description.match(regex);
    });
    if(searchText.length === 0){
        matches = [];
    }
    outputHtml(matches);
};
// Display Results.
const outputHtml = matches => {
    if(matches.length > 0 ){
        const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h4> <span> order </span> ${match.order}</h4>
                <h4> <span> order description </span> ${match.description}</h4>
            </div>
        `).join('');
        matchList.innerHTML = html;
    }
};
search.addEventListener('input', () => searchOrders(search.value));
