const receiverUniqueID = (data) => {
    try {

        if (!data || !data.email) {
            throw new Error('Invalid data object or missing email property');
        }

        const emailPart = data.email.split('@')[0];
        const randomAlphabets = String.fromCharCode(
            Math.floor(Math.random() * 26) + 65,
            Math.floor(Math.random() * 26) + 65
        );
        const randomDigits = Math.floor(Math.random() * 90) + 10;

        return `${emailPart}-${randomAlphabets}${randomDigits}`;
    } catch (e) {
        return e.message
    }
};

export default receiverUniqueID