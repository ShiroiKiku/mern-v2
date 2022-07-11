const findToDatabase = async () => {
    try {
        let findResult = await fetch(`/api/navigate/get`, {
            method: "GET",
        }).then((response) => response.json());
        return findResult;
    } catch (e) {
        console.log(e);
        return "добавление неудалось";
    }
};

export default findToDatabase;
