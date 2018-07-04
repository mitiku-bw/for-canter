
export interface Product {
    id: { type: Number };
    name: { type: String };
    category: { type: String};
    code: { type: String };
    price: { type: Number };
    details: [
        {
            key: { type: String };
            value: { type: String };
        }
    ];
}
