export function handleErrors(response) {
    // return response.then(response => {
        //const data = text && JSON.parse(text);
        if (!response.ok) {
            // const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
            throw response;
            // return Promise.reject(response);
        }

        return response;
    // });
}