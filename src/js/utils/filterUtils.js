export function filterItems(items, filter) {
    switch (filter) {
        case 'all':
            return items;
        case 'disponivel':
            return items.filter(item => item.estaDisponivel);
        case 'indisponivel':
            return items.filter(item => !item.estaDisponivel);
        default:
            return items.filter(item => item.console === filter || item.nome === filter);
    }
}