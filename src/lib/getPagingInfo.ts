export function getPagingInfo(route: string, offset: number, limit: number, total: number) {
    // TODO: support additional query params on the route
    return {
        offset,
        limit,
        links: {
            first: `${route}?offset=0&limit=${limit}`,
            last: `${route}?offset=${Math.floor(total / limit) * limit}&limit=${limit}`,
            previous: offset > 1 ? `${route}?offset=${Math.max(0, offset - limit)}&limit=${limit}` : undefined,
            next: offset + limit < total ? `${route}?offset=${offset + limit}&limit=${limit}` : undefined
        }
    };
}

export default getPagingInfo;
