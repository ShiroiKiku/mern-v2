const findToDatabase = async (type) => {
    try {
        let findResult = await fetch(`/api/${type}/get`, {
            method: "GET",
        }).then((response) => response.json());
        return findResult;
    } catch (e) {
        console.log(e);
    }
};

export default findToDatabase;
