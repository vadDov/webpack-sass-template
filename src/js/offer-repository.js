export const fetchOffers = async () => {
    const response = await fetch('http://localhost:3000/offers');
    return await response.json();
};

export const createOffer = async (body) => {
    const response = await fetch(
        'http://localhost:3000/offers',
        {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
    return await response.json();
};

export const modifyOffer = async (body) => {
    const response = await fetch(
        `http://localhost:3000/offers/${body.id}`,
        {
            body: JSON.stringify(body),
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    return await response.json();
};

export const deleteOffer = async (id) => {
    const response = await fetch(`http://localhost:3000/offers/${id}`, { method: 'DELETE' });
    return await response.json();
};
