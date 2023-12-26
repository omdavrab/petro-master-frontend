export function DateFormat(props) {
    const date = new Date(props);

    const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    const formattedDateTime = `${formattedDate}, ${formattedTime}`;

    return formattedDateTime;
}
