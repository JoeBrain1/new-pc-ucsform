export const sendContactForm = async (data) => fetch('/api/contact', {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
}).then((res) => {
    if (!res.ok) throw new Error("Failed to send message");
    return res.json()
})

// After creating this function, go the project form and then call the it
// Which is when the the submit button is click. so 
// that means you need to go to the onSubmit function and then call it