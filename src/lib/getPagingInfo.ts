export function getPagingInfo(route: string, offset: number, limit: number, total: number, additionalParams: string = '') {
    const pages = limit > 0 ? Math.ceil(total / limit) : 0;
    return {
        rows: total,
        pages,
        offset,
        limit,
        links: route !== '' ? {
            first: `${route}?offset=0&limit=${limit}${additionalParams}`,
            last: `${route}?offset=${(pages - 1) * limit}&limit=${limit}${additionalParams}`,
            previous: offset > 1 && pages > 0 ? `${route}?offset=${Math.max(0, offset - limit)}&limit=${limit}${additionalParams}` : undefined,
            next: offset + limit < total && pages > 0 ? `${route}?offset=${offset + limit}&limit=${limit}${additionalParams}` : undefined
        } : undefined
    };
}

export default getPagingInfo;
